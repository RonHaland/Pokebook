import { TypeDisplay } from "@/comps/typeDisplay";
import Link from "next/link";

const TYPES_URL = "https://pokeapi.co/api/v2/type"
export default async function Types() {

    const typesResponse = await fetch(TYPES_URL, { cache: 'force-cache' });
    const types: { results: { name: string, url: string }[] } = await typesResponse.json()

    const typeMap = types.results.map(t => <Link key={t.name} href={`/type/${t.name}`} className="text-2xl" ><TypeDisplay type={t.name} /></Link>)
    return <main className="mt-14"><ul className="grid grid-cols-3 gap-4">{typeMap}</ul></main>
}