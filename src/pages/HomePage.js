import React from 'react'
import MainPokemon from '../components/MainPokemon'

function HomePage() {
  // Define your colors inline
  const colors = {
    red: { light: '#E84855', dark: '#830A48' },
    orange: { light: '#E39774', dark: '#FA7921' },
    yellow: { light: '#F7F06D', dark: '#F9DB6D' },
    green: { light: '#5C9EAD', dark: '#326273' },
    blue: { light: '#449DD1', dark: '#0E0E52' },
    indigo: { light: '#464D77', dark: '#40376E' },
    violet: { light: '#3943B7', dark: '#832161' },
    white: { light: '#FFFFFF', dark: '#EEEEEE' },
    black: { primary: '#051014' },
    brown: { light: '#877666' },
  }

  return (
    <div
      className='min-h-screen flex flex-col'
      style={{ backgroundColor: colors.brown.light }}
    >
      {/* Header Section */}
      <header
        style={{
          backgroundColor: colors.black.primary,
          color: colors.orange.dark,
        }}
        className='flex flex-col items-center justify-center'
      >
        <div className='flex items-center space-x-3 md:space-x-6 pt-8 pb-6 px-4 md:pt-12 md:pb-8 md:px-8'>
          <img
            src='/title_image.svg'
            alt='Pokémon Roller Logo'
            className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16'
          />
          <h1
            className='text-3xl sm:text-4xl md:text-6xl font-bold text-center'
            style={{ color: colors.blue.light }}
          >
            Pokémon Randomizer
          </h1>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav
        className='w-full py-2 flex justify-center'
        style={{ backgroundColor: colors.white.light }}
      >
        {/* Add navigation links here */}
      </nav>

      {/* Main Content */}
      <main className='flex-grow flex items-center justify-center'>
        <MainPokemon />
      </main>

      {/* Footer */}
      <footer
        className='p-6 text-white text-center'
        style={{ backgroundColor: colors.yellow.light }}
      >
        <p>&copy; 2024 Pokémon Randomizer</p>
      </footer>
    </div>
  )
}

export default HomePage
