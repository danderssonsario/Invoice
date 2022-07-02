import { useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import { createPdf, send } from '../redux/pdfSlice.js'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'


/**
 * Send email to clients.
 * 
 * @version 1.0.0
 * @author Daniel Andersson
 */
function SendEmailForm({ invoiceData }) {
  const dispatch = useDispatch()

  // State
  const [mailFormData, setMailFormData] = useState({
    to: '',
    from: '',
    body: ''
  })

  const { to, from, body } = mailFormData

  /**
   * Handler for mail form input.
   * 
   * @param {object} e - Event object.
   */
  const handleMailFormChange = (e) => {
    setMailFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  /**
   * Handler for sending mail.
   * 
   * @param {object} e - Event object
   */
  const handleSend = (e) => {
    e.preventDefault()
    if (!isEmail(to)) {
      toast.warning('Vänligen ange en e-postadress.')
    } else {
      dispatch(createPdf(invoiceData))
      dispatch(send(mailFormData))
    }
  }

  return (
    <form className='mt-5 w-2/3 mx-auto' onSubmit={handleSend}>
      <div className='shadow sm:rounded-md sm:overflow-hidden'>
        <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
          <h1 className='text-xl font-semibold'>Skicka fakturan till din kund!</h1>
          <div className='grid grid-cols-1 gap-6'>
            <div className='col-span-3 sm:col-span-1'>
              <label className='block text-lg font-medium text-gray-700'>Från</label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <input
                  required
                  onChange={handleMailFormChange}
                  type='text'
                  name='from'
                  id='from'
                  className='focus:ring-indigo-500 focus:border-indigo-500 p-1 flex-1 block w-full rounded-none rounded-r-md sm:text-base border-gray-300 bg-gray-100'
                  placeholder='Ex. Namn på verksamhet'
                  value={from}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-6'>
              <div className='col-span-3 sm:col-span-1'>
                <label className='block text-lg font-medium text-gray-700'>Till</label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <input
                    required
                    onChange={handleMailFormChange}
                    type='text'
                    name='to'
                    id='to'
                    className='focus:ring-indigo-500 focus:border-indigo-500 p-1 flex-1 block w-full rounded-none rounded-r-md sm:text-base border-gray-300 bg-gray-100'
                    placeholder='E-postadress'
                    value={to}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className='block text-lg font-medium text-gray-700'>
                Meddelande till kund
              </label>
              <div className='mt-1'>
                <textarea
                  onChange={handleMailFormChange}
                  id='body'
                  name='body'
                  rows={3}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-1 block w-full sm:text-base border border-gray-300 rounded-md bg-gray-100'
                  value={body}
                  placeholder='Valfritt'
                />
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='flex flex-row mx-auto my-auto mb-0 bg-indigo-600 text-white font-bold py-2 px-8 text-lg rounded-xl shadow border-2 hover:bg-indigo-800 transition-all duration-200'
          >
            Skicka
          </button>
        </div>
      </div>
    </form>
  )
}

export default SendEmailForm
