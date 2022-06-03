const API_BASE_URL = 'https://faktureringsserver.herokuapp.com/api/v1' // heroku auth-app

const getPdf = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/pdf/`, {
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

const createPdf = async (invoiceData, token) => {
  const res = await fetch(`${API_BASE_URL}/pdf/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(invoiceData)
  })

  if (res.status === 404) throw new Error('Inga fakturor.')
  if (res.status === 401) throw new Error('')

  return await res.json()
}

const send = async (token) => {
  const res = await fetch(`${API_BASE_URL}/pdf/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
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