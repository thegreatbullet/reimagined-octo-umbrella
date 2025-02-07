import React from 'react'

function RandomPokemonText({ pokemons, randomIndex, loading }) {
  if (loading) {
    return <p>Loading Pokémon...</p>
  }

  if (!pokemons.length || randomIndex === null) {
    return <p>No Pokémon data available</p>
  }

  const randomPokemon = pokemons[randomIndex]

  return (
    <div className='mt-4 text-2xl font-semibold text-white-light'>
      <p>{randomPokemon.name}</p>
      {/* You can add more information like type, abilities, etc. */}
    </div>
  )
}

export default RandomPokemonText
