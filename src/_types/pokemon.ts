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
    abilities: { slot: number, hidden: boolean, ability: Basic }[],
    moves: { move: Basic }[],
    stats: { base_stat: number, effort: number, stat: Basic }[],
    types: { slot: number, type: Basic }[],
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
    moves: Basic[],
    pokemon: PokemonTypePokemon[],
}

export type PokemonMoveData = {
    id: number
    name: string
    url: string
    accuracy: number
    pp: number
    priority: number
    power: number
    damage_class: Basic
    flavor_text_entries: {flavor_text: string, language: Basic}
}

type PokemonTypePokemon = {
    pokemon: Basic,
    slot: number;
}

type Basic = {
    name: string,
    url: string,
}