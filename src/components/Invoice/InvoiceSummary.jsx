/**
 * Displays invoice's subtotal, tax, shipping and total.
 *
 * @version 1.0.0
 * @author Daniel Andersson
 */
function InvoiceSummary({ order }) {
  return (
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
  )
}

export default InvoiceSummary
