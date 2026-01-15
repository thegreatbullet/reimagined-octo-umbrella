import React, { createContext, useContext, useState } from 'react'

const RandomPokemonContext = createContext()

export const RandomPokemonProvider = ({ children }) => {
  const [randomIndex, setRandomIndex] = useState(null)

  // Reroll Pokemon Function
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

export const useRandomPokemon = () => useContext(RandomPokemonContext)
