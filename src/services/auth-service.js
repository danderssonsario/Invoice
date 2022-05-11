const API_BASE_URL = 'https://autentiseringsserver.herokuapp.com' // heroku auth-app

const register = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  const data = await res.json()
  console.log(data) // fixa rätt meddelande
  return await res.json()
}

const login = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  const data = await res.json()
  if (res.ok) localStorage.setItem('user', JSON.stringify(data))

  return data
}

const reset = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return await res.json()
}

const newPass = async (userData, params) => {
  const res = await fetch(`${API_BASE_URL}/newpass/${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return await res.json()
}

const authService = {
  register,
  login,
  reset
}

export default authService
