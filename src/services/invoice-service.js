/**
 * Api calls to resource server, invoice route.
 * 
 * @author Daniel Andersson
 * @version 2.0.0
 */


import customFetch from '../utils/customFetch'
const API_BASE_URL = 'https://faktureringsserver.herokuapp.com/api/v1' // heroku resource-app


/**
 * Gets an invoice.
 * 
 * @param {string} id - Invoice id. 
 * @param {string} token - Auth token. 
 * @returns Invoice object.
 */
const getInvoice = async (id, token) => {
  const res = await customFetch(`${API_BASE_URL}/invoice/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 404) throw new Error('Faktura finns ej.')
  if (res.status === 401) localStorage.removeItem('auth')

  return await res.json()
}

/**
 * Gets invoices.
 * 
 * @param {string} page - Page number.
 * @param {string} limit - Number of invoices requested (1 page).  
 * @param {string} token - Auth token. 
 * @returns Invoice object.
 */
const getInvoices = async (page, limit, token) => {
  const res = await customFetch(`${API_BASE_URL}/invoice/?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 404) throw new Error('Inga fakturor.')
  if (res.status === 401) localStorage.removeItem('auth')
  return await res.json()
}

/**
 * Creates an invoice.
 * 
 * @param {string} invoiceData - Data of invoice. 
 * @param {string} token - Auth token. 
 * @returns Invoice object.
 */
const createInvoice = async (invoiceData, token) => {
  const res = await customFetch(`${API_BASE_URL}/invoice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(invoiceData)
  })

  if (res.status === 401) localStorage.removeItem('auth')

  return await res.json()
}

/**
 * Edits an invoice.
 * 
 * @param {string} id - Invoice id.
 * @param {string} invoiceData - Data of new invoice. 
 * @param {string} token - Auth token. 
 * @returns Invoice object.
 */
const editInvoice = async (id, invoiceData, token) => {
  const res = await customFetch(`${API_BASE_URL}/invoice/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(invoiceData)
  })

  if (res.status === 404) throw new Error('Faktura finns ej.')
  if (res.status === 401) localStorage.removeItem('auth')

  return await res.json()
}

/**
 * Delets an invoice.
 * 
 * @param {string} id - Invoice id.
 * @param {string} token - Auth token. 
 * @returns Invoice id.
 */
const deleteInvoice = async (id, token) => {
  const res = await customFetch(`${API_BASE_URL}/invoice/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 401) localStorage.removeItem('auth')
  if (res.status === 404) throw new Error('Faktura finns ej.')

  return id
}

const invoiceService = {
  getInvoice,
  getInvoices,
  createInvoice,
  editInvoice,
  deleteInvoice
}

export default invoiceService
