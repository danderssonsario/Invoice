import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, resetState } from '../redux/authSlice.js'
import Spinner from '../components/Spinner.jsx'


function Login () {
  toast.clearWaitingQueue()
    
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(user) {
      navigate('/dashboard')
    }

    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      navigate('/dashboard')
    }

    dispatch(resetState())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  return (
      <div className='h-screen w-screen flex justify-center items-center bg-gray-800'>
        <form
          onSubmit={onSubmit}
          className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 rounded-lg'
        >
          <h2 className='text-4xl text-white font-bold text-center'>Logga in</h2>
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
            <label>Password</label>
            <input
              id='password'
              name='password'
              value={password}
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
              <Spinner />
              Laddar ...
            </button>
          ) : (
            <button
              type='submit'
              className='font-semibold text-gray-200 w-full my-5 py-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-600'
            >
              Logga in
            </button>
          )}
          <div className='flex justify-between'>
            <button className='font-semibold text-gray-300 rounded-md w-2/5 my-3 py-0.5 bg-indigo-700 shadow-lg hover:bg-indigo-800 order-first'>
              <Link to='/register'>Skapa ett konto</Link>
            </button>
            <button className='font-semibold text-gray-300 rounded-md w-2/5 my-3 py-0.5 bg-indigo-700 shadow-lg hover:bg-indigo-800 order-last'>
              <Link to='/reset'>Glömt lösenord?</Link>
            </button>
          </div>
          <p></p>
        </form>
      </div>
  )
}

export default Login