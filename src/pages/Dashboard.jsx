import Sidebar from '../components/Sidebar'
import BarChart from '../components/DashBoard/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getInvoices, resetState } from '../redux/invoiceSlice.js'
import PieChart from '../components/DashBoard/PieChart'
import Spinner from '../components/Spinner'
import { MdMoneyOff, MdAttachMoney, MdOutlinePendingActions } from 'react-icons/md'
import {
  AiOutlineFileText,
  AiOutlineFileDone,
  AiOutlineFileUnknown,
  AiOutlineFileExclamation,
  AiOutlineBank,
} from 'react-icons/ai'
import DashboardCard from '../components/DashBoard/DashboardCard'


/**
 * Dashboard component.
 * 
 * @version 1.0.0
 * @author Daniel Andersson
 */
function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { total, invoices, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.invoice
  )

  // Sort invoices.
  const paidInvoices = invoices.filter((invoice) => invoice.order.status)
  const unpaidInvoices = invoices.filter((invoice) => !invoice.order.status)
  const overdueInvoices = invoices.filter((invoice) => invoice.order.date > invoice.order.duedate)

  // Get amount of sorted invoices.
  let totalAmount = 0
  invoices.forEach((invoice) => {
    totalAmount += parseInt(invoice.order?.total)
  })
  let paidAmount = 0
  paidInvoices.forEach((invoice) => {
    paidAmount += parseInt(invoice.order?.total)
  })
  let unpaidAmount = 0
  unpaidInvoices.forEach((invoice) => {
    unpaidAmount += parseInt(invoice.order?.total)
  })

  let overdueAmount = 0
  overdueInvoices.forEach((invoice) => {
    overdueAmount += parseInt(invoice.order?.total)
  })


 /**
  * Hook for redux state.
  */
  useEffect(() => {
    if (!user) navigate('/login')
    
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
          <DashboardCard label='Antal fakturor' value={total} Icon={AiOutlineFileText} />
          <DashboardCard
            label='Antal betalda'
            value={paidInvoices.length}
            Icon={AiOutlineFileDone}
          />
          <DashboardCard
            label='Antal obetalda'
            value={unpaidInvoices.length}
            Icon={AiOutlineFileUnknown}
          />
          <DashboardCard
            label='Antal förfallna'
            value={overdueInvoices.length}
            Icon={AiOutlineFileExclamation}
          />

          <DashboardCard label='Totalt belopp' value={totalAmount} Icon={AiOutlineBank} />

          <DashboardCard label='Betalt belopp' value={paidAmount} Icon={MdAttachMoney} />
          <DashboardCard label='Obetalt belopp' value={unpaidAmount} Icon={MdMoneyOff} />
          <DashboardCard
            label='Förfallet belopp'
            value={overdueAmount}
            Icon={MdOutlinePendingActions}
          />

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
