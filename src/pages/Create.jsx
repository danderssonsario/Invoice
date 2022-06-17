import { useState, useEffect } from 'react'

import Footer from '../components/createPage/Footer'
import Header from '../components/createPage/Header'
import Notes from '../components/createPage/Notes'
import { VscOpenPreview } from 'react-icons/vsc'
import { AiOutlineClear } from 'react-icons/ai'
import { MdOutlineCreate, MdOutlineCreateNewFolder } from 'react-icons/md'

import Sidebar from '../components/Sidebar.jsx'
import { toast } from 'react-toastify'
import OrderDetails from '../components/createPage/OrderDetails'
import Items from '../components/createPage/Items.jsx'
import Summary from '../components/createPage/Summary'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice, resetState, saveDraft } from '../redux/invoiceSlice.js'
import Spinner from '../components/Spinner'
import { reset } from '../redux/authSlice'

function Create() {
  toast.clearWaitingQueue()
  const { user } = useSelector((state) => state.auth)
  const initState = {
    creator: user?.email,
    items: [{ desc: '', itemID: '', quant: '', pricePer: '', priceTotal: '' }],
    order: {
      duedate: '',
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

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { draft, invoices, isSuccess, isError, isLoading, message } = useSelector((state) => state.invoice)
  
  const setDraft = () => {
    toast.success('Utkast sparat.')
    dispatch(saveDraft(invoiceData))
  } 

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      navigate(`/invoice/${invoices[invoices.length - 1].id}`)
    }

    if (draft) setInvoiceData(draft)

    dispatch(resetState)
    
  }, [user, isError, isSuccess, message, navigate, dispatch, invoices, draft])

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
    <div className='flex h-auto w-screen bg-gray-800'>
      <Sidebar />
      <div className='container flex flex-col mx-auto pb-20'>
        <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>
          Ny faktura
        </h2>
        <div className='w-2/3 mx-auto flex flex-row mt-10 bg-gray-200 rounded-t py-2'>
          <button
            onClick={() => setInvoiceData(initState)}
            className='flex flex-row mx-auto my-auto mb-0 bg-amber-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-amber-800 transition-all duration-200'
          >
            Rensa Fält
            <AiOutlineClear className='ml-2 my-auto w-5 h-5' />
          </button>
          <button
            onClick={() => setDraft()}
            className='flex flex-row mx-auto my-auto mb-0 bg-lime-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-lime-800 transition-all duration-200'
          >
            Spara utkast
            <MdOutlineCreateNewFolder className='ml-2 my-auto w-5 h-5' />
          </button>
          <button
            onClick={() => dispatch(createInvoice(invoiceData))}
            className='flex flex-row mx-auto my-auto mb-0 bg-lime-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-lime-800 transition-all duration-200'
          >
            Skapa &amp; fortsätt
            <MdOutlineCreate className='ml-2 my-auto w-5 h-5' />
          </button>
        </div>

        <div className='w-2/3 flex flex-col mx-auto bg-white p-5 rounded-b'>
          <div className='p-5'>
            <Header invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <OrderDetails invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <Items invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <Summary invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <Notes />
            <Footer invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
