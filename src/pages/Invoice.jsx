/**
 * Component for single invoice.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteInvoice, editInvoice, getInvoice, resetState } from '../redux/invoiceSlice.js'
import { AiOutlineClear } from 'react-icons/ai'
import { MdOutlineCreate } from 'react-icons/md'
import { createPdf } from '../redux/pdfSlice.js'

import SendEmailForm from '../components/SendEmailForm.jsx'
import InvoiceHeader from '../components/Invoice/InvoiceHeader'
import InvoiceOrder from '../components/Invoice/InvoiceOrder.jsx'
import InvoiceSummary from '../components/Invoice/InvoiceSummary.jsx'
import Header from '../components/InvoiceEdit/Header'
import Items from '../components/InvoiceEdit/Items.jsx'
import Summary from '../components/InvoiceEdit/Summary'
import OrderDetails from '../components/InvoiceEdit/OrderDetails'
import InvoiceItems from '../components/Invoice/InvoiceItems.jsx'
import InvoiceFooter from '../components/Invoice/InvoiceFooter.jsx'
import Footer from '../components/InvoiceEdit/Footer'
import Spinner from '../components/Spinner'
import Sidebar from '../components/Sidebar.jsx'

function Invoice() {
  toast.clearWaitingQueue()

  const { user } = useSelector((state) => state.auth)
  const { invoice, isError, isSuccess, isLoading, message } = useSelector((state) => state.invoice)

  const initState = {
    items: [{ desc: '', itemID: '', quant: '', pricePer: '', priceTotal: '' }],
    order: {
      dueDate: '',
      date: '',
      orderID: '',
      tax: 25,
      total: '',
      shipping: 0,
      subTotal: 0,
      status: false,
      reference: ''
    },
    issuer: { businessName: '', email: '', phone: '', adress: '', orgNr: '', website: '' },
    customer: { name: '', email: '', phone: '', adress: '' },
    payment: { pg: '', bg: '', iban: '', bic: '' }
  }
  const [invoiceData, setInvoiceData] = useState(initState)
  const [isEditing, setIsEditing] = useState(false)

  const { items, order, issuer, customer, payment } = invoiceData
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  /**
   * Gets invoice.
   */
  useEffect(() => {
    dispatch(getInvoice(id))
  }, [dispatch, id])

  /**
   * Sets invoice.
   */
  useEffect(() => {
    if (invoice) setInvoiceData(invoice)
  }, [invoice])

  /**
   * Delete handler.
   */
  const handleDelete = () => {
    dispatch(deleteInvoice(id))
    navigate('/invoice')
  }

  /**
   * Opens pdf in new tab.
   */
  const handleOpenPdf = () => {
    dispatch(createPdf(invoiceData))
    window.open(`http://localhost:3000/pdf/${id}`, '_blank', 'noopener,noreferrer')
  }

  /**
   * Toggles status.
   */
  const handleTogglePayStatus = () => {
    setInvoiceData((prevstate) => ({
      ...prevstate,
      order: { ...prevstate.order, status: !prevstate.order.status }
    }))
  }

  /**
   * Hook for redux state.
   */
  useEffect(() => {
    if (!user) navigate('/login')
    if (isError) toast.error(message)
    if (isSuccess) toast.success(message)

    return () => {
      dispatch(resetState())
    }
  }, [user, message, navigate, dispatch, invoice, isError, isSuccess])

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
    <>
      <div className='flex h-full w-full bg-gray-800'>
        <Sidebar />

        {!isEditing ? (
          <div className='container flex flex-col mx-auto pb-20'>
            <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>
              Faktura
            </h2>
            <>
              {/* Button Menu */}
              <div className='w-2/3 mx-auto flex flex-wrap flex-row mt-10 bg-gray-200 rounded-t py-2'>
                <button
                  onClick={handleDelete}
                  className='flex flex-row mx-auto my-auto mb-0 bg-red-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-red-800 transition-all duration-200'
                >
                  Radera
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className='flex flex-row mx-auto my-auto mb-0 bg-indigo-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-indigo-800 transition-all duration-200'
                >
                  Redigera
                </button>
                <button
                  onClick={handleOpenPdf}
                  className='flex flex-row mx-auto my-auto mb-0 bg-indigo-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-indigo-800 transition-all duration-200'
                >
                  Öppna pdf
                </button>
              </div>

              <div className='w-2/3 flex flex-col mx-auto bg-white p-5 rounded-b'>
                <div className='p-5'>
                  <InvoiceHeader issuer={issuer} />
                  <InvoiceOrder order={order} />
                  <InvoiceItems items={items} />
                  <InvoiceSummary order={order} />
                  <InvoiceFooter issuer={issuer} customer={customer} payment={payment} />
                </div>
              </div>
              <SendEmailForm invoiceData={invoiceData} />
            </>
          </div>
        ) : (
          <div className='container flex flex-col mx-auto pb-20'>
            <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>
              Redigera faktura
            </h2>

            {/* Button Menu */}
            <div className='w-2/3 mx-auto flex flex-row mt-10 bg-gray-200 rounded-t py-2'>
              <button
                onClick={() => setIsEditing(false)}
                className='flex flex-row mx-auto my-auto mb-0 bg-amber-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-amber-800 transition-all duration-200'
              >
                Tillbaka
                <AiOutlineClear className='ml-2 my-auto w-5 h-5' />
              </button>
              {order.status ? (
                <button
                  onClick={handleTogglePayStatus}
                  className='flex flex-row mx-auto my-auto mb-0 bg-green-600 text-white font-bold py-2 px-9 text-lg rounded-xl shadow border-2 hover:bg-green-800 '
                >
                  Markera som betald
                </button>
              ) : (
                <button
                  onClick={handleTogglePayStatus}
                  className='flex flex-row mx-auto my-auto mb-0 bg-red-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-red-800'
                >
                  Markera som obetald
                </button>
              )}
              <button
                onClick={() => dispatch(editInvoice({ id, invoiceData }))}
                className='flex flex-row mx-auto my-auto mb-0 bg-lime-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-lime-800 transition-all duration-200'
              >
                Spara
                <MdOutlineCreate className='ml-2 my-auto w-5 h-5' />
              </button>
            </div>

            <div className='w-2/3 p-5 flex flex-col mx-auto bg-white  rounded-b'>
              <div className='p-5'>
                <Header invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
                <OrderDetails invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
                <Items invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
                <Summary invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
                <Footer invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Invoice
