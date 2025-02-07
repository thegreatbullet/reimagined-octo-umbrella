import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../data/pokemonData'
import RandomPokemonImage from './Pokemon/RandomPokemonImage'
import RandomPokemonRerollButton from './Pokemon/RandomPokemonRerollButton'
import RandomPokemonText from './Pokemon/RandomPokemonText'

function MainPokemon() {
  const [pokemons, setPokemons] = useState([])
  const [randomIndex, setRandomIndex] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch Pokémon data on mount
  useEffect(() => {
    const getPokemons = async () => {
      try {
        const data = await fetchPokemons()
        setPokemons(data)
        setRandomIndex(Math.floor(Math.random() * data.length)) // Random initial Pokémon
      } catch (error) {
        console.error('Error fetching Pokémon:', error)
      } finally {
        setLoading(false)
      }
    }
    getPokemons()
  }, [])

  // Reroll to get a new random Pokémon
  const rerollPokemon = () => {
    if (pokemons.length > 0) {
      const newIndex = Math.floor(Math.random() * pokemons.length)
      setRandomIndex(newIndex)
    }
  }

  return (
    <div className='p-8 text-center'>
      <div className='mb-6 p-12'>
        <RandomPokemonImage
          pokemons={pokemons}
          randomIndex={randomIndex}
          loading={loading}
        />
      </div>
      <div className='p-3'>
        <RandomPokemonText
          pokemons={pokemons}
          randomIndex={randomIndex}
          loading={loading}
        />
      </div>
      <div className='p-8'>
        <RandomPokemonRerollButton onReroll={rerollPokemon} />
      </div>
    </div>
  )
}

export default MainPokemon
