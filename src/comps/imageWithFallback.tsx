'use client'

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export function ImageWithFallback(props: ImageProps & { fallback: string }) {
    const [src, setSrc] = useState(props.src)
    const { fallback, ...rest } = props;

    return <Image {...rest} src={src} onError={() => setSrc(fallback)} />
}