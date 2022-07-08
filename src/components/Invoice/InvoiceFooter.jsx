/**
 * Displays invoice's issuer, customer and payment data in footer.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

function InvoiceFooter({ issuer, customer, payment }) {
  return (
    <footer className='flex footer border-t-2 border-gray-300 pt-5 justify-between'>
      <ul className='flex flex-col items-start'>
        <h3 className='mx-1 font-semibold font-sans text-xl underline decoration-2'>
          Kontaktinformation
        </h3>
        <li className='text-base'>{issuer.email}</li>
        <li>{issuer.phone}</li>
        <li>{issuer.adress}</li>

        <li>{issuer.website}</li>
      </ul>
      <ul className='flex flex-col items-start mx-2'>
        <h3 className='mx-1 font-semibold font-sans text-xl underline decoration-2'>Kund</h3>
        <li>{customer.name}</li>
        <li>{customer.email}</li>
        <li>{customer.phone}</li>
        <li>{customer.adress}</li>
      </ul>
      <ul className='flex flex-col items-start'>
        <h3 className='font-semibold font-sans text-xl underline decoration-2'>
          Betalningsinformation
        </h3>
        <li>
          <span className='font-bold'></span> {payment.bg}
        </li>
        <li>
          <span className='font-bold'>Plusgiro:</span> {payment.pg}
        </li>
        <li>
          <span className='font-bold'>IBAN:</span> {payment.iban}
        </li>
        <li>
          <span className='font-bold'>SWIFT/BIC:</span> {payment.bic}
        </li>
      </ul>
    </footer>
  )
}

export default InvoiceFooter
