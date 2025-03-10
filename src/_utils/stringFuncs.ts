export function CapitalizeFirst(str: string) {
    return str.slice(0, 1).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
}