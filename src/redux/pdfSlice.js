import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pdfService from '../services/pdf-service.js'

const initialState = {
  file: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getPdf = createAsyncThunk('pdf/get', async (yo,thunkAPI) => {
  try {
    console.log(yo)
    const token = thunkAPI.getState().auth.user.access_token
    
    return await pdfService.getPdf(token)
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue('')
  }
})

export const createPdf = createAsyncThunk('pdf/create', async (thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await pdfService.createPdf(token)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const send = createAsyncThunk('pdf/send', async (invoiceData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await pdfService.send(invoiceData, token)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    resetState: (state) => {
      state.file = undefined
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPdf.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPdf.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.file = action.payload
        /* state.file = new Blob([action.payload], {type: 'application/pdf'}) */
      })
      .addCase(getPdf.rejected, (state) => {
        console.log('rejected')
        state.isLoading = false
        state.isError = true
        state.message = 'Något gick snett, försök igen!'
      })
      .addCase(createPdf.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPdf.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createPdf.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = 'Något gick snett, försök igen!'
      })
      .addCase(send.pending, (state) => {
        state.isLoading = true
      })
      .addCase(send.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = 'Faktura skickad till kund.'
      })
      .addCase(send.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = 'Något gick snett, försök igen!'
      })
    }
  })

export const { resetState } = pdfSlice.actions
export default pdfSlice.reducer