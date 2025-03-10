import { PokemonTypeData } from "@/_types/pokemon";
import { PokeCard } from "@/comps/pokeCard";
import { SearchablePokemonList } from "@/comps/searchablePokemonList";
import { TypeDisplay } from "@/comps/typeDisplay";

const TYPE_URL = "https://pokeapi.co/api/v2/type/"
export default async function TypePage({ params }: { params: Promise<{ typeName: string }> }) {
    const typeName = (await params).typeName;

    const typeDataResponse = await fetch(TYPE_URL + typeName, { cache: 'force-cache' });
    const typeData: PokemonTypeData = await typeDataResponse.json();

    const maps = typeData.pokemon.map<{ name: string, url: string, id: number }>(result => ({ ...result.pokemon, id: Number.parseInt(result.pokemon.url.split("/")[6]) }))
    const typePokemonMap = maps.map(p => <PokeCard name={p.name} id={p.id} url={p.url} />)

    return <main className="flex flex-col items-center pt-10">
        <h1 className="flex flex-row items-center gap-2 text-3xl"><TypeDisplay type={typeName} /> Pokemon</h1>
        <section className=""><SearchablePokemonList pokemonList={maps} />{ }</section></main>
}