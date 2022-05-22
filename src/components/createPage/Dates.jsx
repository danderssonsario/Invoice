import { useState } from "react"

function Dates() {

    const [formData, setFormData] = useState({
    orderID: '',
    date: '',
    dueDate: '',
    ocr: ''
  })

  const { orderID, date, dueDate, ocr } = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }
  
  return (
    <>
      <article className='mt-10 mb-14 flex items-end justify-start'>
        <ul>
          <li className='px-2 bg-gray-100 rounded-t-md'>
            <span className='font-bold'>Order-id:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='orderID'
              id='orderID'
              autoComplete='off'
              value={orderID}
              onChange={onChange}
            />
          </li>
          <li className='px-2 bg-gray-100'>
            <span className='font-bold'>Fakturadatum:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='date'
              name='date'
              id='date'
              autoComplete='off'
              value={date}
              onChange={onChange}
            />
          </li>
          <li className='px-2 bg-gray-100 rounded-b-md'>
            <span className='font-bold'>Förfallodatum:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='date'
              name='dueDate'
              id='dueDate'
              autoComplete='off'
              value={dueDate}
              onChange={onChange}
            />
          </li>
          <li className='px-2 bg-gray-100 rounded-b-md'>
            <span className='font-bold'>Referens/OCR:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 mb-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='ocr'
              id='ocr'
              autoComplete='off'
              value={ocr}
              onChange={onChange}
            />
          </li>
        </ul>
      </article>
    </>
  )
  }

export default Dates