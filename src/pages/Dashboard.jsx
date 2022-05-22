import Sidebar from '../components/Sidebar'
import BarChart from '../components/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import PieChart from '../components/PieChart'
import { MdMoneyOff, MdAttachMoney, MdOutlinePendingActions } from 'react-icons/md'
import {
  AiOutlineFileText,
  AiOutlineFileDone,
  AiOutlineFileUnknown,
  AiOutlineFileExclamation,
  AiOutlineBank
} from 'react-icons/ai'

function Dashboard() {

  const options = {
    scales: {
      y: {
        ticks: {
          color: 'rgb(209 213 219)',
        }
      },
      x: {
        ticks: {
          color: 'rgb(209 213 219)',
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

  const data = {
    labels: [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'SEK',
        data: [1, 2, 3, 4, 5],
        borderColor: '#00FFFF',
        backgroundColor: '#4338ca',
      },
    ],
  }

    const pieOptions = {
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
    const pieData = {
      labels: ['Betalda', 'Obetalda', 'Förfallna'],
      datasets: [
        {
          data: [7, 2, 1],
          borderColor: 'rgb(209 213 219)',
          backgroundColor: ['rgb(21 128 61)', 'rgb(161 98 7)', 'rgb(185 28 28)']
        }
      ]
    }

  return (
    <div className='flex h-screen w-screen bg-gray-800'>
      <Sidebar />
      <div className='bg-gray-800 font-sans w-full'>
        <div className='mx-auto my-8 w-full flex flex-wrap justify-center'>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Antal fakturor</p>
                <p className='text-3xl font-semibold text-gray-500'>10</p>
              </div>
              <div className='my-auto'>
                <AiOutlineFileText className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md '>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Antal betalda</p>
                <p className='text-3xl font-semibold text-gray-500'>10</p>
              </div>
              <div className='my-auto'>
                <AiOutlineFileDone className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Antal obetalda</p>
                <p className='text-3xl font-semibold text-gray-500'>10</p>
              </div>
              <div className='my-auto'>
                <AiOutlineFileUnknown className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Antal förfallna</p>
                <p className='text-3xl font-semibold text-gray-500'>10</p>
              </div>
              <div className='my-auto'>
                <AiOutlineFileExclamation className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Totalt belopp</p>
                <p className='text-3xl font-semibold text-gray-500'>10</p>
              </div>
              <div className='my-auto'>
                <AiOutlineBank className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Betalt belopp</p>
                <p className='text-3xl font-semibold text-gray-500'>10</p>
              </div>
              <div className='my-auto'>
                <MdAttachMoney className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Obetalt belopp</p>
                <p className='text-3xl font-semibold text-gray-500'>10</p>
              </div>
              <div className='my-auto'>
                <MdOutlinePendingActions className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='my-5 mx-10 pl-5 w-80 h-32 bg-indigo-700 rounded-lg shadow-md'>
            <div className='flex w-full h-full py-2 px-4 bg-gray-700 rounded-lg justify-between'>
              <div className='my-auto'>
                <p className='text-3xl font-semibold text-gray-300'>Förfallet belopp</p>
                <p className='text-3xl font-semibold text-gray-500'>10</p>
              </div>
              <div className='my-auto'>
                <MdMoneyOff className='w-10 h-10 text-gray-300' />
              </div>
            </div>
          </div>
          <div className='w-full flex flex-wrap mt-5 items-center justify-center'>
            <BarChart chartData={data} chartOptions={options} />
            <PieChart chartData={pieData} chartOptions={pieOptions}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard