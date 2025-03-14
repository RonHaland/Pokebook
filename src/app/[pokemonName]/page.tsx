import { FullAbility, PokemonInfo, PokemonSpecies } from "@/_types/pokemon";
import { CapitalizeFirst, ShortenStatName } from "@/_utils/stringFuncs";
import { EvolutionChart, FallbackEvolutionChart } from "@/comps/evolutionChart";
import { ImageWithFallback } from "@/comps/imageWithFallback";
import { TypeDisplay } from "@/comps/typeDisplay";
import Link from "next/link";
import { Suspense } from "react";
import { unstable_ViewTransition as ViewTransition } from 'react'
import * as motion from "motion/react-client"
import { MovesGrid } from "@/comps/movesGrid";

const POKEMON_INFO_URL = (process.env.API_URL ?? "https://pokeapi.co/api/v2") + "/pokemon/"

export default async function Test2({ params, searchParams }: {
    params: Promise<{ pokemonName: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { pokemonName } = await params;
    const searchParameters = await searchParams;
    const queryString = Object.entries(searchParameters).map(s => `${s[0]}=${s[1]}`).join("&");

    const pokemonInfoResponse = await fetch(POKEMON_INFO_URL + pokemonName, { cache: "force-cache" })

    const pokemonInfo: PokemonInfo | null = pokemonInfoResponse.ok ? await pokemonInfoResponse.json() : null;

    const pokemonSpeciesResponse = pokemonInfoResponse.ok ? await fetch(pokemonInfo!.species.url, { cache: 'force-cache' }) : null;
    const pokemonSpecies: PokemonSpecies = pokemonSpeciesResponse?.ok ? await pokemonSpeciesResponse.json() : null;

    const abilities = await Promise.all(pokemonInfo?.abilities.map(async m => {
        const abilityResponse = await fetch(m.ability.url, { cache: 'force-cache' });
        const ability: FullAbility = await abilityResponse.json();
        return ability
    }) ?? []);
    if (!pokemonInfo) return <div className="flex flex-col mt-4 gap-8"><Link href={"../?" + queryString} className="self-start rounded bg-red-900 px-4 py-2">Back</Link><h1 className="text-4xl">{pokemonName.toLocaleUpperCase()} NOT FOUND</h1></div>

    return <div className="flex flex-col pt-2 sm:px-4 gap-1 sm:gap-2 max-w-[960px] w-full sm:w-[95%] p-1">
        <Link href={"../?" + queryString} className="self-start rounded bg-red-900 px-4 py-2">Back</Link>
        <motion.header className="flex flex-row items-end p-2 bg-linear-to-t from-red-900 to-red-950/70 rounded-t-lg" initial={{scale: 0.8, opacity: 0}} animate={{scale: 1, opacity: 1}}>
            <div className="rounded-full from-zinc-700 to-slate-900 bg-radial border-4 border-slate-100 md:h-[150px] md:w-[150px] w-[100px] h-[100px]">
                <ViewTransition name={`icon-${pokemonInfo.name}`}>
                    <ImageWithFallback fallback="" alt={pokemonInfo.name} src={pokemonInfo?.sprites.front_default} width={250} height={250}
                        className="rounded-sm md:h-[150px] md:w-[150px] w-[100px] h-[100px]" />
                </ViewTransition>
            </div>

            <div className="flex flex-col px-2">
                <div className="flex flex-row gap-3">
                    {pokemonInfo.types.map(m => <Link key={m.type.name} href={`/type/${m.type.name}`}><TypeDisplay type={m.type.name} /></Link>)}
                </div>
                <h1 className="text-2xl md:text-5xl underline underline-offset-8 py-2">{<ViewTransition name={`name-${pokemonInfo.name}`}><span>{CapitalizeFirst(pokemonInfo.name)}</span></ViewTransition>} #{pokemonSpecies?.id ?? pokemonInfo.id}</h1>
            </div>
        </motion.header>
        <main className="grid grid-cols-1 sm:grid-cols-[165px_1fr] sm:gap-2 gap-1 overflow-hidden max-w-[100vw]">
            <motion.aside className="bg-red-900 sm:rounded-r-sm p-2" initial={{scale: 0.8, opacity: 0}} animate={{scale: 1, opacity: 1}}>
                <h2 className="pb-2 text-lg">Base Stats</h2>
                <div className="grid grid-cols-3 sm:block gap-1">
                    {pokemonInfo.stats.map(s => <p key={s.stat.name}><span className="underline">{ShortenStatName(s.stat.name)}:</span> {' ' + s.base_stat}</p>)}
                </div>
            </motion.aside>
            <motion.article className="bg-red-900 sm:rounded-l-sm p-2" initial={{scale: 0.8, opacity: 0}} animate={{scale: 1, opacity: 1}}>
                <h2 className="pb-2 text-lg">Description</h2>
                {pokemonSpecies?.flavor_text_entries.filter(s => s.language.name == "en")[0].flavor_text}
                <div className="border-b border-white/20 py-4"></div>

                <h2 className="pb-2 text-lg">Abilities</h2>
                {abilities.map(a =>
                    <p key={a.name}>
                        <span className="underline underline-offset-2">{CapitalizeFirst(a.name)}:</span>
                        {' ' + a.flavor_text_entries.filter(ee => ee.language.name == "en")[0].flavor_text}
                    </p>)
                }
                <div className="border-b border-white/20 py-4"></div>
                <h2 className="pb-2 text-lg">Evolution Chart</h2>
                <div className="overflow-x-auto horizontal-scroll-shadows">
                    <Suspense fallback={<FallbackEvolutionChart />}>
                        <EvolutionChart pokemonSpecies={pokemonSpecies} queryParams={queryString ?? ""} />
                    </Suspense>
                </div>
            </motion.article>
            <motion.article className="h-80 sm:col-span-2">
                <MovesGrid moves={pokemonInfo.moves.map(m => ({...m.move}))} />
            </motion.article>
        </main>
    </div>
}