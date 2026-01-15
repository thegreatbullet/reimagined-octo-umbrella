import React from 'react'
import BaseButton from './BaseButton'
import shinyIcon from '../../../assets/shiny.svg'

const ShinyIcon = ({ isActive }) => (
  <img
    src={shinyIcon}
    alt='Visual Effects'
    className={`w-6 h-6 transition-transform duration-300 ${
      isActive
        ? 'rotate-12 scale-110 filter drop-shadow-lg'
        : 'rotate-0 scale-100'
    }`}
  />
)

export default function ShinyButton({ isShiny, setIsShiny }) {
  return (
    <BaseButton
      active={isShiny}
      onClick={() => setIsShiny(!isShiny)}
      icon={<ShinyIcon isActive={isShiny} />}
      title={isShiny ? 'Turn Off Shiny' : 'Turn On Shiny'}
      activeColor='yellow'
    />
  )
}
