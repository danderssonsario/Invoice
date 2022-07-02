
/**
 * Table header for invoices list.
 * 
 * @version 1.0.0
 * @author Daniel Andersson
 */
function TableHeader() {
  return (
    <thead>
      <tr>
        <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
          Faktura
        </th>
        <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
          Kund
        </th>
        <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
          Totalbelopp
        </th>
        <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
          Skapad
        </th>
        <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
          Förfallodatum
        </th>
        <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xl font-semibold text-gray-200 uppercase tracking-wider'>
          Status
        </th>
        <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-700'></th>
      </tr>
    </thead>
  )
}

export default TableHeader