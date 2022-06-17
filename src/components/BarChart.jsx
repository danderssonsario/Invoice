import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function BarChart({ invoiceData }) {

    const [dateInterval, setDateInterval] = useState([])
    const [revenue, setRevenue] = useState([])
    const [inputDates, setInputDates] = useState({
      start: '2022-01-01',
      end: '2022-12-31'
    })

    const { start, end } = inputDates

    const handleDateChange = (e) => {
      setInputDates((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    useEffect(() => {
      const filteredInvoices = invoiceData.filter(
        (invoice) => invoice.order?.date >= start && invoice.order?.date <= end
      )

      const endDate = new Date(end)
      const startDate = new Date(start)
      const date = new Date(startDate.getTime())
      const dates = []

      while (date <= endDate) {
        dates.push(new Date(date).toISOString().slice(0,10))
        date.setDate(date.getDate() + 1)
      }

      setDateInterval(dates)
      setRevenue(filteredInvoices.map((invoice) => invoice.order.total))

      }, [start, end, invoiceData])

  const chartOptions = {
    scales: {
      y: {
        ticks: {
          color: 'rgb(209 213 219)'
        }
      },
      x: {
        ticks: {
          color: 'rgb(209 213 219)'
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(209 213 219)',
          font: {
            size: 22
          }
        }
      },
      title: {
        display: true,
        text: 'Omsättning',
        color: 'rgb(209 213 219)',
        font: {
          size: 36
        }
      }
    }
  }

  const chartData = {
    labels: dateInterval,
    datasets: [
      {
        label: 'SEK',
        data: revenue,
        borderColor: '#00FFFF',
        backgroundColor: '#4338ca'
      }
    ]
  }

  return (
    <div className='mr-2 p-2 w-2/4 bg-gray-700 rounded-lg font-semibold text-lg text-gray-100'>
      <input
        onChange={(e) => handleDateChange(e)}
        className='mx-2 p-1 bg-gray-600 text-gray-100 font-semibold rounded-md'
        type='date'
        name='start'
        id='start'
        value={start}
      />
      -
      <input
        onChange={(e) => handleDateChange(e)}
        className='mx-2 p-1 bg-gray-600 text-gray-100 font-semibold rounded-md'
        type='date'
        name='end'
        id='end'
        value={end}
      />
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default BarChart