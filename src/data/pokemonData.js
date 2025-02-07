// pokemonData.js
export const fetchPokemons = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/pokemon')

    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon data')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Pokémon data:', error)
    throw error
  }
}
