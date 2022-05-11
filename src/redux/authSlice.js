import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/auth-service'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (err) {
    //fixa rätt meddelande
    return thunkAPI.rejectWithValue('something went wrong')
  }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const reset = createAsyncThunk('auth/reset', async (user, thunkAPI) => {
  try {
    return await authService.reset(user)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const newPass = createAsyncThunk('auth/newpass', async (user, thunkAPI) => {
  try {
    return await authService.reset(user)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    resetState: (state) => { 
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(reset.pending, (state) => {
        state.isLoading = true
      })
      .addCase(reset.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(reset.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  }
})

export const { resetState } = authSlice.actions
export default authSlice.reducer