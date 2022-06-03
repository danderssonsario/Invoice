import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { newPass, resetState } from '../redux/authSlice.js'
import Spinner from '../components/Spinner.jsx'

function NewPass() {
  toast.clearWaitingQueue()

  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: ''
  })

  const { password, passwordConfirm } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const params = useParams()

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      toast.error('Lösenord matchar inte.')
    } else {
      dispatch(newPass(password, params))
    }
  }

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }

    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/login')
    }

    dispatch(resetState())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-800'>
      <form onSubmit={onSubmit} className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 rounded-lg'>
        <h2 className='text-4xl text-white font-bold text-center'>Välj ett nytt lösenord</h2>
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
            Sätt nytt lösenord
          </button>
        )}
        <div className='flex justify-between'>
          <div className='font-semibold text-center text-gray-300 rounded-md w-2/5 my-3 py-0.5 bg-indigo-700 shadow-lg hover:bg-indigo-800 order-first'>
            <Link to='/register'>Skapa ett konto</Link>
          </div>
          <div className='font-semibold text-center text-gray-300 rounded-md w-2/5 my-3 py-0.5 bg-indigo-700 shadow-lg hover:bg-indigo-800 order-last'>
            <Link to='/reset'>Glömt lösenord?</Link>
          </div>
        </div>
        <p></p>
      </form>
    </div>
  )
}

export default NewPass
