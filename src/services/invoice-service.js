const API_BASE_URL = 'https://faktureringsserver.herokuapp.com/api/v1' // heroku auth-app

const getInvoice = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/invoice/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 404) throw new Error('Faktura finns ej.')
  if (res.status === 401) throw new Error('')

  return await res.json()
}

const getInvoices = async (page, limit, token) => {
  const res = await fetch(`${API_BASE_URL}/invoice/?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 404) throw new Error('Inga fakturor.')
  if (res.status === 401) throw new Error('')

  return await res.json()
}

const createInvoice = async (invoiceData, token) => {
  const res = await fetch(`${API_BASE_URL}/invoice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(invoiceData)
  })

  if (res.status === 401) throw new Error('')

  return await res.json()
}

const editInvoice = async (id, invoiceData, token) => {
  const res = await fetch(`${API_BASE_URL}/invoice/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(invoiceData)
  })

  if (res.status === 404) throw new Error('Faktura finns ej.')
  if (res.status === 401) throw new Error('')

  return await res.json()
}

const deleteInvoice = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/invoice/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 401) throw new Error('')
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
