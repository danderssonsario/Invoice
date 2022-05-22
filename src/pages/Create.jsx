import { useState, useRef, useEffect } from 'react'

import Dates from '../components/createPage/Dates'
import Footer from '../components/createPage/Footer'
import Header from '../components/createPage/Header'
import MainDetails from '../components/createPage/MainDetails'
import Notes from '../components/createPage/Notes'
import Article from '../components/createPage/Articles.jsx'

import Sidebar from '../components/Sidebar'
/* import ReactToPrint from 'react-to-print' */
/* import { DonateButton } from '../buttons' */

function Create() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bankName, setBankName] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [website, setWebsite] = useState('')

  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  

  const componentRef = useRef()

  

  return (
    <div className='flex h-full w-screen bg-gray-800'>
      <Sidebar />

      <div className='flex mx-auto mt-10 bg-white p-5 rounded'>
        <div ref={componentRef} className='p-5'>
          <Header />

          <MainDetails name={name} address={address} />


          <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} />

          <Article />
          

          <Notes notes={notes} />

          <Footer
            name={name}
            address={address}
            website={website}
            email={email}
            phone={phone}
            bankAccount={bankAccount}
            bankName={bankName}
          />
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
