import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../data/pokemonData'
import RandomPokemonImage from './Pokemon/RandomPokemonImage'
import RandomPokemonRerollButton from './Pokemon/RandomPokemonRerollButton'
import RandomPokemonText from './Pokemon/RandomPokemonText'
import { Transition } from '@headlessui/react'

function MainPokemon() {
  const [pokemons, setPokemons] = useState([])
  const [randomIndex, setRandomIndex] = useState(null)
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [animate, setAnimate] = useState(false)
  const [listOpen, setListOpen] = useState(false)
  const [selectedGeneration, setSelectedGeneration] = useState(1) // default Gen 1

  const generations = [
    'Generation I',
    'Generation II',
    'Generation III',
    'Generation IV',
    'Generation V',
    'Generation VI',
    'Generation VII',
    'Generation VIII',
    'Generation IX',
  ]

  // Fetch Pokémon data on mount
  useEffect(() => {
    const getPokemons = async () => {
      try {
        const data = await fetchPokemons()
        setPokemons(data)

        // Filter initially to Generation 1
        const genPokemons = data.filter((p) => p.generation === 1)
        setFilteredPokemons(genPokemons)

        // Random Pokémon from Gen 1
        setRandomIndex(Math.floor(Math.random() * genPokemons.length))
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
    if (filteredPokemons.length > 0) {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * filteredPokemons.length)
      } while (newIndex === randomIndex && filteredPokemons.length > 1) // prevent same index

      setRandomIndex(newIndex)
      setAnimate(true)
      setTimeout(() => setAnimate(false), 300)
    }
  }

  // Handle generation selection
  const handleGenerationSelect = (genNumber) => {
    if (selectedGeneration === genNumber) return // do nothing if same generation

    setSelectedGeneration(genNumber)
    const genPokemons = pokemons.filter((p) => p.generation === genNumber)
    setFilteredPokemons(genPokemons)

    // Pick a random Pokémon from the new generation
    if (genPokemons.length > 0) {
      setRandomIndex(Math.floor(Math.random() * genPokemons.length))
    }
  }

  return (
    <div className='flex flex-col md:flex-row justify-center md:space-x-12'>
      {/* Left: Pokémon card + reroll */}
      <div className='flex-1 flex flex-col items-center mb-6 md:mb-0'>
        <div className='mb-0 p-6 md:p-12'>
          <div
            className={`transition-transform duration-300 ${
              animate ? 'scale-105 -translate-y-2' : 'scale-100 translate-y-0'
            }`}
          >
            <RandomPokemonImage
              pokemons={filteredPokemons} // show filtered Pokémon
              randomIndex={randomIndex}
              loading={loading}
            />
          </div>
        </div>
        <div className='p-8 -translate-y-6 md:-translate-y-12'>
          <RandomPokemonRerollButton
            className='w-12 h-12 md:w-16 md:h-16'
            onReroll={rerollPokemon}
          />
        </div>
      </div>

      {/* Right: Generation buttons */}
      <div className='hidden md:flex flex-col space-y-4 fixed top-65 right-96'>
        {/* XS Popout */}
        <button
          className='md:hidden px-4 py-2 bg-blue-500 text-white rounded-lg mb-2'
          onClick={() => setListOpen(true)}
        >
          Show Pokémon List
        </button>
        {/* Animation*/}
        <Transition
          show={listOpen}
          enter='transition transform ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition transform ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 md:hidden'>
            <div className='bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative'>
              <button
                onClick={() => setListOpen(false)}
                className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
              >
                ✕
              </button>
              <h2 className='text-lg font-bold mb-4'>Pokémon Generations</h2>
              <div className='space-y-2 max-h-[60vh] overflow-y-auto'>
                {generations.map((generation, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleGenerationSelect(idx + 1)
                      setListOpen(false)
                    }}
                    className='block w-full text-left px-4 py-2 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-400 font-semibold'
                  >
                    {generation}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Transition>

        {/* MD+ Static List */}
        <ul className='hidden md:block text-left text-lg md:text-xl space-y-2 ml-8'>
          {generations.map((generation, index) => (
            <li key={index}>
              <button
                onClick={() => handleGenerationSelect(index + 1)}
                className={`w-full text-left px-3 py-2 rounded-lg shadow-md font-bold transition-colors duration-200
                  ${
                    selectedGeneration === index + 1
                      ? 'bg-green-700 text-white'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }
                `}
              >
                {generation}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MainPokemon
