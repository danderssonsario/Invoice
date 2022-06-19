/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from '../components/Sidebar'
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineEdit,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight
} from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInvoices, resetState } from '../redux/invoiceSlice.js'
import Spinner from '../components/Spinner'

function Invoices() {
  toast.clearWaitingQueue()
  const { user } = useSelector((state) => state.auth)
  const { total, invoices, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.invoice
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (invoices.length) setInvoiceData(invoices)
  }, [invoices])

  const [invoiceData, setInvoiceData] = useState([])
  const [page, setPage] = useState(1)
  const [pageIndex, setPageIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalInvoices, setTotalInvoices] = useState(0)

  useEffect(() => {
    setPageIndex(page-1)
  }, [page])

  useEffect(() => {
    if (!user) {
      return () => {
        navigate('/login')
        dispatch(resetState())
      }
    }
    if (isError) toast.error(message)
    if (isSuccess) toast.success(message)

    dispatch(getInvoices({page, limit}))

  }, [dispatch, isError, isSuccess, limit, message, navigate, page, user])

  const indexOfLastPage = Math.ceil(total / limit)

  const handlePageChange = (e) => {
    if(e.target.id === 'previous') setPage(page <= 1 ? 1 : (page - 1))
    if(e.target.id === 'next') setPage(page >= indexOfLastPage ? indexOfLastPage : (page + 1))
  }
  
  if (isLoading)
    return (
      <div className='flex h-screen w-screen bg-gray-800'>
        <Spinner
          className={
            'mx-auto my-auto w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
          }
        />
      </div>
    )
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
                {invoiceData?.map(({ id, customer, order }, index) => (
                  <tbody key={index}>
                    <tr>
                      <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {order.reference || '-'}
                        </p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                        <p className='text-gray-900 whitespace-no-wrap'>{customer.name || '-'}</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                        <p className='text-gray-900 whitespace-no-wrap'>{order.total || '-'}</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                        <p className='text-gray-900 whitespace-no-wrap'>{order.date || '-'}</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
                        <p className='text-gray-900 whitespace-no-wrap'>{order.dueDate || '-'}</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl'>
                        {order.status ? (
                          <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                            <span
                              aria-hidden
                              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                            ></span>
                            <span className='relative'>Betald</span>
                          </span>
                        ) : (
                          <span className='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
                            <span
                              aria-hidden
                              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                            ></span>
                            <span className='relative'>Obetald</span>
                          </span>
                        )}
                      </td>
                      <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-sm text-right'>
                        <button
                          type='button'
                          className='inline-block text-gray-500 hover:text-gray-700'
                          onClick={() => navigate(`/invoice/${id}`)}
                        >
                          <AiOutlineEdit className='w-8 h-8' />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>

              <div className='bg-gray-200 px-4 py-3 flex items-center justify-between border-t border-gray-300 sm:px-6 font-semibold'>
                <div className='my-auto hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                  <div>
                    <p className='text-lg text-gray-700'>
                      Visar <span className='font-bold'>{1 + pageIndex * 10}</span> till{' '}
                      <span className='font-bold'>
                        {total % 10 === 0 ? page * 10 : invoices.length + pageIndex * 10}
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
                      <div className='z-10 text-lg bg-indigo-50 relative inline-flex items-center px-4 py-1 border font-medium'>
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
              {/*       <input
                      type='text'
                      name='price'
                      id='price'
                      className='ml-5 w-20 px-3 text-md border-gray-300 rounded-md'
                      placeholder='Gå till'
                    />
                    <div>
                      <label htmlFor='currency' className='sr-only'>
                        Currency
                      </label>
                      <select
                        id='currency'
                        name='currency'
                        className='ml-5 focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md'
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                    </div> */}
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
