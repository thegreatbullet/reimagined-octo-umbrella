function getRandomPokemonImage() {
  const DAILY_KEY = 'dailyPokemon'

  // Generate random image
  const randomNumber = Math.floor(Math.random() * 10) + 1
  const imagePath = `/Pictures/Pokémon_${randomNumber}.png`
  localStorage.setItem(DAILY_KEY, JSON.stringify({ imagePath }))

  return imagePath
}

export default getRandomPokemonImage
