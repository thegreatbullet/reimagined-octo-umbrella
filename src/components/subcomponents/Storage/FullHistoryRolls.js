import { useState } from 'react'

const FULL_MAX = 15

export default function FullHistoryModal({ history, onClose }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(history.length / FULL_MAX)

  const startIndex = (currentPage - 1) * FULL_MAX
  const displayedHistory = history.slice(startIndex, startIndex + FULL_MAX)

  return (
    <div className='fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center px-4'>
      <div
        className='relative w-full max-w-5xl h-[85vh] rounded-3xl border-4 border-red-700 bg-red-600 shadow-2xl p-5 md:p-6 flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top lights */}
        <div className='flex justify-center gap-4 mb-4'>
          <span className='w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_6px_#60a5fa]' />
          <span className='w-3 h-3 rounded-full bg-yellow-300' />
          <span className='w-3 h-3 rounded-full bg-green-300' />
        </div>

        {/* Header */}
        <div className='flex justify-between items-center mb-4 px-1'>
          <h2
            className='text-yellow-400 font-extrabold tracking-wider uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)]'
            style={{ fontSize: '2rem' }}
          >
            Full Pokédex History
          </h2>

          <button
            onClick={onClose}
            className='text-white text-2xl font-bold hover:text-gray-200 transition'
            aria-label='Close full history'
          >
            ×
          </button>
        </div>

        {/* White screen */}
        <div className='flex-1 bg-white rounded-xl border-2 border-gray-400 shadow-inner p-4 overflow-y-auto'>
          <div
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'
            style={{ minHeight: '100%' }}
          >
            {displayedHistory.map((p) => (
              <div
                key={`${p.number}-${p.name}`}
                title={p.name}
                className='flex flex-col items-center justify-center rounded-lg bg-red-700 min-h-[8.5rem] p-3'
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className='w-20 h-20 object-contain mb-2'
                />
                <span className='text-white text-sm font-bold text-center truncate w-full'>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer controls */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-4 mt-5 flex-wrap'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className='bg-[#f0f0e6] border-2 border-[#60a5fa] text-gray-800 font-semibold text-sm px-5 py-2 rounded-lg shadow-md hover:bg-[#e0e0d6] transition-colors disabled:opacity-50'
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>

            <span className='text-white text-lg font-bold min-w-[4rem] text-center'>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className='bg-[#f0f0e6] border-2 border-[#60a5fa] text-gray-800 font-semibold text-sm px-5 py-2 rounded-lg shadow-md hover:bg-[#e0e0d6] transition-colors disabled:opacity-50'
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
