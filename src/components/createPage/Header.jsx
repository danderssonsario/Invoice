import { useState } from 'react'

function Header() {
  const [formData, setFormData] = useState({
    header: '',
    orgNr: ''
  })

  const { header, orgNr } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
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
              name='header'
              id='header'
              placeholder='Verksamhetsnamn'
              autoComplete='off'
              value={header}
              onChange={onChange}
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
              onChange={onChange}
            />
          </h3>
        </div>
        <div className='flex flex-col'>
          <h2 className='font-bold text-5xl uppercase mb-1'>Faktura</h2>
          <h3>{} fakturanummer</h3>
        </div>
      </header>
    </>
  )
}

export default Header