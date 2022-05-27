import { useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice } from '../redux/invoiceSlice.js'
import Spinner from '../components/Spinner'
import { resetState } from '../redux/invoiceSlice'

function Invoice() {
  const { user } = useSelector((state) => state.auth)
  const { draft, isError, isSuccess, isLoading, message } = useSelector((state) => state.invoice)

  const { items, order, issuer, customer, payment } = draft
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      navigate('/dashboard')
    }

    dispatch(resetState())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <>
      <div className='flex h-full w-full bg-gray-800'>
        <Sidebar />
        <div className='flex flex-col mx-auto pb-20'>
          <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>
            Faktura
          </h2>
          <div className='flex flex-row mt-10 bg-gray-200 rounded-t py-2'></div>
          {/* button menu */}
          <div className='flex flex-col mx-auto bg-white p-5 rounded-b'>
            <div className='p-5'>
              <header className='flex flex-col items-start justify-center mb-5 xl:flex-row xl:justify-between'>
                <div>
                  <h1 className='font-bold uppercase tracking-wide text-4xl mb-3'>
                    {issuer.businessName}
                  </h1>
                  <h3>{issuer.orgNR}</h3>
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-bold text-5xl uppercase mb-1'>Faktura</h2>
                  <h3>{} fakturanummer</h3>
                </div>
              </header>

              <div className='mt-10 mb-14 flex items-end justify-start'>
                <ul>
                  <li className='px-2 bg-gray-100 rounded-t-md'>
                    <span className='font-bold'>Order-id:</span>
                    {order.orderID}
                  </li>
                  <li className='px-2 bg-gray-100'>
                    <span className='font-bold'>Fakturadatum:</span>
                    {order.date}
                  </li>
                  <li className='px-2 bg-gray-100 rounded-b-md'>
                    <span className='font-bold'>Förfallodatum:</span>
                    {order.dueDate}
                  </li>
                  <li className='px-2 bg-gray-100 rounded-b-md'>
                    <span className='font-bold'>Referens/OCR:</span>
                    {order.reference}
                  </li>
                </ul>
              </div>

              <div className='flex items-start w-full mb-0 bg-gray-100'>
                <div className='font-bold p-2 mr-48'>Beskrivning</div>
                <div className='font-bold p-2 ml-6 mr-36'>Art.nr</div>
                <div className='font-bold p-2 ml-4 mr-8'>Antal</div>
                <div className='font-bold p-2 mr-8'>á pris</div>
                <div className='font-bold p-2'>Belopp</div>
              </div>

              {items.map((item, index) => (
                <div key={index} className=''>
                  <div className='flex items-start w-full relative'>
                    <div>
                      <div className=''>{item.desc}</div>
                    </div>
                    <div>
                      <div className='flex flex-col'>{item.itemID}</div>
                    </div>
                    <div>
                      <div className='flex flex-col'>{item.quant}</div>
                    </div>
                    <div>
                      <div className='flex flex-col'>{item.pricePer}</div>
                    </div>
                    <p className='text-lg mt-2 p-1'>{item.priceTotal} kr</p>
                  </div>
                </div>
              ))}

              <footer className='flex footer border-t-2 border-gray-300 pt-5 justify-between'>
                <ul className='flex flex-col items-start'>
                  <h3 className='mx-1 font-semibold font-sans text-xl underline decoration-2'>
                    Kontaktinformation
                  </h3>
                  <li>{issuer.email}</li>
                  <li>{issuer.phone}</li>
                  <li>{issuer.adress}</li>

                  <li>{issuer.website}</li>
                </ul>
                <ul className='flex flex-col items-start'>
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
                    <span className='font-bold'>Bankgiro:</span> {payment.bg}
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
        </div>
      </div>
    </>
  )
}

export default Invoice
