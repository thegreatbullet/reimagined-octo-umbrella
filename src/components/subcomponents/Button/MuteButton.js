import React from 'react'
import BaseButton from './BaseButton'

const SpeakerIcon = ({ isMuted }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={`h-6 w-6 transition-all duration-300 ${
      isMuted
        ? 'text-red-600 rotate-12 scale-110'
        : 'text-black rotate-0 scale-100'
    }`}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M11 5L6 9H2v6h4l5 4V5zM15 9a5 5 0 010 6m3-9a9 9 0 010 12'
    />
  </svg>
)

const MutedOverlay = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6 absolute text-red-600'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M6 6l12 12M6 18L18 6'
    />
  </svg>
)

export default function MuteButton({ isMuted, setIsMuted }) {
  return (
    <BaseButton
      active={isMuted}
      onClick={() => setIsMuted(!isMuted)}
      icon={
        <>
          <SpeakerIcon isMuted={isMuted} />
          {isMuted && <MutedOverlay />}
        </>
      }
      title={isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
      activeColor='red'
    />
  )
}
