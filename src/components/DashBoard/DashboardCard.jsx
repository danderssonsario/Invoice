/**
 * Displays invoice data as small cards in dashboard page.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

function DashboardCard({ label, value, Icon }) {
  return (
    <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
      <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
        <div className='my-auto'>
          <p className='text-3xl font-semibold text-gray-300'>{label}</p>
          <p className='text-3xl font-semibold text-gray-500'>{value}</p>
        </div>
        <div className='my-auto'>
          <Icon className='w-10 h-10 text-gray-300' />
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
