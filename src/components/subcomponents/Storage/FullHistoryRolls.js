import { useState } from 'react'

const FULL_MAX = 15

export default function FullHistoryModal({ history, onClose }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(history.length / FULL_MAX)

  const startIndex = (currentPage - 1) * FULL_MAX
  const displayedHistory = history.slice(startIndex, startIndex + FULL_MAX)

  return (
    <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]'>
      <div
        className='
          relative
          w-4/5 max-w-5xl h-4/5 flex flex-col
          rounded-xl p-6 shadow-2xl
        '
        style={{
          backgroundColor: '#B91C1C',
          border: '1px solid black',
        }}
      >
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h2
            style={{
              color: '#FFFFFF', // bright white
              fontSize: '2rem', // makes it bigger
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // optional glow
            }}
            className='font-bold tracking-wide'
          >
            Full Pokédex History
          </h2>
          <button
            onClick={onClose}
            className='text-gray-700 font-bold px-3 py-1 hover:text-gray-900 text-lg'
          >
            ✕
          </button>
        </div>

        {/* Pokémon grid */}
        <div
          className='flex-1 grid grid-cols-5 gap-4 p-4 rounded-lg shadow-inner overflow-y-auto'
          style={{
            gridTemplateRows: 'repeat(3, 1fr)', // 3 rows
          }}
        >
          {displayedHistory.map((p) => (
            <div
              key={p.number}
              title={p.name}
              className='flex flex-col items-center justify-center rounded-md bg-red-700'
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className='w-16 h-16 object-contain mb-1'
              />
              <span
                style={{ color: '#FFFFFF' }}
                className='text-s font-bold text-center truncate'
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>

        {/* Pagination for Full Pokedex */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-6 mt-4'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#B91C1C',
                padding: '0.5rem 1.25rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '0.375rem',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#f5f5f5')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#FFFFFF')
              }
              className='bg-white text-white px-5 py-2 rounded hover:bg-gray-200 text-base font-bold'
            >
              ◀
            </button>
            <span
              style={{
                color: '#FFFFFF',
              }}
              className='text-white text-lg font-bold'
            >
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#B91C1C',
                padding: '0.5rem 1.25rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '0.375rem',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#f5f5f5')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#FFFFFF')
              }
              className='bg-white text-red-700 px-5 py-2 rounded hover:bg-gray-200 text-base font-bold'
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
