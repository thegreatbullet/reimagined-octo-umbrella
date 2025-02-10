function getRandomPokemonImage() {
  const DAILY_KEY = 'dailyPokemon'

  // Generate a new random Pokémon image
  const randomNumber = Math.floor(Math.random() * 10) + 1
  const imagePath = `/Pictures/Pokémon_${randomNumber}.png` // Assuming images are in /public/Pictures/

  // Save the new Pokémon image without checking the date
  localStorage.setItem(DAILY_KEY, JSON.stringify({ imagePath }))

  return imagePath
}

export default getRandomPokemonImage
