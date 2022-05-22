import { useState } from 'react'
import { toast } from 'react-toastify'

function ItemForm() {

  const [isEditing, setIsEditing] = useState(false)

  const [itemData, setItemData] = useState({
    desc:'',
    itemID: '',
    quant: '',
    pricePer: ''
  })

  const { desc, itemID, quant, pricePer } = itemData

  const onSubmit = (e) => {
    e.preventDefault()

    setItemData(() => (
      setItemData([...itemData, {desc:desc, itemID:itemID, quant:quant, pricePer:pricePer}])
    ))
  }

  const onChange = (e) => {
     setItemData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })) 
  }

  return (
    <>
      <form className='' onSubmit={onSubmit}>
        <div className='flex items-start w-full'>
          <div>
            <div className=''>
              <input
                className='mr-2 w-80 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                type='text'
                name='desc'
                id='desc'
                value={desc}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <div className='flex flex-col'>
              <input
                className='mr-2 w-52 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                type='text'
                name='itemID'
                id='itemID'
                placeholder=''
                value={itemID}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <div className='flex flex-col'>
              <input
                className='mr-2 w-20 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                min='0'
                type='number'
                name='quant'
                id='quant'
                placeholder='1'
                value={quant}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <div className='flex flex-col'>
              <input
                className='mr-2 w-20 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                type='text'
                name='pricePer'
                id='pricePer'
                placeholder='Pris'
                value={pricePer}
                onChange={onChange}
              />
            </div>
          </div>

          <p className='text-lg mt-2 p-1'>{(quant ?? 0) * (pricePer ?? 0)} kr</p>
        </div>
        <button
          type='submit'
          className='mb-5 bg-indigo-500 text-white font-bold py-2 px-5 rounded shadow border-2 border-indigo-500 hover:bg-transparent hover:text-indigo-500 transition-all duration-300'
        >
          {isEditing ? 'Ändra' : 'Lägg till'}
        </button>
      </form>

      <div className='flex items-end justify-end'>
        <ul className=''>
          <li className='px-2 bg-gray-100 rounded-t-md'>
            <span className='font-bold'>Summa:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='sum'
              id='sum'
              autoComplete='off'
            />
          </li>
          <li className='px-2 bg-gray-100'>
            <span className='font-bold'>Frakt:</span>{' '}
            <input
              className='rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='text'
              name='shipping'
              id='shipping'
              autoComplete='off'
            />
          </li>
          <li className='px-2 bg-gray-100 rounded-b-md'>
            <span className='font-bold'>Moms:</span>{' '}
            <input
              min='0'
              max='100'
              className='rounded-lg bg-gray-200 mt-2 mb-2 p-1 focus:bg-gray-100 focus:outline-1'
              type='number'
              name='ocr'
              id='ocr'
              autoComplete='off'
            />
          </li>
          <h2 className='mt-4 border-gray-900 border-t-4 text-gray-800 text-xl font-bold'>
            Totalpris: kr
          </h2>
        </ul>
      </div>
    </>
  )
}

export default ItemForm
