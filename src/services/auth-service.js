const API_BASE_URL = 'https://autentiseringsserver.herokuapp.com' // heroku auth-app
// const RESET_URL = 'https://stellular-chaja-fc1e9d.netlify.app/reset'
const localurl = 'http://localhost:3000/reset'

const register = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  if (res.status === 409) throw new Error('Användare existerar redan.')
  if (res.status === 400) throw new Error('Fält saknas.')

  return 'hej'
}

const login = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  if (res.status === 401) throw new Error('Felaktiga uppgifter. Försök igen.')
  
  const data = await res.json()

  localStorage.setItem('user', JSON.stringify(data))

  return data
}

const reset = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: userData.email, resetUrl: localurl })
  })

  if (res.status === 404) throw new Error('Finns inget konto kopplat till denna e-postadress.')

  return await userData.email
}

const newPass = async (userData, params) => {
  const res = await fetch(`${API_BASE_URL}/newpass/${params.token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  })

  if (res.status === 400) throw new Error('Återställningslänk har gått ut eller förbrukats.')

  return await res.json()
}

const authService = {
  register,
  login,
  reset,
  newPass
}

export default authService
