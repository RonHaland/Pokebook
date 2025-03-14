type Props = {
    type: string;
    className?: string
}

export function TypeDisplay({ type, className = ""}: Props) {
    const classes =
        type === "grass" ? "bg-lime-800" :
            type === "bug" ? "bg-lime-500 text-black" :
                type === "ghost" ? "bg-purple-900" :
                    type === "poison" ? "bg-purple-600" :
                        type === "ground" ? "bg-amber-800" :
                            type === "rock" ? "bg-yellow-700" :
                                type === "flying" ? "bg-sky-400 text-black" :
                                    type === "fighting" ? "bg-red-800" :
                                        type === "fairy" ? "bg-pink-400" :
                                            type === "psychic" ? "bg-rose-500" :
                                                type === "ice" ? "bg-cyan-400 text-black" :
                                                    type === "steel" ? "bg-cyan-900" :
                                                        type === "dragon" ? "bg-blue-900" :
                                                            type === "water" ? "bg-blue-600" :
                                                                type === "fire" ? "bg-orange-600" :
                                                                    type === "dark" ? "bg-zinc-900" :
                                                                        type === "electric" ? "bg-yellow-500 text-black" : "bg-gray-400 text-black";
    return <div className={`${classes} rounded ${className}`}>
        <div className="bg-linear-180 from-zinc-50/15 to-zinc-950/15 p-1 px-3 rounded border-rose">
            {type}
        </div>
    </div>
}