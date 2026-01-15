import React, { useState } from 'react'
import FullHistoryModal from './FullHistoryRolls'

export default function PreviousRolls({
  history = [],
  clearHistory = () => {},
  className = '',
  activeModal,
  setActiveModal,
}) {
  const MINI_MAX = 6
  const paddedHistory = [...history.slice(0, MINI_MAX)]
  while (paddedHistory.length < MINI_MAX) paddedHistory.push(null)

  const isOpen = activeModal === 'previousRolls'
  const [showFullHistory, setShowFullHistory] = useState(false)

  return (
    <>
      {/* Desktop Previous Rolls Component*/}
      <div
        className={`hidden md:flex relative w-[24rem] rounded-xl bg-red-600 mr-10 border-4 border-red-700 shadow-xl px-8 py-4 flex-col items-center ${className}`}
      >
        <div className='flex justify-center gap-4 mb-6'>
          <span className='w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_6px_#60a5fa]' />
          <span className='w-3 h-3 rounded-full bg-yellow-300' />
          <span className='w-3 h-3 rounded-full bg-green-300' />
        </div>

        {/* History grid */}
        <div className='bg-white rounded-lg border-2 border-gray-400 shadow-inner h-[500px] w-full p-5 grid grid-cols-2 gap-4 overflow-y-auto auto-rows-[8rem]'>
          {paddedHistory.map((p, i) =>
            p ? (
              <div
                key={p.number}
                title={p.name}
                className='flex justify-center items-center'
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className='w-24 h-24 object-contain mb-2'
                />
              </div>
            ) : (
              <div
                key={`empty-${i}`}
                className='flex justify-center items-center'
              />
            )
          )}
        </div>

        {/* Desktop Buttons */}
        <div className='hidden md:flex gap-3 mt-4 w-full'>
          <button
            onClick={clearHistory}
            className='flex-1 bg-[#f0f0e6] border-2 border-[#7fc27f] text-gray-800 font-semibold text-sm py-2 rounded-lg shadow-md hover:bg-[#e0e0d6] transition-colors'
          >
            Clear
          </button>
          <button
            onClick={() => setShowFullHistory(true)}
            className='flex-1 bg-[#f0f0e6] border-2 border-[#60a5fa] text-gray-800 font-semibold text-sm py-2 rounded-lg shadow-md hover:bg-[#e0e0d6] transition-colors'
          >
            Full History
          </button>
        </div>
      </div>

      {/* Mobile Previous Rolls Component*/}
      <div className='md:hidden fixed bottom-24 left-4 z-50'>
        <button
          onClick={() => setActiveModal('previousRolls')}
          className='w-16 h-16 rounded-full shadow-xl flex items-center justify-center bg-white border-4 border-red-500 hover:scale-110 transition-transform'
          style={{ backgroundColor: '#f9f9f9' }}
        >
          {/* Pokédex SVG */}
          <svg
            className='w-10 h-10'
            viewBox='0 0 64 64'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='8'
              y='6'
              width='40'
              height='52'
              rx='6'
              fill='#dc2626'
              stroke='black'
              strokeWidth='3'
            />
            <rect
              x='48'
              y='14'
              width='8'
              height='36'
              rx='3'
              fill='#991b1b'
              stroke='black'
              strokeWidth='3'
            />
            <rect
              x='14'
              y='16'
              width='28'
              height='18'
              rx='3'
              fill='#e5e7eb'
              stroke='black'
              strokeWidth='2'
            />
            <line
              x1='18'
              y1='20'
              x2='26'
              y2='20'
              stroke='white'
              strokeWidth='2'
              opacity='0.7'
            />
            <circle
              cx='20'
              cy='42'
              r='4'
              fill='#60a5fa'
              stroke='black'
              strokeWidth='2'
            />
            <circle cx='30' cy='42' r='2' fill='#facc15' />
            <circle cx='36' cy='42' r='2' fill='#22c55e' />
          </svg>
        </button>
      </div>

      {/* Mobile Modal */}
      {isOpen && (
        <div
          className='fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center mr-1 -ml-3 -mb-1'
          onClick={() => setActiveModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-11/12 max-w-md bg-red-600 border-4 border-red-700 rounded-t-3xl shadow-2xl p-4 flex flex-col items-center left-0 ml-4'
          >
            <div className='w-12 h-1.5 bg-gray-300 rounded-full mb-3' />
            <div className='flex justify-between items-center w-full mb-4 px-2'>
              <h2
                className='text-yellow-400 font-extrabold text-2xl md:text-3xl 
               tracking-wider drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)] 
               uppercase'
              >
                Pokédex
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className='text-white text-xl font-bold hover:text-gray-200 transition'
              >
                ×
              </button>
            </div>

            {/* History Grid */}
            <div className='bg-white rounded-lg border-2 border-gray-400 shadow-inner w-full p-4 grid grid-cols-2 gap-4 overflow-y-auto auto-rows-[8rem] max-h-[500px]'>
              {paddedHistory.map((p, i) =>
                p ? (
                  <div
                    key={p.number}
                    title={p.name}
                    className='flex justify-center items-center'
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className='w-24 h-24 object-contain mb-2'
                    />
                  </div>
                ) : (
                  <div
                    key={`empty-${i}`}
                    className='flex justify-center items-center'
                  />
                )
              )}
            </div>

            {/* Buttons */}
            <div className='flex gap-3 mt-4 w-full'>
              <button
                onClick={clearHistory}
                className='flex-1 bg-[#f0f0e6] border-2 border-[#7fc27f] text-gray-800 font-semibold text-sm py-2 rounded-lg shadow-md hover:bg-[#e0e0d6] transition-colors'
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Full History */}
      {showFullHistory && (
        <FullHistoryModal
          history={history}
          onClose={() => setShowFullHistory(false)}
        />
      )}
    </>
  )
}
