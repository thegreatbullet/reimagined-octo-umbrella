// src/layouts/BasicLayout.js
import colors from '../data/ColorData'
import MainPokemon from '../components/MainPokemon'

function HomePage() {
  return (
    <div
      className={`min-h-screen flex flex-col bg-brown-dark ${colors.orange_light}`}
    >
      {/* Header Section */}
      <header className='flex flex-col items-center justify-center bg-black-primary text-orange-dark'>
        <div className='flex items-center space-x-3 md:space-x-6 pt-8 pb-6 px-4 md:pt-12 md:pb-8 md:px-8'>
          <img
            src='/title_image.svg'
            alt='Pokémon Roller Logo'
            className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16'
          />
          <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold text-blue-light text-center'>
            Pokémon Randomizer
          </h1>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className='bg-white-light w-full py-1 flex justify-center'>
        {/* Add navigation links here */}
      </nav>

      {/* Main Content */}
      <main className='flex-grow flex items-center justify-center'>
        <MainPokemon />
      </main>

      {/* Footer */}
      <footer className='p-6 bg-yellow-50 text-white text-center'>
        <p>&copy; 2024 Pokémon Randomizer</p>
      </footer>
    </div>
  )
}

export default HomePage
