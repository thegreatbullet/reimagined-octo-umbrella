// src/layouts/BasicLayout.js
import React from 'react'
import colors from '../data/ColorData'
import MainPokemon from '../components/MainPokemon'
import headerImage from '../assets/header_image.jpeg'

function HomePage() {
  return (
    <div
      className={`min-h-screen flex flex-col bg-brown-dark ${colors.orange_light}`}
    >
      {/* Header Section */}
      <header className=' flex flex-col items-center justify-center bg-black-primary text-orange-dark'>
        <h1 className='pt-12 pb-8 pl-8 pr-8 text-6xl font-bold text-blue-light'>
          Pokémon of the Day
        </h1>
        <img
          src={headerImage}
          alt='Pokémon Logo'
          className='mx-auto rounded-[4px]'
          style={{ width: '26em', height: '10em', objectFit: 'cover' }}
        />
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
