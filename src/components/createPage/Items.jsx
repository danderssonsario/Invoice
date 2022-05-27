import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineDelete } from 'react-icons/ai'

function Items({ invoiceData, setInvoiceData }) {
  const { items } = invoiceData

  const addItemField = () => {
    setInvoiceData((prevState) => ({
      ...prevState,
      items: [...prevState.items, { desc: '', itemID: '', quant: '', pricePer: '', priceTotal: '' }]
    }))
  }

  const deleteItemField = (index) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      items: items.filter((item) => item !== items[index])
    }))
  }

  const handleItemChange = (index, e) => {
    ;[...invoiceData.items][index][e.target.name] = e.target.value

    setInvoiceData({
      ...invoiceData,
      items: items.map((item) => {
        return {...item, priceTotal: (item.pricePer || 0) * (item.quant || 0)}
      })
    })
  }

  return (
    <>
      <div className='flex items-start w-full mb-0 bg-gray-100'>
        <div className='font-bold p-2 mr-48'>Beskrivning</div>
        <div className='font-bold p-2 ml-6 mr-36'>Art.nr</div>
        <div className='font-bold p-2 ml-4 mr-8'>Antal</div>
        <div className='font-bold p-2 mr-8'>á pris</div>
        <div className='font-bold p-2'>Belopp</div>
      </div>

      {items.map((item, index) => (
        <div key={index} className=''>
          <div className='flex items-start w-full relative'>
            <div>
              <div className=''>
                <input
                  className='mr-2 w-80 rounded-lg bg-gray-200 mt-2 p-1 focus:bg-gray-100 focus:outline-1'
                  type='text'
                  name='desc'
                  id='desc'
                  value={item.desc}
                  onChange={(e) => handleItemChange(index, e)}
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
                  value={item.itemID}
                  onChange={(e) => handleItemChange(index, e)}
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
                  value={item.quant}
                  onChange={(e) => handleItemChange(index, e)}
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
                  value={item.pricePer}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
            </div>

            <p className='text-lg mt-2 p-1'>{item.priceTotal} kr</p>
            <AiOutlineDelete
              onClick={() => deleteItemField(index)}
              className='absolute bottom-2 right-0 w-6 h-6 text-red-600 hover:text-red-800 hover:cursor-pointer duration-200'
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItemField}
        className='mb-5 bg-indigo-500 text-white font-bold py-1 px-2 rounded shadow border-2 border-indigo-500 hover:bg-transparent hover:text-indigo-500 transition-all duration-300'
      >
        Lägg till
      </button>
    </>
  )
}

export default Items
