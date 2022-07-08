/**
 * Displays invoice's orderID, date, duedate and payment reference.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

function InvoiceOrder({ order }) {
  return (
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
  )
}

export default InvoiceOrder
