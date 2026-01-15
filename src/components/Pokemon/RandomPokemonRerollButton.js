import React from 'react'
import buttonImage from '../../assets/button3.svg'

function RandomPokemonRerollButton({ onReroll }) {
  return (
    <button
      onClick={onReroll}
      className='
        mt-4
        w-16 h-16
        rounded-full
        bg-cover bg-center
        border-1 border-white
        shadow-lg
        cursor-pointer
        hover:scale-110
        hover:shadow-2xl
        hover:ring-2 hover:ring-white/60
        hover:animate-hover-bounce
        transition-all duration-200
        active:scale-95
        active:shadow-md
      '
      style={{ backgroundImage: `url(${buttonImage})` }}
    ></button>
  )
}

export default RandomPokemonRerollButton
