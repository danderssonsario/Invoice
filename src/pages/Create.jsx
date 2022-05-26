import { useState, useEffect, useCallback } from 'react'

import Footer from '../components/createPage/Footer'
import Header from '../components/createPage/Header'
import Notes from '../components/createPage/Notes'
import { VscOpenPreview } from 'react-icons/vsc'

import Sidebar from '../components/Sidebar'
import { toast } from 'react-toastify'
import OrderDetails from '../components/createPage/OrderDetails'
import Items from '../components/createPage/Items.jsx'
import Summary from '../components/createPage/Summary'

let itemIndex = 0
function Create() {
  const [invoiceData, setInvoiceData] = useState({
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
    issuer: { businessName: '', email: '', phone: '', adress: '', orgNr: '' },
    customer: { customerName: '', customerEmail: '', customerPhone: '', customerAdress: '' },
    payment: { pg: '', bg: '', iban: '', bic: '' }
  })

  let {
    items,
    order,
    issuer,
    customer,
    payment
  } = invoiceData

  /*   const [items, setItems] = useState(
    [{index:'', desc: '', itemID: '', quant: '', pricePer: '', priceTotal: '' }]
  )

  const [item, setItem] = useState(
    { index: '', desc: '', itemID: '', quant: '', pricePer: '', priceTotal: '' }
  )
 */

  //const { index, desc, itemID, quant, pricePer, priceTotal} = item

  //const deleteRow = (index) => setItems(items.filter((row) => row.index !== index))

  const [isPreview, setIsPreview] = useState(false)
/*   useEffect(() => {
    console.log(invoiceData)
  }, [invoiceData]) */



  return (
    <div className='flex h-full w-screen bg-gray-800'>
      <Sidebar />
      <div className='flex flex-col mx-auto'>
        <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>
          Ny faktura
        </h2>
        <div className='flex mx-auto mt-10 bg-white p-5 rounded'>
          <div className='p-5'>
            <Header invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <OrderDetails invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <Items invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <Summary invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <Notes />
            <Footer invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <button
              onClick={() => setIsPreview(true)}
              className='flex flex-row mx-auto mt-5 bg-lime-600 text-white font-bold py-2 px-8 rounded shadow border-2 hover:bg-lime-800 transition-all duration-200'
            >
              Fortsätt
              <VscOpenPreview className='my-auto w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
