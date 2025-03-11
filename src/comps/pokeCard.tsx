'use client'
import { CapitalizeFirst } from "@/_utils/stringFuncs";

import { unstable_ViewTransition as ViewTransition } from 'react'
import { ImageWithFallback } from "./imageWithFallback";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
    name: string;
    id: number;
}

export function PokeCard({ name = "", id = -1 }: Props) {

    const queryParams = useSearchParams();

    return <Link href={`/${name}?${queryParams}`}>
        <article className="p-2 bg-linear-to-b from-red-600 to-red-800 rounded-lg grid justify-center place-items-center lg:grid-cols-[1fr_50px] w-36 xl:w-52 shadow-lg outline-white shadow-black hover:scale-110 hover:outline-2 transition-all duration-200">
            <h2><ViewTransition name={`name-${name}`}><span>{CapitalizeFirst(name)}</span></ViewTransition></h2>
            <ViewTransition name={`icon-${name}`}>
                <ImageWithFallback alt={name} width={50} height={50} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} fallback="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png" />
            </ViewTransition>
        </article>
    </Link>
}