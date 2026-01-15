const API_BASE_URL = 'https://cautious-pancake-1.onrender.com/api/v1/pokemon'

export const fetchPokemons = async () => {
  try {
    const response = await fetch(API_BASE_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon data: ${response.status}`)
    }

    const result = await response.json()
    const pokemons = result.pokemons || []

    // Map generation based on Pokémon number
    const pokemonsWithGeneration = pokemons.map((p) => {
      let generation
      if (p.number <= 151) generation = 1
      else if (p.number <= 251) generation = 2
      else if (p.number <= 386) generation = 3
      else if (p.number <= 493) generation = 4
      else if (p.number <= 649) generation = 5
      else if (p.number <= 721) generation = 6
      else if (p.number <= 809) generation = 7
      else if (p.number <= 905) generation = 8
      else generation = 9

      return { ...p, generation }
    })

    return pokemonsWithGeneration
  } catch (error) {
    console.error('Error fetching Pokémon data:', error)
    return []
  }
}
