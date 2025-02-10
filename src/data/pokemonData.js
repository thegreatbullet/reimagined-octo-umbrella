const API_BASE_URL = 'https://cautious-pancake-1.onrender.com/api/pokemon'

export const fetchPokemons = async () => {
  try {
    const response = await fetch(API_BASE_URL)
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
