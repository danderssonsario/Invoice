import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


function BarChart({chartData, chartOptions}) {
  return (
    <div className='p-2 w-2/4 bg-gray-700 rounded-lg'>
      <Bar data={chartData} options={chartOptions}/>
    </div>
  )
}

export default BarChart