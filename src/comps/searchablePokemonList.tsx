'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { PokeCard } from "./pokeCard";
import { useDebouncedState } from "@/_utils/useDebouncedState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    pokemonList: { name: string, url: string, id: number }[]
}

const PER_PAGE = 60;
const SEARCH_PARAM_NAME = "search"

export function SearchablePokemonList({ pokemonList }: Props) {
    const searchParams = useSearchParams();
    const initialName = searchParams.get(SEARCH_PARAM_NAME) ?? "";
    const pathName = usePathname();
    const [inputValue, setInputValue] = useState("");
    const [relevantPokemon, setRelevantPokemon] = useDebouncedState(500, pokemonList.filter(p => p.name.includes(initialName.toLocaleLowerCase())
        || p.id.toString().includes(initialName)).slice(0, PER_PAGE));

    const router = useRouter();

    useEffect(() => {
        setInputValue(searchParams.get(SEARCH_PARAM_NAME) ?? "")
        filterPokemon(searchParams.get(SEARCH_PARAM_NAME) ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        filterPokemon(e.target.value);
        setInputValue(e.target.value);
    }

    function clearFilter() {
        setInputValue("");
        filterPokemon("");
    }

    useEffect(() => {
        if (!inputValue.length) {
            router.replace(pathName);
            return;
        }
        const params = new URLSearchParams(searchParams.toString())
        params.set(SEARCH_PARAM_NAME, inputValue);

        router.replace(`${pathName}?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue])

    function filterPokemon(value: string) {
        if (value)
            setRelevantPokemon(pokemonList.slice(0, PER_PAGE));
        setRelevantPokemon(pokemonList.filter(p => p.name.includes(value.toLocaleLowerCase()) || p.id.toString().includes(value)).slice(0, PER_PAGE));
    }

    return <div className="flex flex-col items-center gap-4 p-4">
        <div className="relative">
            <input placeholder="Search..." onChange={onChange} value={inputValue} type="text" className="rounded-2xl bg-red-700 border-2 border-white text-white w-52 px-2 py-1 focus:outline-black" />
            <button onClick={clearFilter}
                className="absolute right-2 rounded-full border border-white w-5 h-5 top-2 flex justify-center items-center">x</button>
        </div>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="">
                <ul className=" grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
                    {relevantPokemon?.map(p => <li key={p.name}><PokeCard id={p.id} name={p.name} /></li>)}
                </ul>
            </div>
        </main>
    </div>
}