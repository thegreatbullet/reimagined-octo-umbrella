import React from 'react'

// Map each type to a full Tailwind class: background + text color
const typeClasses = {
  Normal: 'bg-gray-400 text-gray-900',
  Fire: 'bg-red-500 text-white',
  Water: 'bg-blue-500 text-white',
  Grass: 'bg-green-500 text-white',
  Electric: 'bg-yellow-400 text-gray-900',
  Ice: 'bg-cyan-200 text-gray-900',
  Fighting: 'bg-orange-700 text-white',
  Poison: 'bg-purple-500 text-white',
  Ground: 'bg-yellow-700 text-white',
  Flying: 'bg-indigo-300 text-gray-900',
  Psychic: 'bg-pink-500 text-white',
  Bug: 'bg-green-700 text-white',
  Rock: 'bg-gray-700 text-white',
  Ghost: 'bg-indigo-900 text-white',
  Dragon: 'bg-purple-800 text-white',
  Dark: 'bg-gray-900 text-white',
  Steel: 'bg-gray-500 text-white',
  Fairy: 'bg-pink-300 text-gray-900',
}

function RandomPokemonImage({ pokemons, randomIndex, loading }) {
  if (loading) return <p>Loading Pokémon...</p>
  if (!pokemons.length || randomIndex === null)
    return <p>No Pokémon data available</p>

  const randomPokemon = pokemons[randomIndex]
  const fullImageUrl = `https://cautious-pancake-1.onrender.com${randomPokemon.imageUrl.replace(
    '../',
    '/'
  )}`

  return (
    <div className='flex flex-col items-center mt-6'>
      <div className='bg-gray-800 rounded-2xl shadow-2xl p-10 md:p-8 flex flex-col items-center transition-transform hover:scale-105'>
        <img
          src={fullImageUrl}
          alt={randomPokemon.name}
          className='w-48 h-48 object-cover rounded-xl shadow-md'
        />

        <div className='mt-10 flex flex-wrap items-center justify-center space-x-2 min-w-[180px]'>
          {/* Pokémon name */}
          <span className='px-4 py-2 bg-yellow-300 md:bg-yellow-400 text-gray-800 font-semibold rounded-full text-xl md:text-2xl capitalize shadow-sm'>
            {randomPokemon.name}
          </span>

          {/* Type pills */}
          {randomPokemon.type.map((t, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full font-semibold text-sm md:text-base capitalize ${typeClasses[t]}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RandomPokemonImage
