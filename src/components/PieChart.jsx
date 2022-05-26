import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function PieChart({ chartData, chartOptions }) {
  return (
    <div className='ml-5 p-5 w-1/4 bg-gray-700 rounded-lg'>
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
}

export default PieChart
