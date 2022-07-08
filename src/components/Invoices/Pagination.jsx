/**
 * Pagination for invoices list.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight
} from 'react-icons/ai'

function Pagination({ pageIndex, page, invoices, total, setPage }) {
  const limit = 10
  const indexOfLastPage = Math.ceil(total / limit)

  /**
   * Sets page based on element id.
   *
   * @param {object} e - Event object.
   */
  const handlePageChange = (e) => {
    if (e.target.id === 'previous') setPage(page <= 1 ? 1 : page - 1)
    if (e.target.id === 'next') setPage(page >= indexOfLastPage ? indexOfLastPage : page + 1)
  }

  return (
    <div className='bg-gray-200 px-4 py-3 flex items-center justify-between border-t border-gray-300 sm:px-6 font-semibold'>
      <div className='my-auto hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-lg text-gray-700'>
            Visar <span className='font-bold'>{1 + pageIndex * 10}</span> till{' '}
            <span className='font-bold'>
              {total % 10 === 0 ? page * 10 : invoices + pageIndex * 10}
            </span>{' '}
            av <span className='font-bold'>{total}</span>{' '}
          </p>
        </div>

        <div className='inline-flex'>
          <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
            <div className='w-10'>
              <AiOutlineDoubleLeft
                onClick={() => setPage(1)}
                className='border p-2 w-full h-full border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 relative inline-flex items-center rounded-l-md'
                aria-hidden='true'
              />
            </div>
            <div className='w-10'>
              <AiOutlineLeft
                id='previous'
                onClick={(e) => handlePageChange(e)}
                className='border p-2 w-full h-full border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 relative inline-flex items-center'
                aria-hidden='true'
              />
            </div>
            <div className='z-10 text-lg bg-gray-50 relative inline-flex items-center px-4 py-1 border border-gray-300 font-medium'>
              {page} / {indexOfLastPage}
            </div>
            <div className='w-10'>
              <AiOutlineRight
                id='next'
                onClick={(e) => handlePageChange(e)}
                className='border p-2 w-full h-full border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 relative inline-flex items-center'
                aria-hidden='true'
              />
            </div>
            <div className='w-10'>
              <AiOutlineDoubleRight
                onClick={() => setPage(indexOfLastPage)}
                className='border p-2 w-full h-full border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 relative inline-flex items-center rounded-r-md'
                aria-hidden='true'
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
