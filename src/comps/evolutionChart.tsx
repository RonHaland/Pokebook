
import { EvolutionLink, EvolutionMap, PokemonEvolutionChain, PokemonSpecies } from "@/_types/pokemon"
import Link from "next/link";
import { ImageWithFallback } from "./imageWithFallback";
import { CapitalizeFirst } from "@/_utils/stringFuncs";

type Props = {
    pokemonSpecies: PokemonSpecies;
    queryParams: string;
}

export async function EvolutionChart({ pokemonSpecies, queryParams }: Props) {
    const pokemonEvolutionResponse = await fetch(pokemonSpecies.evolution_chain.url, { cache: 'force-cache' });
    const pokemonEvolution: PokemonEvolutionChain = await pokemonEvolutionResponse.json();

    const chainLink = pokemonEvolution.chain;
    const evolutionDataPromises = getChildLinkPromises(chainLink);

    function getChildLinkPromises(link: EvolutionLink): Promise<Response>[] {
        let result: Promise<Response>[] = [fetch(link.species.url, { cache: "force-cache" })]
        for (let i = 0; i < link.evolves_to.length; i++) {
            const element = link.evolves_to[i];
            result = [...result, ...getChildLinkPromises(element)]
        }
        return result;
    }

    const evolutionArray = await Promise.all(evolutionDataPromises.map(async p => {
        const response = await p;
        const result: PokemonSpecies = await response.json();
        return result;
    }));

    const evolutionMap = buildEvolutionMapNode(chainLink, evolutionArray);

    function buildEvolutionMapNode(link: EvolutionLink, species: PokemonSpecies[]) {

        let children: EvolutionMap[] = [];

        for (let i = 0; i < link.evolves_to.length; i++) {
            const element = link.evolves_to[i];
            children = [
                ...children,
                {
                    species: species.filter(s => s.name === element.species.name)[0],
                    children: element.evolves_to.map(l => buildEvolutionMapNode(l, species))
                }
            ]
        }

        return {
            species: species.filter(s => s.name === link.species.name)[0],
            children,
        }
    }

    return <div className="flex flex-row gap-2 p-2"><ChartNode node={evolutionMap} isRoot currentPokemon={pokemonSpecies.name} queryParams={queryParams.toString()} /></div>
}


type NodeProps = {
    node?: EvolutionMap,
    currentPokemon?: string,
    isRoot?: boolean,
    className?: string,
    queryParams?: string
}

function ChartNode({ node, currentPokemon = "", isRoot = false, className = "", queryParams = "" }: NodeProps) {
    const childNodes = node?.children.map((c, i) => {
        const isLast = i === node.children.length - 1;
        return <ChartNode key={c.species.name} node={c} currentPokemon={currentPokemon} className={`${!isLast && 'border-b-2 border-white/20'}`} queryParams={queryParams} />
    })

    return <div className={`${className} flex flex-row items-center sm:mx-2 `}>
        {!isRoot && <><span className="m-4 block whitespace-nowrap">{"-->"}</span></>}
        <Link href={`./${node?.species.name}?${queryParams}`}>
            <div className={`py-1 px-2 rounded-2xl bg-black/30 w-24 h-24 flex flex-col items-center ${node?.species.name === currentPokemon && "border-2 border-white"}`}>

                <span>{CapitalizeFirst(node?.species.name ?? "")}</span>
                <ImageWithFallback fallback="" alt={node?.species.name ?? 'pokemon'} width={50} height={50}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node?.species.id}.png`} />
            </div>
        </Link>
        <div className="flex flex-col">{childNodes}</div>
    </div>
}

export function FallbackEvolutionChart() {
    return <>
        <div className="h-24 w-24 rounded-2xl bg-zinc-950/25 my-2 mx-4"></div>
    </>
}