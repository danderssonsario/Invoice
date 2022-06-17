import Sidebar from '../components/Sidebar'
import BarChart from '../components/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getInvoices } from '../redux/invoiceSlice.js'
import { resetState } from '../redux/authSlice'
import PieChart from '../components/PieChart'
import Spinner from '../components/Spinner'
import { MdMoneyOff, MdAttachMoney, MdOutlinePendingActions } from 'react-icons/md'
import {
  AiOutlineFileText,
  AiOutlineFileDone,
  AiOutlineFileUnknown,
  AiOutlineFileExclamation,
  AiOutlineBank,
} from 'react-icons/ai'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { total, invoices, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.invoice
  )
  const paidInvoices = invoices.filter((invoice) => invoice.order.status)
  const unpaidInvoices = invoices.filter((invoice) => !invoice.order.status)
  const overdueInvoices = invoices.filter((invoice) => invoice.order.date > invoice.order.duedate)
  const totalAmount = invoices.reduce((prev, curr) => (prev.order?.total || 0) + (curr.order?.total || 0), 0)
  const paidAmount = paidInvoices.reduce(
    (prev, curr) => (prev.order?.total || 0) + (curr.order?.total || 0),
    0
  )
  const unpaidAmount = unpaidInvoices.reduce(
    (prev, curr) => (prev.order?.total || 0) + (curr.order?.total || 0),
    0
  )
 const overdueAmount = overdueInvoices.reduce(
   (prev, curr) => (prev.order?.total || 0) + (curr.order?.total || 0),
   0
 )

  useEffect(() => {
      if (!user) {
      return () => {
        navigate('/login')
        dispatch(resetState())
      }
    }
    

    dispatch(getInvoices({}))

    return () => {
      dispatch(resetState())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

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
    <div className='flex h-screen w-screen bg-gray-800'>
      <Sidebar />
      <div className='bg-gray-800 font-sans w-full'>
        <div className='mx-auto my-8 w-full flex flex-wrap justify-center'>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Antal fakturor</p>
                <p className='text-3xl font-semibold text-gray-500'>{total}</p>
              </div>
              <div className='my-auto'>
                <AiOutlineFileText className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md '>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Antal betalda</p>
                <p className='text-3xl font-semibold text-gray-500'>{paidInvoices.length}</p>
              </div>
              <div className='my-auto'>
                <AiOutlineFileDone className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Antal obetalda</p>
                <p className='text-3xl font-semibold text-gray-500'>{unpaidInvoices.length}</p>
              </div>
              <div className='my-auto'>
                <AiOutlineFileUnknown className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Antal förfallna</p>
                <p className='text-3xl font-semibold text-gray-500'>{overdueInvoices.length}</p>
              </div>
              <div className='my-auto'>
                <AiOutlineFileExclamation className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Totalt belopp</p>
                <p className='text-3xl font-semibold text-gray-500'>{totalAmount}</p>
              </div>
              <div className='my-auto'>
                <AiOutlineBank className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Betalt belopp</p>
                <p className='text-3xl font-semibold text-gray-500'>{paidAmount}</p>
              </div>
              <div className='my-auto'>
                <MdAttachMoney className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Obetalt belopp</p>
                <p className='text-3xl font-semibold text-gray-500'>{unpaidAmount}</p>
              </div>
              <div className='my-auto'>
                <MdOutlinePendingActions className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Förfallet belopp</p>
                <p className='text-3xl font-semibold text-gray-500'>{overdueAmount}</p>
              </div>
              <div className='my-auto'>
                <MdMoneyOff className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          {/* <div className='flex'>
            <AiOutlineLeftSquare className='mx-1 w-8 h-8 text-indigo-600 hover:text-gray-900 duration-100' />
            <p className='text-gray-200 text-lg font-semibold my-auto'>2022</p>
            <AiOutlineRightSquare className='mx-1 w-8 h-8 text-indigo-600 hover:text-gray-900 duration-100' />
          </div> */}
          <div className='w-full flex flex-wrap mt-5 items-center justify-center'>
            <BarChart invoiceData={invoices} />
            <PieChart invoiceData={invoices} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
