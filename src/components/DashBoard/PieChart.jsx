import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

/**
 * Handles dashboard's pie chart.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */
function PieChart({ invoiceData }) {
  
  // States
  const [paid, setPaid] = useState(0)
  const [unpaid, setUnpaid] = useState(0)
  const [overdue, setOverdue] = useState(0)
  const [inputDates, setInputDates] = useState({
    start: '2022-01-01',
    end: '2022-12-31'
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

    setPaid(filteredInvoices.filter((invoice) => invoice.order.status).length)
    setUnpaid(filteredInvoices.filter((invoice) => !invoice.order.status).length)
    setOverdue(
      filteredInvoices.filter((invoice) => invoice.order.date > invoice.order.duedate).length
    )
  }, [start, end, invoiceData])

  // Chart settings
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(209 213 219)',
          font: {
            size: 16
          }
        }
      },
      title: {
        display: true,
        text: 'Betalningsstatus',
        color: 'rgb(209 213 219)',
        font: {
          size: 36
        }
      }
    }
  }

  // Chart data; Green = paid, Yellow = unpaid, Red = overdue
  const chartData = {
    labels: ['Betalda', 'Obetalda', 'Förfallna'],
    datasets: [
      {
        data: [paid, unpaid, overdue],
        borderColor: 'rgb(209 213 219)',
        backgroundColor: ['rgb(21 128 61)', 'rgb(161 98 7)', 'rgb(185 28 28)']
      }
    ]
  }

  return (
    <div className='ml-2 p-2 w-1/4 bg-gray-700 rounded-lg font-semibold text-lg text-gray-100'>
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
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
}

export default PieChart
