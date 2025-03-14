import { PokemonList } from "@/_types/pokemon";
import { SearchablePokemonList } from "@/comps/searchablePokemonList";
import { Suspense, unstable_ViewTransition as ViewTransition } from "react";

const GET_ALL_POKEMON_URL = (process.env.API_URL ?? "https://pokeapi.co/api/v2") + "/pokemon?limit=1500"
export default async function Home() {

  const pokemonResponse = await fetch(GET_ALL_POKEMON_URL)
  const pokemonData: PokemonList = await pokemonResponse.json();

  const maps = pokemonData.results.map<{ name: string, url: string, id: number }>(result => ({ ...result, id: Number.parseInt(result.url.split("/")[6]) }))

  return (
    <ViewTransition>
      <Suspense >
        <SearchablePokemonList pokemonList={maps} />
      </Suspense>
    </ViewTransition>
  );
}
