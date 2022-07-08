/**
 * Handles invoice's header in editor.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

function Header({ invoiceData, setInvoiceData }) {
  const { businessName, orgNr } = invoiceData.issuer

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

  return (
    <>
      <header className='flex flex-col items-start justify-center mb-5 xl:flex-row xl:justify-between'>
        <div>
          <h1 className='font-bold uppercase tracking-wide text-4xl mb-3'>
            <input
              className='rounded-lg bg-gray-200 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='businessName'
              id='businessName'
              placeholder='Verksamhetsnamn'
              autoComplete='off'
              value={businessName}
              onChange={handleIssuerChange}
            />
          </h1>
          <h3>
            <input
              className='rounded-lg bg-gray-200 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='orgNr'
              id='orgNr'
              placeholder='Organisationsnummer'
              autoComplete='off'
              value={orgNr}
              onChange={handleIssuerChange}
            />
          </h3>
        </div>
        <div className='flex flex-col'>
          <h2 className='font-bold text-5xl uppercase mb-1'>Faktura</h2>
        </div>
      </header>
    </>
  )
}

export default Header
