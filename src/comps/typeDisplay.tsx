type Props = {
    type: string;
}

export function TypeDisplay({ type }: Props) {
    var className =
        type === "grass" ? "bg-lime-800" :
            type === "bug" ? "bg-lime-500 text-black" :
                type === "ghost" ? "bg-purple-500" :
                    type === "poison" ? "bg-purple-700" :
                        type === "ground" ? "bg-amber-800" :
                            type === "rock" ? "bg-yellow-700" :
                                type === "flying" ? "bg-sky-300 text-black" :
                                    type === "fighting" ? "bg-red-600" :
                                        type === "fairy" ? "bg-pink-400" :
                                            type === "psychic" ? "bg-fuchsia-700" :
                                                type === "ice" ? "bg-cyan-300 text-black" :
                                                    type === "steel" ? "bg-neutral-600" :
                                                        type === "dragon" ? "bg-blue-900" :
                                                            type === "water" ? "bg-blue-600" :
                                                                type === "fire" ? "bg-orange-600" :
                                                                    type === "dark" ? "bg-zinc-950" :
                                                                        type === "electric" ? "bg-yellow-500 text-black" : "bg-gray-300 text-black";
    return <div className={`${className} rounded`}>
        <div className="bg-linear-180 from-zinc-50/15 to-zinc-950/15 p-1 px-3 rounded">
            {type}
        </div>
    </div>
}