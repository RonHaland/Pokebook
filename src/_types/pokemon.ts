export type PokemonList = {
    count: number,
    next: string,
    prev: string,
    results: { name: string, url: string, id: number }[]
}

export type PokemonInfo = {
    sprites: { front_default: string, back_default: string },
    name: string,
    id: number,
    species: { name: string, url: string },
    abilities: { slot: number, hidden: boolean, ability: PokemonAbility }[],
    moves: { move: PokemonMove }[],
    stats: { base_stat: number, effort: number, stat: PokemonStat }[],
    types: { slot: number, type: PokemonType }[],
}

export type FullAbility = {
    id: number,
    name: string,
    effect_entries: {
        effect: string,
        short_effect: string,
        language: {
            name: string,
            url: string,
        }
    }[],
    flavor_text_entries: { flavor_text: string, language: { name: string, url: string } }[],
}

export type PokemonSpecies = {
    id: number,
    name: string,
    evolution_chain: { url: string },
    flavor_text_entries: { flavor_text: string, language: { name: string, url: string } }[],
}

export type PokemonEvolutionChain = {
    id: number,
    chain: EvolutionLink
}

export type EvolutionLink = {
    is_baby: boolean,
    species: { name: string, url: string },
    evolves_to: EvolutionLink[],
}

export type EvolutionMap = {
    species: PokemonSpecies,
    children: EvolutionMap[]
}

export type PokemonTypeData = {
    id: number,
    name: string,
    moves: PokemonMove[],
    pokemon: PokemonTypePokemon[],
}

type PokemonTypePokemon = {
    pokemon: { name: string, url: string },
    slot: number;
}

type PokemonAbility = {
    name: string,
    url: string,
}

type PokemonMove = {
    name: string,
    url: string,
}

type PokemonStat = {
    name: string,
    url: string,
}

type PokemonType = {
    name: string,
    url: string,
}