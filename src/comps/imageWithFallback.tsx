'use client'

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK_FALLBACK = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"

export function ImageWithFallback(props: ImageProps & { fallback: string }) {
    const [src, setSrc] = useState(props.src)
    const { fallback, ...rest } = props;

    return <Image {...rest} src={src ?? FALLBACK_FALLBACK} onError={() => setSrc(fallback)} alt="" />
}