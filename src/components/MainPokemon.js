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

  // Convert to roman
  function romanNumeral(number) {
    const romanMap = [
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 8, numeral: 'VIII' },
      { value: 7, numeral: 'VII' },
      { value: 6, numeral: 'VI' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 3, numeral: 'III' },
      { value: 2, numeral: 'II' },
      { value: 1, numeral: 'I' },
    ]

    for (let i = 0; i < romanMap.length; i++) {
      if (number >= romanMap[i].value) {
        return romanMap[i].numeral
      }
    }
    return ''
  }

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
              pokemons={filteredPokemons}
              randomIndex={randomIndex}
              loading={loading}
            />
          </div>
          {/* Generation Badge */}
          {filteredPokemons.length && randomIndex !== null && (
            <button
              className='mt-4 px-3 py-1 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow-md text-sm md:text-base'
              onClick={() => setListOpen(true)}
            >
              Generation{' '}
              {romanNumeral(filteredPokemons[randomIndex].generation)}
            </button>
          )}
        </div>
        <div className='relative'>
          <div className='absolute top-[-1rem] left-[-1rem] md:top-[2rem] md:left-[2rem]'>
            <RandomPokemonRerollButton
              className='w-12 h-12 md:w-16 md:h-16'
              onReroll={rerollPokemon}
            />
          </div>
        </div>
      </div>

      {/* Right: Generation buttons */}
      <div className='relative flex flex-col space-y-4'>
        {/* Mobile XS Popout Button */}
        <div className='md:hidden flex justify-center mt-10 w-full'>
          <button
            className='w-96 bg-green-500 text-white rounded-lg font-bold shadow-md py-2'
            onClick={() => setListOpen(true)}
          >
            Show Pokémon List
          </button>
        </div>

        {/* Mobile Modal / Animation */}
        <Transition
          show={listOpen}
          enter='transition ease-out duration-500'
          enterFrom='opacity-0 -translate-y-20'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-300'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-20'
        >
          {/* Overlay */}
          <div className='fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/30 md:hidden'>
            {/* Modal container with white background */}
            <div className='bg-white rounded-2xl w-full max-w-md shadow-2xl relative'>
              {/* Dark header so title & close are visible */}
              <div className='flex justify-between items-center p-4 bg-gray-100 rounded-t-2xl'>
                <h2 className='text-lg font-bold text-white'>
                  Pokémon Generations
                </h2>
                <button
                  onClick={() => setListOpen(false)}
                  className='text-white hover:text-gray-300 font-bold text-2xl p-2'
                >
                  ✕
                </button>
              </div>

              {/* Modal body with white background */}
              <div className='p-6 space-y-2 max-h-[60vh] overflow-y-auto'>
                {generations.map((generation, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleGenerationSelect(idx + 1)
                      setListOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg shadow-md font-bold transition-colors duration-200
              ${
                selectedGeneration === idx + 1
                  ? 'bg-green-700 text-white'
                  : 'bg-green-500 text-white hover:bg-green-600 hover:text-white'
              }
            `}
                  >
                    {generation}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Transition>

        {/* Desktop Static List */}
        <ul className='hidden md:block text-left text-lg md:text-xl space-y-2 ml-8 fixed top-[27rem] right-96 transform -translate-y-1/2'>
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
