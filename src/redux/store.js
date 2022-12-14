import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import invoiceReducer from './invoiceSlice'
import pdfReducer from './pdfSlice'

// Holder of redux state.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
    pdf: pdfReducer
  }
})
