import { PokemonInfo } from '@/_types/pokemon';
import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'About the pokemon'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'
const POKEMON_INFO_URL = "https://pokeapi.co/api/v2/pokemon/";

// Image generation
export default async function Image({ params }: { params: { pokemonName: string } }) {

    const pokemonName = params.pokemonName;

    const pokemonInfoResponse = await fetch(POKEMON_INFO_URL + pokemonName, { cache: "force-cache" })
    const pokemonInfo: PokemonInfo = await pokemonInfoResponse.json()

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 36,
                    background: 'linear-gradient(to bottom left, #66f, #0aa)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    position: 'relative'
                }}
            >
                <img src={pokemonInfo.sprites.back_default ?? pokemonInfo.sprites.front_default}
                alt="pokemon sprite"
                style={{
                    width: '800px',
                    position: 'absolute',
                    bottom: '-150px',
                    left: '-150px'
                }} />
                <img src={pokemonInfo.sprites.front_default}
                    alt="pokemon sprite"
                    style={{
                        width: '500px',
                        position: 'absolute',
                        top: '-40px',
                        right: '0'
                    }} />
                <span style={{
                    position: 'absolute',
                    padding: '1rem',
                    background: '#FFFA',
                    display: 'block',
                    right: '100px',
                    bottom: '50px',
                    borderRadius: '20px',
                    fontSize: '72px',
                }}>
                    {pokemonInfo.name.toLocaleUpperCase()}
                </span>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}