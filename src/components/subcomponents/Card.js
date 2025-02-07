// src/Card.js
import React from 'react'

function Card({ pokemon }) {
  return (
    <div>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className='w-full h-48 object-cover rounded'
      />
      <h2 className='mt-4 text-xl font-bold'>{pokemon.name}</h2>
    </div>
  )
}

export default Card
