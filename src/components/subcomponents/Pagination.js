import React from 'react'

function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  const buttonClasses = 'px-4 py-2 rounded bg-blue-500 text-white'
  const disabledClasses = 'opacity-50 cursor-not-allowed'

  return (
    <div className='flex justify-center items-center mt-8 space-x-4'>
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`${buttonClasses} ${
          currentPage === 1 ? disabledClasses : 'hover:bg-blue-600'
        }`}
      >
        Previous
      </button>
      <span className='text-gray-800'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`${buttonClasses} ${
          currentPage === totalPages ? disabledClasses : 'hover:bg-blue-600'
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
