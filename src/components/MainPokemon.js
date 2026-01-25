import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../data/pokemonData'
import RandomPokemonImage from './Pokemon/RandomPokemonImage'
import RandomPokemonRerollButton from './Pokemon/RandomPokemonRerollButton'
import PokemonStatsPanel from './Pokemon/PokemonStatsPanel'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import { sparkleOptionsList } from '../data/shinyPokemonSparkle'
import ControlPanel from './subcomponents/ControlPanel'
import GenerationPanel from './subcomponents/GenerationPanel'
import PreviousRolls from './subcomponents/Storage/PreviousRolls'
import { soundEffect1 } from '../utils/SoundEffects'

function MainPokemon() {
  const [pokemons, setPokemons] = useState([])
  const [activeModal, setActiveModal] = useState(null)

  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [randomIndex, setRandomIndex] = useState(null)
  const [selectedGeneration, setSelectedGeneration] = useState(1)
  const [loading, setLoading] = useState(true)
  const [animate, setAnimate] = useState(false)
  const [isShiny, setIsShiny] = useState(false)
  const [showEffects, setShowEffects] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  // eslint-disable-next-line
  const [listOpen, setListOpen] = useState(false)
  const [history, setHistory] = useState([])

  const LAST_ROLL_KEY = 'lastPokemonRoll'
  const STORAGE_KEY = 'previousPokemonRolls'
  const SHINY_CHANCE = 0

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

  const currentPokemon =
    filteredPokemons.length > 0 && randomIndex !== null
      ? filteredPokemons[randomIndex]
      : null

  // Load Pokémon once at the start
  useEffect(() => {
    const CACHE_KEY = 'POKEMON_CACHE'
    const CACHE_TIMESTAMP_KEY = 'POKEMON_CACHE_TIMESTAMP'

    const loadData = async () => {
      setLoading(true)

      try {
        let data = []
        let useCache = false
        const now = Date.now()

        // --- Check cache ---
        const cachedData = localStorage.getItem(CACHE_KEY)
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)

        console.log('Checking cache...')
        if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData)
            if (
              parsedData.length > 0 && // <-- only use cache if not empty
              cachedTimestamp &&
              now - parseInt(cachedTimestamp) < 30 * 60 * 1000 // 30 minutes
            ) {
              data = parsedData
              useCache = true
              console.log(`Using cached Pokémon data (${data.length} entries)`)
            } else {
              console.log('Cache is empty or stale, will fetch from API')
            }
          } catch (err) {
            console.error('Failed to parse cached data:', err)
          }
        } else {
          console.log('No cached data found, will fetch from API')
        }

        // --- Fetch if no valid cache ---
        if (!useCache) {
          console.log('Fetching Pokémon from API...')
          try {
            data = await fetchPokemons()
            console.log(`Fetched ${data.length} Pokémon from API`)
            localStorage.setItem(CACHE_KEY, JSON.stringify(data))
            localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString())
            console.log('Saved fetched Pokémon to localStorage')
          } catch (err) {
            console.error('API fetch failed:', err)
            // fallback to cached data if available and parseable
            if (cachedData) {
              try {
                const fallbackData = JSON.parse(cachedData)
                if (fallbackData.length > 0) {
                  data = fallbackData
                  console.log(
                    'Fallback: using cached data despite fetch failure',
                  )
                } else {
                  console.warn('Cached data empty, cannot fallback')
                }
              } catch (parseErr) {
                console.error(
                  'Fallback failed: cannot parse cached data',
                  parseErr,
                )
              }
            } else {
              console.warn('No cached data to fallback to')
            }
          }
        }

        setPokemons(data)

        // --- Filter generation ---
        if (data.length > 0) {
          try {
            filterGeneration(data, selectedGeneration)
          } catch (err) {
            console.error('Error filtering generation:', err)
          }
        } else {
          console.warn('No Pokémon data available to filter')
        }
      } catch (err) {
        console.error('Unexpected error initializing Pokémon:', err)
        setPokemons([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedGeneration])

  // Filter Pokémon by generation
  const filterGeneration = (data, generation) => {
    const genPokemons = data.filter((p) => p.generation === generation)
    setFilteredPokemons(genPokemons)

    if (genPokemons.length > 0) {
      const savedRoll = JSON.parse(
        localStorage.getItem(LAST_ROLL_KEY) || 'null',
      )
      let index = Math.floor(Math.random() * genPokemons.length)
      let shiny = Math.random() < SHINY_CHANCE

      if (
        savedRoll &&
        savedRoll.generation === generation &&
        savedRoll.index < genPokemons.length
      ) {
        index = savedRoll.index
        shiny = savedRoll.isShiny
      }

      setRandomIndex(index)
      setIsShiny(shiny)
      localStorage.setItem(
        LAST_ROLL_KEY,
        JSON.stringify({ generation, index, isShiny: shiny }),
      )

      // Update history
      const current = genPokemons[index]
      if (current) {
        setHistory((prev) => {
          const filtered = prev.filter((p) => p.number !== current.number)
          const updated = [
            {
              number: current.number,
              name: current.name,
              imageUrl: current.imageUrl,
            },
            ...filtered,
          ]
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
          return updated
        })
      }
    } else {
      setRandomIndex(null)
      setIsShiny(false)
    }
  }

  // To reroll pokemon
  const rerollPokemon = () => {
    if (filteredPokemons.length === 0 || randomIndex === null) return

    let newIndex
    do {
      newIndex = Math.floor(Math.random() * filteredPokemons.length)
    } while (newIndex === randomIndex && filteredPokemons.length > 1)

    const shiny = Math.random() < SHINY_CHANCE
    setRandomIndex(newIndex)
    setIsShiny(shiny)
    setAnimate(true)

    localStorage.setItem(
      LAST_ROLL_KEY,
      JSON.stringify({
        generation: selectedGeneration,
        index: newIndex,
        isShiny: shiny,
      }),
    )

    // Update history
    const current = filteredPokemons[newIndex]
    const FULL_HISTORY_MAX = 100
    if (current) {
      setHistory((prev) => {
        const filtered = prev.filter((p) => p.number !== current.number)
        const updated = [
          {
            number: current.number,
            name: current.name,
            imageUrl: current.imageUrl,
          },
          ...filtered,
        ].slice(0, FULL_HISTORY_MAX)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    }

    if (!isMuted) {
      soundEffect1.currentTime = 0
      soundEffect1.play()
    }

    setTimeout(() => setAnimate(false), 300)
  }

  // To choose the pokemon generation
  const handleGenerationSelect = (genNumber) => {
    if (selectedGeneration === genNumber) return
    setSelectedGeneration(genNumber)
    filterGeneration(pokemons, genNumber)
    setListOpen(false)
  }

  // To clear history
  const clearHistory = () => {
    setHistory([])
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  }

  // For Animation
  const particlesInit = async (engine) => {
    await loadSlim(engine)
  }

  // For Animation 2
  const getRandomSparkle = () => {
    const index = Math.floor(Math.random() * sparkleOptionsList.length)
    return sparkleOptionsList[index]
  }

  const romanNumeral = (number) =>
    ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][number - 1] ||
    number

  return (
    <div className='flex flex-col md:flex-row justify-center items-start gap-12 px-6 md:px-12 md:mr-10'>
      {/* Previous Rolls */}
      <PreviousRolls
        history={history}
        clearHistory={clearHistory}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      {/* Main Card + Control Panel */}
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 mr-[1.65rem] md:ml-10 md:mr-12'>
        <div className='hidden md:flex flex-col items-center gap-4 md:flex-row md:justify-start md:mt-12'>
          <ControlPanel
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            isShiny={isShiny}
            setIsShiny={setIsShiny}
            showEffects={showEffects}
            setShowEffects={setShowEffects}
          />
        </div>

        <div className='flex flex-col items-center mb-2 md:mb-0 pt-12 md:pt-24'>
          <div className='mb-0 px-0 py-6 -mt-12 md:-mt-24 md:p-2'>
            {currentPokemon ? (
              <div
                className={`transition-transform duration-300 ${
                  animate
                    ? 'scale-105 -translate-y-6'
                    : 'scale-100 translate-y-0'
                }`}
              >
                <div
                  className='relative w-full max-w-xs h-[380px] md:w-[340px] md:h-[520px] ml-4 md:ml-8'
                  style={{
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                    touchAction: 'manipulation',
                  }}
                >
                  {showEffects && (
                    <Particles
                      init={particlesInit}
                      options={getRandomSparkle()}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 20,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  <div
                    className={`relative z-10 w-full h-full transition-transform duration-500 ${
                      animate && !isFlipped
                        ? 'scale-105 md:scale-105'
                        : 'scale-100'
                    } select-none touch-manipulation`}
                    style={{ perspective: '1200px' }}
                    onClick={() => setIsFlipped((prev) => !prev)}
                    onTouchEnd={(e) => {
                      e.preventDefault()
                      setIsFlipped((prev) => !prev)
                    }}
                  >
                    <div className='w-full h-full relative transition-transform duration-700 ease-in-out'>
                      {/* Front */}
                      {!isFlipped || window.innerWidth >= 768 ? (
                        <div className='absolute inset-0'>
                          <RandomPokemonImage
                            pokemons={filteredPokemons}
                            randomIndex={randomIndex}
                            loading={loading}
                            shakeTrigger={animate}
                            isMuted={isMuted}
                            setIsMuted={setIsMuted}
                          />
                        </div>
                      ) : null}

                      {/* Back */}
                      {isFlipped ? (
                        <div
                          className='absolute inset-0 flex items-center justify-center select-none touch-manipulation md:mt-0 mt-20'
                          style={{
                            WebkitUserSelect: 'none',
                            WebkitTouchCallout: 'none',
                            touchAction: 'manipulation',
                          }}
                        >
                          <PokemonStatsPanel pokemon={currentPokemon} />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {isShiny && (
                    <div className='absolute top-2 right-2 z-30 px-2 py-1 text-xs font-bold rounded-full bg-yellow-300 text-yellow-900 shadow-md'>
                      ✨ SHINY
                    </div>
                  )}
                </div>

                {/* Generation Buttons */}
                {filteredPokemons.length && randomIndex !== null && (
                  <div className='flex items-center justify-end md:justify-start md:mt-0 md:-ml-32 mt-14  w-full'>
                    <button
                      className='
                      ml-44
      px-3 py-1
      rounded-full
      bg-yellow-400
      text-gray-900
      font-semibold
      shadow-md
      text-sm md:text-base
      whitespace-nowrap
      flex-shrink-0
    '
                      onClick={() => setListOpen(true)}
                    >
                      Generation {romanNumeral(currentPokemon.generation)}
                    </button>
                  </div>
                )}

                {/* Reroll Button */}
                <div className='relative flex justify-start md:justify-center mt-3 md:mt-5 ml-[7.5rem] md:ml-10'>
                  <RandomPokemonRerollButton
                    className='md:ml-0 w-12 h-12 md:w-16 md:h-16'
                    onReroll={() => {
                      if (!loading) rerollPokemon()
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center w-[340px] h-[520px]'>
                {loading ? (
                  <div className='flex flex-col items-center'>
                    <div className='w-24 h-24 border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin'></div>
                    <p className='mt-4 text-gray-700 font-semibold'>
                      Fetching Pokémon...
                    </p>
                  </div>
                ) : (
                  <p className='text-yellow-700 font-semibold text-center bg-yellow-100 px-4 py-2 rounded-md shadow-sm'>
                    Pokémon data is not available. Please try again later.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generation Panel */}
      <GenerationPanel
        generations={generations}
        selectedGeneration={selectedGeneration}
        handleGenerationSelect={handleGenerationSelect}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
    </div>
  )
}

export default MainPokemon
