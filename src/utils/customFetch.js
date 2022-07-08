/**
 * Fetch with interceptor.
 * 
 * @author Daniel Andersson
 * @version 2.0.0
 */
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const API_BASE_URL = 'https://autentiseringsserver.herokuapp.com' // heroku auth-app
// const RESET_URL = 'https://stellular-chaja-fc1e9d.netlify.app/reset'


const originalRequest = async (url, config) => {
  try {
  const res = await fetch(url, config)
  return res
  } catch(e) { console.log(e) }
}

const refreshAccessToken = async (refreshToken) => {
  const res = await fetch(`${API_BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken: refreshToken})
  })
  if(res.ok) {
  const data = await res.json()
  localStorage.setItem('auth', JSON.stringify(data))
  return data
  } else {
  localStorage.removeItem('auth')  
  }
}

/**
 * Custom fetcher built on fetch API.
 * Source: https://www.youtube.com/watch?v=hbvnsse4xGI
 * 
 * @param {string} url - Fetch URL.
 * @param {object} config - Config object.
 * @returns {object} Response of original request.
 */
const customFetch = async (url, config = {}) => {
  let authTokens = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null

  // Get expiration point.
  const userData = jwt_decode(authTokens?.accessToken)
  const isExpired = dayjs.unix(userData.exp).diff(dayjs()) < 1;

  // Refresh accesstoken if expired.
  if(isExpired) {
    authTokens = await refreshAccessToken(authTokens?.refreshToken)
  }

  // Proceed with request.
  config['headers'] = {
    Authorization: `Bearer ${authTokens.accessToken}`,
    'Content-Type': 'application/json'
  }

  const res = await originalRequest(url, config)
  return res
}
export default customFetch
