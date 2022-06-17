import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import invoiceService from '../services/invoice-service.js'

const initialState = {
  draft: null,
  invoice: null,
  total: null,
  invoices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getInvoice = createAsyncThunk('invoice/getOne', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await invoiceService.getInvoice(id, token)
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const getInvoices = createAsyncThunk('invoice/getAll', async ({page, limit}, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await invoiceService.getInvoices(page, limit, token)
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const createInvoice = createAsyncThunk('invoice/create', async (invoiceData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await invoiceService.createInvoice(invoiceData, token)
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const editInvoice = createAsyncThunk('invoice/edit', async ({id,  invoiceData}, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await invoiceService.editInvoice(id, invoiceData, token)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const deleteInvoice = createAsyncThunk('invoice/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token
    return await invoiceService.deleteInvoice(id, token)
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    resetState: (state) => initialState,
    togglePayStatus: (state, action) =>
      state.invoices.map((invoice) =>
        invoice.id === action.payload.id ? ({...invoice, order: {...invoice.order, status: !invoice.order.status}}) : invoice
      ),
    saveDraft: (state, action) => {
      state.draft = action.payload
    },
    totalAmount: (state) => state.invoices.reduce((prev, curr) => prev.order.total + curr.order.total)
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoice.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.invoice = action.payload
        state.isLoading = false
        //state.isSuccess = true

        //state.invoices = action.payload
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(getInvoices.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.isLoading = false
        //state.isSuccess = true
        state.invoices = action.payload.invoices
        state.total = action.payload.total
       
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
      })
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.invoices.push(action.payload)
        state.isLoading = false
        state.message = 'Faktura skapad!'
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
      })
      .addCase(editInvoice.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.invoices = state.invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        )
        state.message = 'Faktura redigerad!'
        state.draft = action.payload
      })
      .addCase(editInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload.id)
        state.message = 'Faktura borttagen!'
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
      })
  }
})

export const { resetState, saveDraft, totalAmount } = invoiceSlice.actions
export default invoiceSlice.reducer
