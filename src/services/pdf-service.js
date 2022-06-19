
const API_BASE_URL = 'https://faktureringsserver.herokuapp.com/api/v1' // heroku auth-app

const getPdf = async (token) => {
  const res = await fetch(`${API_BASE_URL}/pdf/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  /* const pdfBlob = new Blob([res.body], { type: 'application/pdf'})
  console.log(pdfBlob) */
  const reader = new FileReader();
  reader.readAsDataURL(await res.blob());
  const base = await new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
  console.log(base)
  return base
    /* const reader = res.body.getReader()
    const stream = new ReadableStream({
        start(controller) {
          return pump()
          async function pump() {
            const { done, value } = await reader.read()
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close()
              return
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value)
            return pump()
          }
        }
      })
    // Create an object URL for the response
    
    // Update image
  
    const newstream = new Response(stream) */

      /* return await res.body */

  if (res.status === 404) throw new Error('Faktura finns ej.')
  if (res.status === 401) throw new Error('')

  /* return new Blob([res.body], { type: 'application/pdf'}) */
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