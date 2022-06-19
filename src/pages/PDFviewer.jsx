import { Document, Page, PDFDownloadLink } from 'react-pdf/dist/esm/entry.webpack'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPdf, getPdf, send } from '../redux/pdfSlice.js'
import Spinner from '../components/Spinner.jsx'


function PDFviewer() {

  const { file, isError, isLoading, isSucess, message  } = useSelector((state) => state.pdf)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPdf('wtf'))
  }, [dispatch, file])

if (isLoading)
  return (
    <div className='flex h-screen w-screen bg-gray-800'>
      <Spinner
        className={
          'mx-auto my-auto w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
        }
      />
    </div>
  )
  return (
    <div className='w-full h-full flex justify-center'>
      <PDFDownloadLink document>
        <Document className='text-center' file={file}>
          <Page pageNumber={1} />
        </Document>
      </PDFDownloadLink>
    </div>
  )
}

export default PDFviewer