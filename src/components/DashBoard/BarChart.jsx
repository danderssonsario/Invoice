/**
 * Handles dashboard's bar chart.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

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
  // States
  const [dateInterval, setDateInterval] = useState([])
  const [revenue, setRevenue] = useState([])
  const [inputDates, setInputDates] = useState({
    start: new Date().toISOString().slice(0, 10), // Today yyyy-mm-dd
    end: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, 10) // Today + 30 days.
  })

  const { start, end } = inputDates

  /**
   * Date input onchange handler.
   *
   * @param {object} e - Event object.
   */
  const handleDateChange = (e) => {
    setInputDates((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  /**
   * Filter invoices based on date inputs and set states accordingly.
   */
  useEffect(() => {
    const filteredInvoices = invoiceData.filter(
      (invoice) => invoice.order?.date >= start && invoice.order?.date <= end
    )

    const endDate = new Date(end)
    const startDate = new Date(start)
    const date = new Date(startDate.getTime())
    const dates = []

    while (date <= endDate) {
      dates.push(new Date(date).toISOString().slice(0, 10))
      date.setDate(date.getDate() + 1)
    }

    // Set revenue on index.
    let revenueArray = []
    for (let i = 0; i < filteredInvoices.length; i++) {
      for (let x = 0; x < dates.length; x++) {
        if (filteredInvoices[i].order?.date === dates[x]) {
          revenueArray[x] = filteredInvoices[i].order?.total
        } else {
          revenueArray[x] = 0
        }
      }
    }

    setDateInterval(dates)
    setRevenue(revenueArray)
  }, [start, end, invoiceData])

  // Chart settings
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

  // Chart data; Y = dateInterval, X = revenue
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
