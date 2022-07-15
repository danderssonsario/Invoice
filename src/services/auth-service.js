/**
 * API Calls to Authentication server.
 *
 * @author Daniel Andersson
 * @version 2.0.0
 */
const API_BASE_URL = 'https://autentiseringsserver.herokuapp.com' // heroku auth-app
const RESET_URL = 'https://stellular-chaja-fc1e9d.netlify.app/reset'

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

  return
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

  localStorage.setItem('auth', JSON.stringify(data))

  return data
}

const reset = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: userData.email, resetUrl: RESET_URL })
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

  if (res.status === 400) throw new Error('Återställningslänk har gått ut.')

  return await res.json()
}

const logout = () => {
  localStorage.removeItem('auth')
}

const authService = {
  register,
  login,
  reset,
  newPass,
  logout
}

export default authService
