import { PokemonTypeData } from "@/_types/pokemon";
import { SearchablePokemonList } from "@/comps/searchablePokemonList";
import { TypeDisplay } from "@/comps/typeDisplay";
import { Suspense } from "react";

const TYPE_URL = (process.env.API_URL ?? "https://pokeapi.co/api/v2") + "/type/"
export default async function TypePage({ params }: { params: Promise<{ typeName: string }> }) {
    const typeName = (await params).typeName;

    const typeDataResponse = await fetch(TYPE_URL + typeName, { cache: 'force-cache' });
    const typeData: PokemonTypeData = await typeDataResponse.json();

    const maps = typeData.pokemon.map<{ name: string, url: string, id: number }>(result => ({ ...result.pokemon, id: Number.parseInt(result.pokemon.url.split("/")[6]) }))

    return <main className="flex flex-col items-center pt-10">
        <h1 className="flex flex-row items-center gap-2 text-3xl"><TypeDisplay type={typeName} /> Pokemon</h1>
        <section className=""><Suspense><SearchablePokemonList pokemonList={maps} />{ }</Suspense></section></main>
}