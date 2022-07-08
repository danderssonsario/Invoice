/**
 * Component for viewing pdf's.
 *
 * @version 2.0.0
 * @author Daniel Andersson
 */

import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/core/lib/styles/index.css'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPdf, resetState } from '../redux/pdfSlice.js'
import Spinner from '../components/Spinner.jsx'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { useNavigate } from 'react-router-dom'

function PDFviewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const { file, isLoading } = useSelector((state) => state.pdf)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * Hook for redux state.
   */
  useEffect(() => {
    if (!user) navigate('/login')

    dispatch(getPdf())

    return () => {
      dispatch(resetState())
    }
  }, [dispatch, navigate, user])

  if (isLoading) {
    return (
      <div className='flex h-screen w-screen bg-gray-800'>
        <Spinner
          className={
            'mx-auto my-auto w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
          }
        />
      </div>
    )
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center mx-auto text-center'>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js'>
        <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={file} />;
      </Worker>
    </div>
  )
}

export default PDFviewer
