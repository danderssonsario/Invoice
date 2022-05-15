
function Invoices() {
  return (
    <div className='relative h-screen w-screen bg-gray-800 flex justify-center items-center'>
      <div className='max-w-7xl container mx-auto px-4 sm:px-8 bg-gray-900 rounded-xl'>
        <div className='py-8'>
          <div>
            <h2 className='text-3xl font-semibold leading-tight text-gray-200'>Invoices</h2>
          </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-lg font-semibold text-gray-200 uppercase tracking-wider'>
                      Faktura
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-lg font-semibold text-gray-200 uppercase tracking-wider'>
                      Kund
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-lg font-semibold text-gray-200 uppercase tracking-wider'>
                      Totalbelopp
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-lg font-semibold text-gray-200 uppercase tracking-wider'>
                      Skapad
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-lg font-semibold text-gray-200 uppercase tracking-wider'>
                      Förfallodatum
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-lg font-semibold text-gray-200 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-800'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-lg font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>#123456789</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-lg font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>John Doe</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-lg font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>10000kr</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-lg font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>12 Maj 2022</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-lg font-semibold'>
                      <p className='text-gray-900 whitespace-no-wrap'>30 Juni 2022</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-s'>
                      <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Betald</span>
                      </span>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-right'>
                      <button
                        type='button'
                        className='inline-block text-gray-500 hover:text-gray-700'
                      >
                        <svg className='inline-block h-6 w-6 fill-current' viewBox='0 0 24 24'>
                          <path d='M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z' />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoices
