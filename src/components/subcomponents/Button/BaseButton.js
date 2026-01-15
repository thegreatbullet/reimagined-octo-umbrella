import React from 'react'

export default function BaseButton({
  active,
  onClick,
  icon,
  title,
  activeColor,
  bgColor = 'white',
}) {
  return (
    <div className='relative group'>
      <button
        onClick={onClick}
        style={{ backgroundColor: bgColor }}
        className={`
          w-12 h-12
          rounded-full
          flex items-center justify-center
          shadow-lg
          transition-all duration-200 ease-out
          hover:scale-110
          active:scale-95
          focus:outline-none
          ring-2 ${
            active ? `ring-${activeColor}-400 animate-pulse` : 'ring-gray-300'
          }
          relative
          z-50
        `}
        title={title}
      >
        {icon}
      </button>
    </div>
  )
}
