/**
 * Component for listing invoices.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInvoices, resetState } from '../redux/invoiceSlice.js'

import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import Pagination from '../components/Invoices/Pagination.jsx'
import TableItem from '../components/Invoices/TableItem.jsx'
import TableHeader from '../components/Invoices/TableHeader.jsx'

function Invoices() {
  toast.clearWaitingQueue()

  const { user } = useSelector((state) => state.auth)
  const { total, invoices, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.invoice
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [pageIndex, setPageIndex] = useState(0)
  const limit = 10

  /**
   * Page index used for calculating amount of invoices displayed.
   */
  useEffect(() => {
    setPageIndex(page - 1)
  }, [page])

  /**
   * Hook for redux state.
   */
  useEffect(() => {
    if (!user) navigate('/login')
    if (isError) toast.error(message)
    if (isSuccess) toast.success(message)

    dispatch(getInvoices({ page, limit }))

    return () => {
      dispatch(resetState())
    }
  }, [dispatch, isError, isSuccess, limit, message, navigate, page, user])

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
                <TableHeader />
                {invoices?.map(({ id, customer, order }, index) => (
                  <TableItem key={index} order={order} customer={customer} id={id} />
                ))}
              </table>
              <Pagination
                pageIndex={pageIndex}
                page={page}
                invoices={invoices.length}
                total={total}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoices
