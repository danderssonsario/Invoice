import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import invoiceService from '../services/invoice-service.js'

const initialState = {
  draft: null,
  invoices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getInvoice = createAsyncThunk('invoice/getOne', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    
    return await invoiceService.getInvoice(params, token)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const getInvoices = createAsyncThunk('invoice/getAll', async (thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await invoiceService.getInvoices(token)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const createInvoice = createAsyncThunk('invoice/create', async (invoiceData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    console.log(token)
    return await invoiceService.createInvoice(invoiceData, token)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const editInvoice = createAsyncThunk('invoice/edit', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await invoiceService.deleteGoal(id, token)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const deleteInvoice = createAsyncThunk('invoice/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await invoiceService.deleteGoal(id, token)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    resetState: (state) => {
      state.draft = null
      state.invoices = []
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.invoices = action.payload
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getInvoices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.invoices = action.payload
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.invoices = state.invoices.push(action.payload)
        state.draft = action.payload
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(editInvoice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.invoices = state.invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        )
      })
      .addCase(editInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload.id)
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { resetState } = invoiceSlice.actions
export default invoiceSlice.reducer
