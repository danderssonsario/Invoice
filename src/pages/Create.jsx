import { useState, useEffect } from 'react'

import Footer from '../components/createPage/Footer'
import Header from '../components/createPage/Header'
import Notes from '../components/createPage/Notes'
import { VscOpenPreview } from 'react-icons/vsc'
import { AiOutlineClear } from 'react-icons/ai'
import { MdOutlineCreate } from 'react-icons/md'

import Sidebar from '../components/Sidebar.jsx'
import { toast } from 'react-toastify'
import OrderDetails from '../components/createPage/OrderDetails'
import Items from '../components/createPage/Items.jsx'
import Summary from '../components/createPage/Summary'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice } from '../redux/invoiceSlice.js'
import Spinner from '../components/Spinner'


function Create() {
  toast.clearWaitingQueue()

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

 const navigate = useNavigate()
const dispatch = useDispatch()
const { user } = useSelector((state) => state.auth)
const { draft, isSuccess, isError, isLoading, message } = useSelector((state) => state.invoice)

/* const onSubmit = (e) => {
  e.preventDefault()

  dispatch(createInvoice(invoiceData))
}   */



  const [isPreview, setIsPreview] = useState(false)
  useEffect(() => {
    console.log(draft);
    if (!user) {
      navigate('/login')
    }

    if (draft) {
      navigate(`/invoice/${draft.id}`)
    }

    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      navigate(`/invoice/${draft.id}`)
    }
  }, [user, draft, isError, isSuccess, message, navigate, dispatch])
  


  return (
    <div className='flex h-full w-full bg-gray-800'>
      <Sidebar />
      <div className='flex flex-col mx-auto pb-20'>
        <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>
          Ny faktura
        </h2>
        <div className='flex flex-row mt-10 bg-gray-200 rounded-t py-2'>
          {/* <button
            onClick={() => dispatch(saveDraft(invoiceData))}
            className='flex flex-row mx-auto my-auto mb-0 bg-lime-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-lime-800 transition-all duration-200'
          >
            Spara utkast
            <VscOpenPreview className='ml-2 my-auto w-5 h-5' />
          </button> */}
          <button
            onClick={() => setInvoiceData(initState)}
            className='flex flex-row mx-auto my-auto mb-0 bg-amber-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-amber-800 transition-all duration-200'
          >
            Rensa Fält
            <AiOutlineClear className='ml-2 my-auto w-5 h-5' />
          </button>
          <button
            onClick={() => dispatch(createInvoice(invoiceData))}
            className='flex flex-row mx-auto my-auto mb-0 bg-lime-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-lime-800 transition-all duration-200'
          >
            Skapa faktura
            <MdOutlineCreate className='ml-2 my-auto w-5 h-5' />
          </button>
        </div>

        <div className='flex flex-col mx-auto bg-white p-5 rounded-b'>
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
