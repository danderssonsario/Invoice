import { useState } from 'react'
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai'
import { IoCreate, IoHome, IoLogOut } from 'react-icons/io5'
import { FaFileInvoice } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../redux/authSlice.js'


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <div
        className={` ${
          isOpen ? 'w-72' : 'w-20 '
        } bg-gray-900 h-auto p-5 pt-8 duration-300`}
      >
        <div className='flex gap-x-4 items-center mb-10'>
          {isOpen ? (
            <AiOutlineMenuFold
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-200 w-10 h-10 cursor-pointer'
            />
          ) : (
            <AiOutlineMenuUnfold
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-200 w-10 h-10 cursor-pointer '
            />
          )}
        </div>

        <ul className='pt-6'>
          <Link to={'/dashboard'}>
            <li
              className='hover:text-gray-600 flex p-0.5 mr-0.5 cursor-pointer text-gray-200 font-medium text-xl items-center gap-x-4 
              mt-6'
            >
              <IoHome
                className={`${
                  !isOpen && 'hover:text-gray-600 duration-200'
                } w-9 h-9 text-gray-200 shrink-0`}
              />
              <span
                className={`${!isOpen && 'scale-0'} hover:text-gray-600 origin-left duration-200`}
              >
                Hem
              </span>
            </li>
          </Link>
          <Link to={'/create'}>
            <li
              className='hover:text-gray-600 flex p-1 cursor-pointer text-gray-200 font-medium text-xl items-center gap-x-4 
              mt-6'
            >
              <IoCreate
                className={`${
                  !isOpen && 'hover:text-gray-600 duration-200'
                } w-9 h-9 text-gray-200 shrink-0`}
              />
              <span className={`${!isOpen && 'scale-0'} origin-left duration-200`}>Skapa</span>
            </li>
          </Link>
          <Link to={'/invoice'}>
            <li
              className='hover:text-gray-600 flex p-1 cursor-pointer text-gray-200 font-medium text-xl items-center gap-x-4 
              mt-6'
            >
              <FaFileInvoice
                className={`${
                  !isOpen && 'hover:text-gray-600 duration-200'
                } mr-1 w-8 h-8 text-gray-200 shrink-0`}
              />
              <span className={`${!isOpen && 'scale-0'} origin-left duration-200`}>Fakturor</span>
            </li>
          </Link>
          <li
            className='hover:text-gray-600 flex p-1 cursor-pointer text-gray-200 font-medium text-xl items-center gap-x-4 
              mt-20'
          >
            <IoLogOut
              className={`${
                !isOpen && 'hover:text-gray-600 duration-200'
              } ml-0.5 w-9 h-9 text-gray-200 shrink-0`}
            />
            <span className={`${!isOpen && 'scale-0'} origin-left duration-200 shrink-0`}>Logga ut</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
