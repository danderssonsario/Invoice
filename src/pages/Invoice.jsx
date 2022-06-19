import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteInvoice, editInvoice, getInvoice } from '../redux/invoiceSlice.js'
import Spinner from '../components/Spinner'
import { resetState } from '../redux/invoiceSlice'

import Footer from '../components/createPage/Footer'
import Header from '../components/createPage/Header'
import Notes from '../components/createPage/Notes'
import { AiOutlineClear } from 'react-icons/ai'
import { MdOutlineCreate } from 'react-icons/md'
import OrderDetails from '../components/createPage/OrderDetails'
import Items from '../components/createPage/Items.jsx'
import Summary from '../components/createPage/Summary'
import { createPdf, getPdf, send } from '../redux/pdfSlice.js'

function Invoice() {
  toast.clearWaitingQueue()
  const { user } = useSelector((state) => state.auth)
  const { invoice, isError, isSuccess, isLoading, message } = useSelector((state) => state.invoice)


  const [isEditing, setIsEditing] = useState(false)

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
  const { items, order, issuer, customer, payment } = invoiceData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getInvoice(id))
  },[dispatch, id])

  useEffect(() => {
    if(invoice) setInvoiceData(invoice)
  }, [invoice])

  const handleSend = () => {
    dispatch(createPdf(invoiceData))
    dispatch(send())
  }

  const handleDelete = () => {
  dispatch(deleteInvoice(id))
  navigate('/invoice') 
  }

  const handleOpenPdf = () => {
    dispatch(createPdf(invoiceData))
    window.open(
      `http://localhost:3000/pdf/${id}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const togglePayStatus = () => {
    setInvoiceData((prevstate) => ({
      ...prevstate,
      order: {...prevstate.order, status: !prevstate.order.status} 
    }))
  }

  useEffect(() => {
    if (!user) {
      return () => {
        navigate('/login')
        dispatch(resetState())
      }
    }
    
    if (isError) toast.error(message)
    if (isSuccess) toast.success(message)
    
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
              <div className='w-2/3 mx-auto flex flex-row mt-10 bg-gray-200 rounded-t py-2'>
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
                <button
                  onClick={handleSend}
                  className='flex flex-row mx-auto my-auto mb-0 bg-indigo-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-indigo-800 transition-all duration-200'
                >
                  Maila till kund
                </button>
              </div>
              <div className='w-2/3 flex flex-col mx-auto bg-white p-5 rounded-b'>
                <div className='p-5'>
                  <header className='flex flex-col items-start justify-center mb-5 xl:flex-row xl:justify-between'>
                    <div>
                      <h1 className='font-bold uppercase tracking-wide text-4xl mb-3'>
                        {issuer.businessName}
                      </h1>
                      <h3 className='text-lg'>{issuer.orgNr}</h3>
                    </div>
                    <div className='flex flex-col'>
                      <h2 className='font-bold text-5xl uppercase mb-1'>Faktura</h2>
                      <h2 className='text-lg'>{} fakturanummer</h2>
                    </div>
                  </header>

                  <div className='text-lg mt-10 mb-14 flex items-end justify-start'>
                    <ul>
                      <li className='px-2 py-1 bg-gray-100 rounded-t-md'>
                        <span className='font-bold'>Order-id:</span>
                        {order.orderID}
                      </li>
                      <li className='px-2 py-1 bg-gray-100'>
                        <span className='font-bold'>Fakturadatum:</span>
                        {order.date}
                      </li>
                      <li className='px-2 py-1 bg-gray-100 rounded-b-md'>
                        <span className='font-bold'>Förfallodatum:</span>
                        {order.dueDate}
                      </li>
                      <li className='px-2 py-1 bg-gray-100 rounded-b-md'>
                        <span className='font-bold'>Referens/OCR:</span>
                        {order.reference}
                      </li>
                    </ul>
                  </div>

                  <div className='flex justify-between text-lg items-start w-full mb-0 bg-gray-100'>
                    <div className='font-bold p-2 mr-48'>Beskrivning</div>
                    <div className='font-bold p-2 ml-6 mr-36'>Art.nr</div>
                    <div className='font-bold p-2 ml-4 mr-8'>Antal</div>
                    <div className='font-bold p-2 mr-8'>á pris</div>
                    <div className='font-bold p-2'>Belopp</div>
                  </div>

                  {items.map((item, index) => (
                    <div key={index} className='min-w-full'>
                      <div className='text-lg flex items-start justify-between min-w-full relative'>
                        <div>
                          <div className='flex flex-col mr-3 w-80 mt-2 p-1'>{item.desc}</div>
                        </div>
                        <div>
                          <div className='flex flex-col mr-5 w-52 mt-2 p-1'>{item.itemID}</div>
                        </div>
                        <div>
                          <div className='flex flex-col mr-3 w-20 mt-2 p-1'>{item.quant}</div>
                        </div>
                        <div>
                          <div className='flex flex-col mr-3 w-20 mt-2 p-1'>{item.pricePer}</div>
                        </div>
                        <p className='mt-2 p-1'>{item.priceTotal} kr</p>
                      </div>
                    </div>
                  ))}

                  <div className='my-5 flex items-end justify-end'>
                    <ul>
                      <li className='rounded-t-lg px-2 bg-gray-100'>
                        <span className='font-bold text-md'>Summa: {order.subTotal} kr</span>
                      </li>
                      <li className='px-2 bg-gray-100'>
                        <span className='font-bold text-md'>Frakt: {order.shipping}</span>
                        <span className='font-bold'> kr</span>
                      </li>
                      <li className='px-2 bg-gray-100 rounded-b-md'>
                        <span className='font-bold text-md'>Moms: {order.tax}</span>
                        <span className='font-bold text-md'> %</span>
                      </li>
                      <h2 className='mt-4 border-gray-900 border-t-4 text-gray-800 text-2xl font-bold'>
                        Att betala:
                        {order.total}
                        kr
                      </h2>
                    </ul>
                  </div>

                  <footer className='flex footer border-t-2 border-gray-300 pt-5 justify-between'>
                    <ul className='flex flex-col items-start'>
                      <h3 className='mx-1 font-semibold font-sans text-xl underline decoration-2'>
                        Kontaktinformation
                      </h3>
                      <li className='text-base'>{issuer.email}</li>
                      <li>{issuer.phone}</li>
                      <li>{issuer.adress}</li>

                      <li>{issuer.website}</li>
                    </ul>
                    <ul className='flex flex-col items-start mx-2'>
                      <h3 className='mx-1 font-semibold font-sans text-xl underline decoration-2'>
                        Kund
                      </h3>
                      <li>{customer.name}</li>
                      <li>{customer.email}</li>
                      <li>{customer.phone}</li>
                      <li>{customer.adress}</li>
                    </ul>
                    <ul className='flex flex-col items-start'>
                      <h3 className='font-semibold font-sans text-xl underline decoration-2'>
                        Betalningsinformation
                      </h3>
                      <li>
                        <span className='font-bold'></span> {payment.bg}
                      </li>
                      <li>
                        <span className='font-bold'>Plusgiro:</span> {payment.pg}
                      </li>
                      <li>
                        <span className='font-bold'>IBAN:</span> {payment.iban}
                      </li>
                      <li>
                        <span className='font-bold'>SWIFT/BIC:</span> {payment.bic}
                      </li>
                    </ul>
                  </footer>
                </div>
              </div>
            </>
          </div>
        ) : (
          <div className='container flex flex-col mx-auto pb-20'>
            <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>
              Redigera faktura
            </h2>
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
                  onClick={togglePayStatus}
                  className='flex flex-row mx-auto my-auto mb-0 bg-green-600 text-white font-bold py-2 px-9 text-lg rounded-xl shadow border-2 hover:bg-green-800 '
                >
                  Markera som betald
                </button>
              ) : (
                <button
                  onClick={togglePayStatus}
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
                <Notes />
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
