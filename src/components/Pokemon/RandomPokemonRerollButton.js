import React from 'react'
import buttonImage from '../../assets/button_image.svg'

function RandomPokemonRerollButton({ onReroll }) {
  return (
    <button
      onClick={onReroll}
      className='mt-4 rounded-lg'
      style={{
        backgroundImage: `url(${buttonImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '3em',
        height: '3em',
        border: 'none',
      }}
    ></button>
  )
}

export default RandomPokemonRerollButton
