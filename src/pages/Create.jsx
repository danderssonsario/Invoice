import { useState, useEffect } from 'react'

import Dates from '../components/createPage/Dates'
import Footer from '../components/createPage/Footer'
import Header from '../components/createPage/Header'
import MainDetails from '../components/createPage/MainDetails'
import Notes from '../components/createPage/Notes'
import Article from '../components/createPage/ItemForm.jsx'
import { AiOutlineDelete } from 'react-icons/ai'

import Sidebar from '../components/Sidebar'
/* import ReactToPrint from 'react-to-print' */
/* import { DonateButton } from '../buttons' */
let itemIndex = 0
function Create() {
  const [invoiceData, setInvoiceData] = useState({
    items: [{ desc: '', itemID: '', quant: '', pricePer: '', priceTotal: '' }],
    dueDate: '',
    date: '',
    orderID: '',
    tax: '',
    total: '',
    shipping: '',
    subTotal: 0,
    status: false,
    issuer: { businessName: '', email: '', phone: '', adress: '', orgNr: '' },
    customer: { name: '', email: '', phone: '', adress: '' },
    payment: { pg: '', bg: '', iban: '', bic: '' }
  })

  const [subTotall, setSubTotall] = useState(0)
  let {
    items,
    dueDate,
    date,
    orderID,
    tax,
    total,
    shipping,
    subTotal,
    status,
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

  const [isEditing, setIsEditing] = useState(false)

  const addItemField = (e) => {
    e.preventDefault()
    setInvoiceData((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { itemName: '', unitPrice: '', quantity: '', discount: '', amount: '' }
      ]
    }))
    /*  setItems([
      ...items,
      {
        index: itemIndex,
        desc: desc,
        itemID: itemID,
        quant: quant,
        pricePer: pricePer,
        priceTotal: quant * pricePer + ' kr'
      }
    ])  */
  }
  const handleItemChange = (index, e) => {
    [...invoiceData.items][index][e.target.name] = e.target.value
    setInvoiceData({ ...invoiceData, items: [...invoiceData.items] })
    console.log(invoiceData)

    /* setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })) */
  }

  const handleIssuerChange = (e) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      issuer: { ...prevState.issuer, [e.target.name]: e.target.value }
    }))
  }

  useEffect(() => {
    let arr = document.getElementsByName('quant')
    let arr2 = document.getElementsByName('pricePer')
    let sub = 0
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value && arr[i].value) {
        sub += parseInt(arr[i].value * arr2[i].value)
      }
    }
    
    setSubTotall(sub)
  },[invoiceData])

  return (
    <div className='flex h-full w-screen bg-gray-800'>
      <Sidebar />

      <div className='flex mx-auto mt-10 bg-white p-5 rounded'>
        <div className='p-5'>
          <header className='flex flex-col items-start justify-center mb-5 xl:flex-row xl:justify-between'>
            <div>
              <h1 className='font-bold uppercase tracking-wide text-4xl mb-3'>
                <input
                  className='rounded-lg bg-gray-200 p-1 focus:bg-gray-100 focus:outline-1'
                  type='text'
                  name='businessName'
                  id='businessName'
                  placeholder='Verksamhetsnamn'
                  autoComplete='off'
                  value={issuer.businessName}
                  onChange={handleIssuerChange}
                />
              </h1>
              <h3>
                <input
                  className='rounded-lg bg-gray-200 p-1 focus:bg-gray-100 focus:outline-1'
                  type='text'
                  name='orgNr'
                  id='orgNr'
                  placeholder='Organisationsnummer'
                  autoComplete='off'
                  value={issuer.orgNr}
                  onChange={handleIssuerChange}
                />
              </h3>
            </div>
            <div className='flex flex-col'>
              <h2 className='font-bold text-5xl uppercase mb-1'>Faktura</h2>
              <h3>{} fakturanummer</h3>
            </div>
          </header>

          <MainDetails />

          <Dates />

          <div className='flex items-start w-full mb-0 bg-gray-100'>
            <div className='font-bold p-2 mr-48'>Beskrivning</div>
            <div className='font-bold p-2 ml-6 mr-36'>Art.nr</div>
            <div className='font-bold p-2 ml-4 mr-8'>Antal</div>
            <div className='font-bold p-2 mr-8'>á pris</div>
            <div className='font-bold p-2'>Belopp</div>
          </div>
          {/* {items.map((item, index) =>
            item.index > 0 ? (
              <div key={index}>
                <div className='flex items-start w-full'>
                  <div>
                    <div className='mr-2 w-80 p-1'>
                      <div className='min-w-full'>{item.desc}</div>
                    </div>
                  </div>
                  <div>
                    <div className='mr-2 w-52 p-1'>
                      <div className='min-w-full'>{item.itemID}</div>
                    </div>
                  </div>
                  <div>
                    <div className='mr-2 w-20 p-1'>
                      <div>{item.quant}</div>
                    </div>
                  </div>
                  <div>
                    <div className='mr-2 w-20 p-1'>
                      <div className=''>{item.pricePer}</div>
                    </div>
                  </div>

                  <p className='p-1'>{item.priceTotal}</p>
                  <button onClick={() => deleteRow(item.index)}>
                    <AiOutlineDelete className='text-red-500 font-bold text-xl mt-1.5' />
                  </button>
                </div>
              </div>
            ) : (
              ''
            )
          )} */}
          {invoiceData.items.map((item, index) => (
            <div key={index} className=''>
              <div className='flex items-start w-full'>
                <div>
                  <div className=''>
                    <input
                      className='mr-2 w-80 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                      type='text'
                      name='desc'
                      id='desc'
                      value={item.desc}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                </div>
                <div>
                  <div className='flex flex-col'>
                    <input
                      className='mr-2 w-52 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                      type='text'
                      name='itemID'
                      id='itemID'
                      placeholder=''
                      value={item.itemID}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                </div>
                <div>
                  <div className='flex flex-col'>
                    <input
                      className='mr-2 w-20 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                      min='0'
                      type='number'
                      name='quant'
                      id='quant'
                      value={item.quant}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                </div>
                <div>
                  <div className='flex flex-col'>
                    <input
                      className='mr-2 w-20 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                      type='text'
                      name='pricePer'
                      id='pricePer'
                      value={item.pricePer}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                </div>

                <p className='text-lg mt-2 p-1'>
                  {(item.priceTotal = (item.quant ?? 0) * (item.pricePer ?? 0))} kr
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={addItemField}
            className='mb-5 bg-indigo-500 text-white font-bold py-1 px-2 rounded shadow border-2 border-indigo-500 hover:bg-transparent hover:text-indigo-500 transition-all duration-300'
          >
            Lägg till
          </button>

          <div className='flex items-end justify-end'>
            <ul>
              <li className='rounded-t-lg px-2 bg-gray-100'>
                <span className='font-bold'>
                  Summa: {subTotall} kr
                </span>
              </li>
              <li className='px-2 bg-gray-100'>
                <span className='font-bold'>Frakt: {shipping}</span>
                <input
                  className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                  type='text'
                  name='shipping'
                  id='shipping'
                  autoComplete='off'
                />
              </li>
              <li className='px-2 bg-gray-100 rounded-b-md'>
                <span className='font-bold'>Moms: {tax}</span>
                <input
                  min='0'
                  max='100'
                  className='rounded-lg bg-gray-200 mt-2 mb-2 p-1 focus:bg-gray-100 focus:outline-1'
                  type='number'
                  name='ocr'
                  id='ocr'
                  autoComplete='off'
                />
              </li>
              <h2 className='mt-4 border-gray-900 border-t-4 text-gray-800 text-xl font-bold'>
                Att betala: kr
              </h2>
            </ul>
          </div>
          <Notes />

          <Footer />
        </div>
        {/* <button
            onClick={() => setShowInvoice(false)}
            className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
          >
            Edit Information
          </button> */}
      </div>
    </div>
  )
}

export default Create
