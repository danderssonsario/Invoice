/**
 * Api calls to resource server, pdf route.
 * 
 * @author Daniel Andersson
 * @version 2.0.0
 */
import customFetch from '../utils/customFetch'
const API_BASE_URL = 'https://faktureringsserver.herokuapp.com/api/v1' // heroku auth-app

/**
 * Gets pdf from server.
 * 
 * @param {string} token - Auth token.
 * @returns URL representation of the pdf Blob.
 */
const getPdf = async (token) => {
  const res = await customFetch(`${API_BASE_URL}/pdf`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 404) throw new Error('Faktura finns ej.')
  if (res.status === 401) localStorage.removeItem('auth')

  const pdfBlob = new Blob([await res.blob()], { type: 'application/pdf' })
  return URL.createObjectURL(pdfBlob)
}

/**
 * Creates pdf on server.
 * 
 * @param {string} token - Auth token.
 * @param {object} data - Invoice data.
 */
const createPdf = async (data, token) => {
  const res = await customFetch(`${API_BASE_URL}/pdf/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (res.status === 404) throw new Error('Inga fakturor.')
  if (res.status === 401) localStorage.removeItem('auth')
  return 

}

/**
 * Sends email to customer.
 * 
 * @param {string} token - Auth token.
 * @param {object} data - Mail data { issuer, customer, message }
 */
const send = async (data, token) => {
  const res = await customFetch(`${API_BASE_URL}/pdf/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (res.status === 401) localStorage.removeItem('auth')

  return await res.json()
}

const pdfService = {
  getPdf,
  createPdf,
  send,
}

export default pdfService