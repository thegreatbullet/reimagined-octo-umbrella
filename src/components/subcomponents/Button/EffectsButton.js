import React from 'react'
import BaseButton from './BaseButton'
import effectsIcon from '../../../assets/effects.svg'

const EffectsIcon = ({ isActive }) => (
  <img
    src={effectsIcon}
    alt='Visual Effects'
    className={`w-6 h-6 transition-transform duration-300 ${
      isActive
        ? 'rotate-12 scale-110 filter drop-shadow-lg'
        : 'rotate-0 scale-100'
    }`}
  />
)

export default function EffectsButton({ showEffects, setShowEffects }) {
  return (
    <BaseButton
      active={showEffects}
      onClick={() => setShowEffects(!showEffects)}
      icon={<EffectsIcon isActive={showEffects} />}
      title={showEffects ? 'Hide Visual Effects' : 'Show Visual Effects'}
      activeColor='blue'
    />
  )
}
