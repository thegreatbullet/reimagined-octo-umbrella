import React from 'react'

export default function GenerationPanel({
  generations,
  selectedGeneration,
  handleGenerationSelect,
  activeModal,
  setActiveModal,
}) {
  const generationBorders = [
    'border-red-500',
    'border-blue-500',
    'border-yellow-400',
    'border-green-500',
    'border-purple-500',
    'border-pink-500',
    'border-orange-500',
    'border-cyan-400',
    'border-indigo-500',
    'border-lime-500',
  ]

  const Pokeball = ({ size = 20, active }) => (
    <svg
      className={`${active ? 'animate-pulse' : ''}`}
      width={size}
      height={size}
      viewBox='0 0 64 64'
      fill='none'
    >
      <circle
        cx='32'
        cy='32'
        r='30'
        fill='white'
        stroke='black'
        strokeWidth='4'
      />
      <path d='M2 32h60' stroke='red' strokeWidth='8' />
      <circle
        cx='32'
        cy='32'
        r='8'
        fill={active ? '#facc15' : 'white'}
        stroke='black'
        strokeWidth='4'
      />
    </svg>
  )

  const isOpen = activeModal === 'generationSelector'

  return (
    <>
      {/* Desktop List */}
      <ul className='hidden md:block text-left space-y-3 mr-32 ml-28 mt-4'>
        {generations.map((generation, index) => {
          const isSelected = selectedGeneration === index + 1
          return (
            <li key={index}>
              <button
                onClick={() => handleGenerationSelect(index + 1)}
                className={`flex items-center w-52 px-4 py-2 rounded-xl font-bold transition-all duration-200
                  bg-[#f8f8f8] border-4 ${generationBorders[index]} ${
                  isSelected
                    ? 'scale-110 bg-yellow-100 shadow-[0_0_15px_#facc15]'
                    : 'hover:scale-105 hover:bg-gray-100'
                }`}
              >
                <Pokeball active={isSelected} />
                <span className='flex-1 text-left'>Generation {index + 1}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Mobile List */}
      <div className='md:hidden fixed bottom-6 left-4 z-50'>
        <button
          onClick={() => setActiveModal('generationSelector')}
          className='w-16 h-16 rounded-full shadow-xl flex items-center justify-center bg-white border-4 border-red-500 hover:scale-110 transition-transform'
          style={{ backgroundColor: '#f9f9f9' }}
        >
          {/* Pokéball icon */}
          <svg className='w-10 h-10' viewBox='0 0 64 64' fill='none'>
            <rect
              x='16'
              y='8'
              width='32'
              height='10'
              rx='3'
              fill='#34d399'
              stroke='black'
              strokeWidth='2'
            />
            <rect
              x='12'
              y='24'
              width='40'
              height='10'
              rx='3'
              fill='#facc15'
              stroke='black'
              strokeWidth='2'
            />
            <rect
              x='8'
              y='40'
              width='48'
              height='10'
              rx='3'
              fill='#60a5fa'
              stroke='black'
              strokeWidth='2'
            />
          </svg>
        </button>
      </div>

      {/* Mobile Modal */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 flex items-end z-50 md:hidden -ml-[0.9rem] -mr-[1.1rem]'
          onClick={() => setActiveModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-11/12 max-w-md bg-white rounded-t-3xl shadow-2xl p-4 flex flex-col items-center left-0 ml-4'
            style={{ height: '620px', backgroundColor: '#f9f9f9' }}
          >
            <div className='w-12 h-1.5 bg-gray-300 rounded-full mb-3' />

            {/* Header */}
            <div className='flex justify-between items-center w-full mb-4 px-2'>
              <h2 className='text-gray-800 font-bold text-lg'>
                Select Generation
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className='text-gray-700 text-xl font-bold hover:text-gray-900 transition'
              >
                ×
              </button>
            </div>

            {/* Generation buttons */}
            <div className='w-full flex flex-col gap-3 overflow-y-auto h-[calc(100%-64px)] px-2'>
              {generations.map((generation, index) => {
                const isSelected = selectedGeneration === index + 1
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleGenerationSelect(index + 1)
                      setActiveModal(null)
                    }}
                    className={`flex items-center w-72 px-3 py-2 rounded-xl font-bold transition-all duration-200 bg-[#f8f8f8] border-4 ${
                      generationBorders[index]
                    } ${
                      isSelected
                        ? 'scale-105 bg-yellow-100'
                        : 'hover:scale-105 hover:bg-gray-100'
                    }`}
                  >
                    <Pokeball className='mr-2' active={isSelected} />
                    <span className='ml-3 flex-1 text-left text-sm'>
                      Generation {index + 1}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
