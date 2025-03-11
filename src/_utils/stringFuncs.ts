export function CapitalizeFirst(str: string) {
    return str.slice(0, 1).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
}


export function ShortenStatName(stat: string) {
    const statMap: { [key: string]: string } = {
        "hp": "hp",
        "attack": "atk",
        "defense": "def",
        "special-attack": "sp-atk",
        "special-defense": "sp-def",
        "speed": "spd"
    }
    return Object.keys(statMap).includes(stat) ? statMap[stat] : stat;
}