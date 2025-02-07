// function getRandomPokemonImage() {
//   const DAILY_KEY = 'dailyPokemon'
//   const today = new Date().toDateString()

//   // Check if there's a Pokémon saved for today in LocalStorage
//   const storedData = JSON.parse(localStorage.getItem(DAILY_KEY))

//   if (storedData && storedData.date === today) {
//     return storedData.imagePath // Return the saved Pokémon image
//   }

//   // Generate a new random Pokémon image
//   const randomNumber = Math.floor(Math.random() * 10) + 1
//   const imagePath = `/Pictures/Pokémon_${randomNumber}.png` // Assuming images are in /public/Pictures/

//   // Save the new Pokémon image and today's date to LocalStorage
//   localStorage.setItem(DAILY_KEY, JSON.stringify({ imagePath, date: today }))

//   return imagePath
// }

// export default getRandomPokemonImage

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
