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
    <div className='mb-3'>
      <div className='flex justify-between text-sm mb-1'>
        <span className='font-semibold'>{label}</span>
        <span>{value}</span>
      </div>

      <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full ${barColor} transition-all duration-700 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function PokemonStatsPanel({ pokemon }) {
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    // 1 in 4096 shiny chance
    const roll = Math.floor(Math.random() * 4096)
    setIsShiny(roll === 0)
  }, [pokemon?.number])

  if (!pokemon || !pokemon.stats) return null

  const mainType = pokemon.types?.[0] || 'default'
  const { hp = 0, attack = 0, defense = 0, speed = 0 } = pokemon.stats

  return (
    <div
      className={`w-full max-w-sm mt-4 p-4 rounded-2xl shadow-md transition-all duration-700
        ${
          isShiny
            ? 'bg-yellow-50 ring-4 ring-yellow-400 animate-pulse'
            : 'bg-white'
        }
      `}
    >
      <h3 className='text-lg font-bold mb-2 text-center'>
        Pokédex Stats
        {isShiny && (
          <span className='ml-2 text-yellow-500 animate-bounce'>✨ Shiny!</span>
        )}
      </h3>

      <StatRow label='HP' value={hp} type={mainType} />
      <StatRow label='Attack' value={attack} type={mainType} />
      <StatRow label='Defense' value={defense} type={mainType} />
      <StatRow label='Speed' value={speed} type={mainType} />
    </div>
  )
}
