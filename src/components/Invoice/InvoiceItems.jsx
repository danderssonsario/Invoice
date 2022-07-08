/**
 * Displays invoice's items/services.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

function InvoiceItems({ items }) {
  return (
    <>
      <div className='flex justify-between text-lg items-start w-full mb-0 bg-gray-100'>
        <div className='font-bold p-2 mr-48'>Beskrivning</div>
        <div className='font-bold p-2 ml-6 mr-36'>Art.nr</div>
        <div className='font-bold p-2 ml-4 mr-8'>Antal</div>
        <div className='font-bold p-2 mr-8'>á pris</div>
        <div className='font-bold p-2'>Belopp</div>
      </div>
      {items.map((item, index) => (
        <div key={index} className='min-w-full'>
          <div className='text-lg flex items-start justify-between min-w-full relative'>
            <div>
              <div className='flex flex-col mr-3 w-80 mt-2 p-1'>{item.desc}</div>
            </div>
            <div>
              <div className='flex flex-col mr-5 w-52 mt-2 p-1'>{item.itemID}</div>
            </div>
            <div>
              <div className='flex flex-col mr-3 w-20 mt-2 p-1'>{item.quant}</div>
            </div>
            <div>
              <div className='flex flex-col mr-3 w-20 mt-2 p-1'>{item.pricePer}</div>
            </div>
            <p className='mt-2 p-1'>{item.priceTotal} kr</p>
          </div>
        </div>
      ))}{' '}
    </>
  )
}

export default InvoiceItems
