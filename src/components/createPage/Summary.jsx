function Summary({ invoiceData, setInvoiceData }) {
  const { order } = invoiceData
  const handleOrderChange = (e) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      order: { ...prevState.order, [e.target.name]: e.target.value }
    }))
  }
  return (
    <>
      <div className='flex items-end justify-end'>
        <ul>
          <li className='rounded-t-lg px-2 bg-gray-100'>
            <span className='font-bold'>Summa: {order.subTotal} kr</span>
          </li>
          <li className='px-2 bg-gray-100'>
            <span className='font-bold'>Frakt: </span>
            <input
              onChange={handleOrderChange}
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='shipping'
              id='shipping'
              autoComplete='off'
              value={order.shipping}
            />
            <span className='font-bold'> kr</span>
          </li>
          <li className='px-2 bg-gray-100 rounded-b-md'>
            <span className='font-bold'>Moms: </span>
            <input
              onChange={handleOrderChange}
              min='0'
              max='100'
              className='rounded-lg bg-gray-200 mt-2 mb-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='number'
              name='tax'
              id='tax'
              autoComplete='off'
              value={order.tax}
            />
            <span className='font-bold'> %</span>
          </li>
          <h2 className='mt-4 border-gray-900 border-t-4 text-gray-800 text-xl font-bold'>
            Att betala:{' '}
            {
              (order.total =
                parseInt(order.subTotal || 0) +
                parseInt(order.subTotal || 0) * (parseInt(order.tax || 0) / 100) +
                parseInt(order.shipping || 0))
            }
            kr
          </h2>
        </ul>
      </div>
    </>
  )
}

export default Summary
