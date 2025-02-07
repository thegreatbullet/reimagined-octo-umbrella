import React, { createContext, useContext, useState } from 'react'

const RandomPokemonContext = createContext()

export const RandomPokemonProvider = ({ children }) => {
  const [randomIndex, setRandomIndex] = useState(null)

  // Function to generate a new random index
  const rerollPokemon = (pokemonCount) => {
    const newIndex = Math.floor(Math.random() * pokemonCount)
    setRandomIndex(newIndex)
  }

  return (
    <RandomPokemonContext.Provider value={{ randomIndex, rerollPokemon }}>
      {children}
    </RandomPokemonContext.Provider>
  )
}

// Custom hook to access the context
export const useRandomPokemon = () => useContext(RandomPokemonContext)
