/**
 * Handles invoice's issuer, customer and payment info in footer in editor.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

export default function Footer({ invoiceData, setInvoiceData }) {
  const { issuer, customer, payment } = invoiceData

  /**
   * Onchange handler for issuer object of invoiceData.
   *
   * @param {object} e - Event object.
   */
  const handleIssuerChange = (e) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      issuer: { ...prevState.issuer, [e.target.name]: e.target.value }
    }))
  }

  /**
   * Onchange handler for customer object of invoiceData.
   *
   * @param {object} e - Event object.
   */
  const handleCustomerChange = (e) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      customer: { ...prevState.customer, [e.target.name]: e.target.value }
    }))
  }

  /**
   * Onchange handler for payment object of invoiceData.
   *
   * @param {object} e - Event object.
   */
  const handlePaymentChange = (e) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      payment: { ...prevState.payment, [e.target.name]: e.target.value }
    }))
  }
  return (
    <>
      <footer className='flex footer border-t-2 border-gray-300 pt-5 justify-between'>
        <ul className='flex flex-col items-start'>
          <h3 className='mx-1 font-semibold font-sans text-xl underline decoration-2'>
            Kontaktinformation
          </h3>
          <li>
            <input
              placeholder='E-postadress'
              autoComplete='off'
              id='email'
              name='email'
              value={issuer.email}
              onChange={handleIssuerChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <input
              placeholder='Telefonnummer'
              autoComplete='off'
              id='phone'
              name='phone'
              value={issuer.phone}
              onChange={handleIssuerChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <input
              placeholder='Adress'
              autoComplete='off'
              id='adress'
              name='adress'
              value={issuer.adress}
              onChange={handleIssuerChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>

          <li>
            <input
              placeholder='Webbsida'
              autoComplete='off'
              id='website'
              name='website'
              value={issuer.website}
              onChange={handleIssuerChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
        </ul>
        <ul className='flex flex-col items-start'>
          <h3 className='mx-1 font-semibold font-sans text-xl underline decoration-2'>Kund</h3>
          <li>
            <input
              placeholder='Namn'
              autoComplete='off'
              id='name'
              name='name'
              value={customer.name}
              onChange={handleCustomerChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <input
              placeholder='E-postadress'
              autoComplete='off'
              id='email'
              name='email'
              value={customer.email}
              onChange={handleCustomerChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <input
              placeholder='Telefonnummer'
              autoComplete='off'
              id='phone'
              name='phone'
              value={customer.phone}
              onChange={handleCustomerChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <input
              placeholder='Adress'
              autoComplete='off'
              id='adress'
              name='adress'
              value={customer.adress}
              onChange={handleCustomerChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
        </ul>
        <ul className='flex flex-col items-start'>
          <h3 className='font-semibold font-sans text-xl underline decoration-2'>
            Betalningsinformation
          </h3>
          <li>
            <span className='font-bold'>Bankgiro:</span>{' '}
            <input
              autoComplete='off'
              id='bg'
              name='bg'
              value={payment.bg}
              onChange={handlePaymentChange}
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <span className='font-bold'>Plusgiro:</span>{' '}
            <input
              autoComplete='off'
              id='pg'
              name='pg'
              value={payment.pg}
              onChange={handlePaymentChange}
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <span className='font-bold'>IBAN:</span>{' '}
            <input
              autoComplete='off'
              id='iban'
              name='iban'
              value={payment.iban}
              onChange={handlePaymentChange}
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <span className='font-bold'>SWIFT/BIC:</span>{' '}
            <input
              autoComplete='off'
              id='bic'
              name='bic'
              value={payment.bic}
              onChange={handlePaymentChange}
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
        </ul>
      </footer>
    </>
  )
}
