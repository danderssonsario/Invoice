import { useEffect } from 'react'

function OrderDetails({ invoiceData, setInvoiceData }) {

  const { orderID, date, duedate, reference } = invoiceData.order
  const { items } = invoiceData

  const handleOrderChange = (e) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      order: { ...prevState.order, [e.target.name]: e.target.value }
    }))
  }
  
  return (
    <>
      <div className='mt-10 mb-14 flex items-end justify-start'>
        <ul>
          <li className='px-2 bg-gray-100 rounded-t-md'>
            <span className='font-bold'>Order-id:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='orderID'
              id='orderID'
              value={orderID}
              onChange={handleOrderChange}
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
              onChange={handleOrderChange}
            />
          </li>
          <li className='px-2 bg-gray-100 rounded-b-md'>
            <span className='font-bold'>Förfallodatum:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='date'
              name='duedate'
              id='duedate'
              autoComplete='off'
              value={duedate}
              onChange={handleOrderChange}
            />
          </li>
          <li className='px-2 bg-gray-100 rounded-b-md'>
            <span className='font-bold'>Referens/OCR:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 mb-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='reference'
              id='reference'
              value={reference}
              onChange={handleOrderChange}
            />
          </li>
        </ul>
      </div>
    </>
  )
}

export default OrderDetails
