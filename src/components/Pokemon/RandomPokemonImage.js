import React from 'react'

function RandomPokemonImage({ pokemons, randomIndex, loading }) {
  if (loading) {
    return <p>Loading Pokémon...</p>
  }

  if (!pokemons.length || randomIndex === null) {
    return <p>No Pokémon data available</p>
  }

  const randomPokemon = pokemons[randomIndex]
  const fullImageUrl = `https://cautious-pancake-1.onrender.com${randomPokemon.imageUrl.replace(
    '../',
    '/'
  )}`

  return (
    <div className='text-center'>
      <div className='flex justify-center items-center'>
        <img
          src={fullImageUrl}
          alt={randomPokemon.name}
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

export default RandomPokemonImage
