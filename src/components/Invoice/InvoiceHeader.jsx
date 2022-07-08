/**
 * Displays invoice's businessname and organisation number in header.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

function InvoiceHeader({ issuer }) {
  return (
    <header className='flex flex-col items-start justify-center mb-5 xl:flex-row xl:justify-between'>
      <div>
        <h1 className='font-bold uppercase tracking-wide text-4xl mb-3'>{issuer.businessName}</h1>
        <h3 className='text-lg'>{issuer.orgNr}</h3>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-bold text-5xl uppercase mb-1'>Faktura</h2>
      </div>
    </header>
  )
}

export default InvoiceHeader
