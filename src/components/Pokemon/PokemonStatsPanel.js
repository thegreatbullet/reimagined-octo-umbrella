import { useEffect, useState } from 'react'

const MAX_STAT = 150

const typeBarColors = {
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-400',
  dark: 'bg-gray-700',
  fairy: 'bg-pink-300',
  fighting: 'bg-orange-500',
  default: 'bg-indigo-400',
}

function StatRow({ label, value, type }) {
  const width = Math.min((value / MAX_STAT) * 100, 100)
  const barColor = typeBarColors[type] || typeBarColors.default

  return (
    <div className='space-y-1'>
      <div className='flex justify-between items-center text-xs uppercase tracking-wide text-gray-600'>
        <span className='font-semibold'>{label}</span>
        <span className='font-mono'>{value}</span>
      </div>

      <div className='w-full h-2.5 bg-gray-200/70 rounded-full overflow-hidden'>
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function PokemonStatsPanel({ pokemon }) {
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    const roll = Math.floor(Math.random() * 4096)
    setIsShiny(roll === 0)
  }, [pokemon?.number])

  if (!pokemon || !pokemon.stats) return null

  const mainType = pokemon.types?.[0] || 'default'

  const {
    hp = 0,
    attack = 0,
    defense = 0,
    specialAttack = 0,
    specialDefense = 0,
    speed = 0,
  } = pokemon.stats

  return (
    <div
      className={`
        w-full max-w-sm
        px-6 py-7
        rounded-3xl
        bg-white
        shadow-md
        cursor-pointer
        hover:shadow-2xl
        hover:ring-1 hover:ring-indigo-300
        transition-shadow duration-300 ease-out
        ${isShiny ? 'ring-2 ring-yellow-400' : ''}
      `}
      style={{ backgroundColor: 'white' }}
    >
      {/* Pokémon Name */}
      <h2 className='text-xl font-extrabold text-center tracking-wide text-gray-900 mb-1'>
        {pokemon.name}
      </h2>

      {/* Dex label */}
      <p className='text-xs text-center uppercase tracking-widest text-gray-400 mb-5'>
        Pokédex Stats
        {isShiny && (
          <span className='ml-2 text-yellow-500 animate-pulse'>✨ Shiny</span>
        )}
      </p>

      <div className='space-y-4'>
        <StatRow label='HP' value={hp} type={mainType} />
        <StatRow label='Attack' value={attack} type={mainType} />
        <StatRow label='Defense' value={defense} type={mainType} />
        <StatRow label='Sp. Atk' value={specialAttack} type={mainType} />
        <StatRow label='Sp. Def' value={specialDefense} type={mainType} />
        <StatRow label='Speed' value={speed} type={mainType} />
      </div>
    </div>
  )
}
