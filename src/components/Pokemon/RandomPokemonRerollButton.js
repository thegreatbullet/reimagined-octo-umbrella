import React from 'react'
import buttonImage from '../../assets/button_image.svg'

function RandomPokemonRerollButton({ onReroll }) {
  return (
    <button
      onClick={onReroll}
      className='
    mt-4 
    w-12 h-12 
    rounded-full 
    bg-cover bg-center 
    border-2 border-white 
    shadow-lg 
    hover:scale-110 
    hover:shadow-2xl 
    transition-transform 
    duration-200 
    active:scale-95
  '
      style={{ backgroundImage: `url(${buttonImage})` }}
    ></button>
  )
}

export default RandomPokemonRerollButton
