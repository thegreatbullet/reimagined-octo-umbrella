import React from 'react'
import typeColors from '../../data/typeColors'

function RandomPokemonImage({ pokemons, randomIndex, loading }) {
  if (loading) return <p>Loading Pokémon...</p>
  if (!pokemons.length || randomIndex === null)
    return <p>No Pokémon data available</p>

  const randomPokemon = pokemons[randomIndex]
  const fullImageUrl = randomPokemon.imageUrl
  const firstType = randomPokemon.type[0]?.toLowerCase()

  // Unique pill for Pokémon name
  const namePillBg = '#FFD700' // gold color for name pill
  const namePillColor = '#111111' // dark text

  return (
    <div className='flex flex-col items-center mt-6'>
      <div className='bg-[#002B42] rounded-2xl shadow-2xl p-7 md:p-16 flex flex-col items-center transition-transform hover:scale-105'>
        {/* Image */}
        <div className='w-48 h-48 flex items-center justify-center rounded-xl overflow-hidden'>
          <img
            src={fullImageUrl}
            alt={randomPokemon.name}
            className='w-full h-full object-contain'
          />
        </div>

        {/* Name + Types */}
        <div className='mt-10 flex flex-col items-center space-y-2 w-[220px]'>
          {/* Pokémon name pill (unique style) */}
          <span
            className='px-4 py-2 font-bold rounded-full text-xl capitalize shadow-md text-center w-full truncate'
            style={{
              backgroundColor: namePillBg,
              color: namePillColor,
            }}
          >
            {randomPokemon.name}
          </span>

          {/* Type pills */}
          <div className='flex justify-center gap-2 w-full'>
            {Array.from({ length: 3 }).map((_, idx) => {
              const type = randomPokemon.type[idx]
              if (!type)
                return (
                  <span key={idx} className='invisible w-16 min-w-[5rem]'>
                    Placeholder
                  </span>
                )

              const key = type.toLowerCase()
              const bg = typeColors[key]?.bg || '#777777'
              const textColor =
                typeColors[key]?.text === 'dark' ? '#111111' : '#FFFFFF'

              return (
                <span
                  key={idx}
                  className='px-3 py-1 rounded-full font-semibold text-sm capitalize text-center w-16 min-w-[5rem]'
                  style={{ backgroundColor: bg, color: textColor }}
                >
                  {type}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RandomPokemonImage
