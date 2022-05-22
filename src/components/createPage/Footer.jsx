import { useState } from 'react'

export default function Footer() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    adress: '',
    website: '',
    clientName: '',
    clientEmail: '',
    clientAdress: '',
    clientPhone: '',
    bg: '',
    pg: '',
    iban: '',
    bic: ''
  })

  const {
    email,
    phone,
    adress,
    website,
    clientName,
    clientEmail,
    clientAdress,
    clientPhone,
    bg,
    pg,
    iban,
    bic
  } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
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
              value={email}
              onChange={onChange}
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
              value={phone}
              onChange={onChange}
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
              value={adress}
              onChange={onChange}
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
              value={website}
              onChange={onChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
        </ul>
        <ul className='flex flex-col items-start'>
          <h3 className='mx-1 font-semibold font-sans text-xl underline decoration-2'>Mottagare</h3>
          <li>
            <input
              placeholder='Namn'
              autoComplete='off'
              id='clientName'
              name='clientName'
              value={clientName}
              onChange={onChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <input
              placeholder='E-postadress'
              autoComplete='off'
              id='clientEmail'
              name='clientEmail'
              value={clientEmail}
              onChange={onChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <input
              placeholder='Telefonnummer'
              autoComplete='off'
              id='clientPhone'
              name='clientPhone'
              value={clientPhone}
              onChange={onChange}
              className='w-72 mx-1 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <input
              placeholder='Adress'
              autoComplete='off'
              id='clientAdress'
              name='clientAdress'
              value={clientAdress}
              onChange={onChange}
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
              value={bg}
              onChange={onChange}
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
              value={pg}
              onChange={onChange}
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <span className='font-bold'>IBAN:</span>{' '}
            <input
              placeholder='Valfritt'
              autoComplete='off'
              id='iban'
              name='iban'
              value={iban}
              onChange={onChange}
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
            />
          </li>
          <li>
            <span className='font-bold'>SWIFT/BIC:</span>{' '}
            
              <input
                placeholder='Valfritt'
                autoComplete='off'
                id='bic'
                name='bic'
                value={bic}
                onChange={onChange}
                className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                type='text'
              />
          
          </li>
        </ul>
      </footer>
    </>
  )
}
