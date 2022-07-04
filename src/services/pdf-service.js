/**
 * Api calls to resource server.
 */
import customFetch from '../utils/customFetch'
const API_BASE_URL = 'https://faktureringsserver.herokuapp.com/api/v1' // heroku auth-app
const localurl = 'http://localhost:5001/api/v1'
const getPdf = async (token) => {
  const res = await customFetch(`${API_BASE_URL}/pdf`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 404) throw new Error('Faktura finns ej.')
  if (res.status === 401) throw new Error('')

  const pdfBlob = new Blob([await res.blob()], { type: 'application/pdf' })
  return URL.createObjectURL(pdfBlob)
}

const createPdf = async (data, token) => {
  console.log('createPDF')
  const res = await customFetch(`${API_BASE_URL}/pdf/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (res.status === 404) throw new Error('Inga fakturor.')
  if (res.status === 401) throw new Error('')
  return 

}

const send = async (data, token) => {
  const res = await customFetch(`${API_BASE_URL}/pdf/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (res.status === 401) throw new Error('')

  return await res.json()
}

const pdfService = {
  getPdf,
  createPdf,
  send,
}

export default pdfService