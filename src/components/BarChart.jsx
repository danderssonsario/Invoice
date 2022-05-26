import { Bar } from 'react-chartjs-2'

import { AiOutlineRightSquare,
  AiOutlineLeftSquare } from 'react-icons/ai'

function BarChart({chartData, chartOptions}) {
  return (
    <div className='p-2 w-2/4 bg-gray-700 rounded-lg'>
      <div className='flex'>
        <AiOutlineLeftSquare className='mx-1 w-8 h-8 text-indigo-600 hover:text-gray-900 duration-100' />
        <p className='text-gray-200 text-lg font-semibold my-auto'>2022</p>
        <AiOutlineRightSquare className='mx-1 w-8 h-8 text-indigo-600 hover:text-gray-900 duration-100' />
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default BarChart