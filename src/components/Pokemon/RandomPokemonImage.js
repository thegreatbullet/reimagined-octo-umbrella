import React, { useEffect, useState, useRef } from 'react'
import typeColors from '../../data/typeColors'

function RandomPokemonImage({ pokemons, randomIndex, loading, shakeTrigger }) {
  const [shake, setShake] = useState(false)
  const firstRender = useRef(true)

  // Safe randomPokemon calculation
  const randomPokemon =
    Array.isArray(pokemons) && randomIndex >= 0 && randomIndex < pokemons.length
      ? pokemons[randomIndex]
      : null

  useEffect(() => {
    if (!randomPokemon) return

    if (firstRender.current) {
      firstRender.current = false
      return
    }

    setShake(true)
    const timer = setTimeout(() => setShake(false), 300)
    return () => clearTimeout(timer)
  }, [randomPokemon])

  useEffect(() => {
    if (shakeTrigger) {
      setShake(true)
      const timer = setTimeout(() => setShake(false), 300)
      return () => clearTimeout(timer)
    }
  }, [shakeTrigger])

  if (loading)
    return (
      <div className='w-full h-full flex flex-col items-center justify-center space-y-4'>
        {/* Spinner when Loading from Backend */}
        <div className='w-10 h-10  border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin' />

        {/* Second animation when Loading from Backend */}
        <p className='text-gray-800 font-semibold text-lg flex items-center space-x-1 md:mt-8 '>
          <span>Fetching data</span>
          <div className='flex items-center justify-center gap-10'>
            <span className='inline-block w-2 h-2 bg-gray-800 rounded-full animate-bounce'></span>
            <span className='inline-block w-2 h-2 bg-gray-800 rounded-full animate-bounce delay-150'></span>
            <span className='inline-block w-2 h-2 bg-gray-800 rounded-full animate-bounce delay-300'></span>
          </div>
        </p>
      </div>
    )

  // If no data is found on backend
  if (!randomPokemon) return null

  const fullImageUrl = randomPokemon.imageUrl
  const namePillBg = '#FFD700'
  const namePillColor = '#111111'

  const types = randomPokemon.type?.filter(Boolean) || []
  let gradient = '#002B42'
  if (types.length === 1) {
    const key = types[0].toLowerCase()
    gradient = typeColors[key]?.bg || '#777777'
  } else if (types.length > 1) {
    const colors = types.map(
      (t) => typeColors[t.toLowerCase()]?.bg || '#777777'
    )
    const percent = 100 / colors.length
    gradient = `linear-gradient(135deg, ${colors
      .map((c, i) => `${c} ${i * percent}%, ${c} ${(i + 1) * percent}%`)
      .join(', ')})`
  }

  return (
    <div className='flex flex-col items-center mt-6 cursor-pointer'>
      <div
        className='rounded-2xl shadow-2xl p-7 md:p-16 flex flex-col items-center transition-transform hover:scale-105 relative overflow-hidden border border-black'
        style={{ background: gradient }}
      >
        {/* Main Pokémon image */}
        <div className='w-48 h-48 flex items-center justify-center rounded-xl overflow-visible z-10'>
          <img
            key={randomPokemon.id}
            src={fullImageUrl}
            alt={randomPokemon.name}
            className={`
              w-full h-full object-contain
              drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]
              transition-all duration-500 ease-out
              animate-slide-fade-in
              ${shake ? 'animate-shake' : ''}
            `}
          />
        </div>

        {/* Pokemon Name + Types */}
        <div className='mt-10 flex flex-col items-center space-y-2 w-[220px] z-10'>
          <span
            className='px-4 py-2 font-bold rounded-full text-xl capitalize shadow-md text-center w-full truncate'
            style={{ backgroundColor: namePillBg, color: namePillColor }}
          >
            {randomPokemon.name}
          </span>

          <div className='flex justify-start gap-4 w-full pt-6 pl-4'>
            {Array.from({ length: 5 }).map((_, idx) => {
              const type = randomPokemon.type[idx]
              if (!type)
                return (
                  <span key={idx} className='invisible w-16 min-w-[5rem]'>
                    Placeholder
                  </span>
                )

              const key = type.toLowerCase()
              const typeColor = typeColors[key]?.bg || '#777777'

              return (
                <span
                  key={idx}
                  className='px-3 py-1 rounded-full font-semibold text-sm capitalize text-center w-16 min-w-[5rem] shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105'
                  style={{
                    backgroundColor: '#f9f9f9',
                    color: '#111111',
                    border: `3px solid ${typeColor}`,
                    boxShadow: `0 0 0 2px white`,
                  }}
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
