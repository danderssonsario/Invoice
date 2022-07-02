import { useNavigate } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'

/**
 * Table row for invoices list..
 * 
 * @version 1.0.0
 * @author Daniel Andersson
 */
function TableItem({ index, order, customer, id}) {

  const navigate = useNavigate()

  return (
    <tbody key={index}>
      <tr>
        <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
          <p className='text-gray-900 whitespace-no-wrap'>{order.reference || '-'}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
          <p className='text-gray-900 whitespace-no-wrap'>{customer.name || '-'}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
          <p className='text-gray-900 whitespace-no-wrap'>{order.total || '-'}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
          <p className='text-gray-900 whitespace-no-wrap'>{order.date || '-'}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl font-semibold'>
          <p className='text-gray-900 whitespace-no-wrap'>{order.dueDate || '-'}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-xl'>
          {order.status ? (
            <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
              <span
                aria-hidden
                className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
              ></span>
              <span className='relative'>Betald</span>
            </span>
          ) : (
            <span className='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
              <span
                aria-hidden
                className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
              ></span>
              <span className='relative'>Obetald</span>
            </span>
          )}
        </td>
        <td className='px-5 py-5 border-b border-gray-300 bg-gray-200 text-sm text-right'>
          <button
            type='button'
            className='inline-block text-gray-500 hover:text-gray-700'
            onClick={() => navigate(`/invoice/${id}`)}
          >
            <AiOutlineEdit className='w-8 h-8' />
          </button>
        </td>
      </tr>
    </tbody>
  )
}

export default TableItem