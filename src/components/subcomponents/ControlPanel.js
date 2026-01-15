import React from 'react'
import MuteButton from './Button/MuteButton'
import ShinyButton from './Button/ShinyButton'
import EffectsButton from './Button/EffectsButton'

function ControlPanelResponsive({
  isMuted,
  setIsMuted,
  isShiny,
  setIsShiny,
  showEffects,
  setShowEffects,
}) {
  return (
    <>
      {/* Desktop Vertical Panel */}
      <div className='hidden md:flex flex-col space-y-4 justify-start mt-12'>
        <MuteButton isMuted={isMuted} setIsMuted={setIsMuted} />
        <ShinyButton isShiny={isShiny} setIsShiny={setIsShiny} />
        <EffectsButton
          showEffects={showEffects}
          setShowEffects={setShowEffects}
        />
      </div>

      {/* Mobile Horizontal Panel */}
      <div className='md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 flex justify-around bg-red-600 rounded-2xl shadow-lg p-3'>
        <MuteButton isMuted={isMuted} setIsMuted={setIsMuted} />
        <ShinyButton isShiny={isShiny} setIsShiny={setIsShiny} />
        <EffectsButton
          showEffects={showEffects}
          setShowEffects={setShowEffects}
        />
      </div>
    </>
  )
}

export default ControlPanelResponsive
