/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from '../components/Sidebar'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

function Invoices() {
  return (
    <div className='relative h-screen w-screen bg-gray-800 flex justify-center '>
      <Sidebar />
      <div className='max-w-7xl container mx-auto px-4 sm:px-8 bg-gray-800 rounded-xl'>
        <div className='py-8'>
          <div>
            <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>
              Fakturor
            </h2>
          </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
                      Faktura
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
                      Kund
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
                      Totalbelopp
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
                      Skapad
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
                      Förfallodatum
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>#123456789</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>John Doe</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>10000kr</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>12 Maj 2022</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>30 Juni 2022</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl'>
                      <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Betald</span>
                      </span>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-sm text-right'>
                      <button
                        type='button'
                        className='inline-block text-gray-500 hover:text-gray-700'
                      >
                        <svg className='inline-block h-6 w-6 fill-current' viewBox='0 0 24 24'>
                          <path d='M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z' />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='bg-gray-200 px-4 py-3 flex items-center justify-between border-t border-gray-300 sm:px-6 font-semibold'>
                <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                  <div>
                    <p className='text-lg text-gray-700'>
                      Visar <span className='font-bold'>1</span> till{' '}
                      <span className='font-bold'>10</span> av{' '}
                      <span className='font-bold'>97</span>{' '}
                    </p>
                  </div>
                  <div>
                    <nav
                      className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                      aria-label='Pagination'
                    >
                      <a
                        href='#'
                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                      >
                        <AiOutlineLeft className='h-5 w-5' aria-hidden='true' />
                      </a>
                      {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                      <a
                        href='#'
                        aria-current='page'
                        className='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      >
                        1
                      </a>
                      <a
                        href='#'
                        className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      >
                        2
                      </a>
                      <a
                        href='#'
                        className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium'
                      >
                        3
                      </a>
                      <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
                        ...
                      </span>
                      <a
                        href='#'
                        className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium'
                      >
                        8
                      </a>
                      <a
                        href='#'
                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                      >
                        <AiOutlineRight className='h-5 w-5' aria-hidden='true' />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoices
