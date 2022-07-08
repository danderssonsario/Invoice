/**
 * Component for registering an account.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register, resetState } from '../redux/authSlice.js'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner.jsx'

function Register() {
  toast.clearWaitingQueue()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const { email, password, passwordConfirm } = formData

  /**
   * Onchange handler for input fields.
   *
   * @param {object} e - Event object.
   */
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  /**
   * OnSubmit handler.
   *
   * @param {object} e - Event object.
   */
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      toast.error('Lösenord matchar inte.')
    } else {
      const userData = {
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) navigate('/dashboard')

    if (isError) toast.error(message)

    if (isSuccess) {
      toast.success(message)
      navigate('/login')
    }

    dispatch(resetState())
  }, [user, isError, isSuccess, navigate, dispatch, message])

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-gray-800'>
      <h2 className='text-7xl text-center font-semibold leading-tight text-gray-200'>Binvoice</h2>
      <form
        onSubmit={onSubmit}
        className='my-auto max-w-[400px] w-full mx-auto bg-gray-900 p-8 rounded-lg'
      >
        <h2 className='text-4xl text-white font-bold text-center'>Registrera konto</h2>
        <div className='flex flex-col text-gray-400 py-2'>
          <label>E-postadress</label>
          <input
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            className='rounded-lg bg-gray-600 mt-2 p-2 focus:bg-gray-700 focus:outline-1'
            type='text'
          />
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
          <label>Lösenord</label>
          <input
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            className='rounded-lg bg-gray-600 mt-2 p-2 focus:bg-gray-700 focus:outline-1'
            type='password'
          />
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
          <label>Bekräfta lösenord</label>
          <input
            id='passwordConfirm'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={onChange}
            className='rounded-lg bg-gray-600 mt-2 p-2 focus:bg-gray-700 focus:outline-1'
            type='password'
          />
        </div>
        {isLoading ? (
          <button
            type='button'
            className='font-semibold text-gray-200 w-full my-5 py-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-600'
            disabled
          >
            <Spinner
              className={
                'inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
              }
            />
            Laddar ...
          </button>
        ) : (
          <button
            type='submit'
            className='font-semibold text-gray-200 w-full my-5 py-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-600'
          >
            Registrera
          </button>
        )}
        <div className='flex justify-between'>
          <div className='font-semibold text-gray-300 rounded-md w-4/5 my-3 text-center mx-auto py-0.5 bg-indigo-700 shadow-lg hover:bg-indigo-800 order-first'>
            <Link to='/login'>Har du ett konto? Logga in</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
