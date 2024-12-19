import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginCustomer, CurrentUser,RefreshTokenAPI ,
  LogoutAPI
} from './apis'
import { toast } from 'react-toastify';
// Define types for the state
interface CurrentUserI {
  loading: boolean
  error: string | null
  data: any | null
}

interface AuthState {
  current_user: any
  token_data: any
  logout_State : any
}

// Define the initial state
const initialState: AuthState = {
  current_user: {
    loading: false,
    error: null,
    data: null,
    iSuccess : false
  },
  token_data : {
    loading : false,
    error : null,
    data : null
  },
  logout_State :{
    loading : false,
    error : null,
    data : null
  }
}

export const Auth_States = createSlice({
  name: 'Auth_States',
  initialState,
  reducers: {
    RESET_CURRENTUser(state, action: PayloadAction<any>) {
      const {iSuccess} = action.payload;

      if(iSuccess){
        state.current_user.iSuccess = iSuccess
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginCustomer.pending, (state) => {
        state.current_user.loading = true
        state.current_user.error = null
        state.current_user.data = null
      })
      .addCase(LoginCustomer.fulfilled, (state, action) => {
        state.current_user.loading = false
        state.current_user.error = null
        state.current_user.data = action.payload
        toast.success("login successfully")
      })
      .addCase(LoginCustomer.rejected, (state, action) => {
        state.current_user.loading = false
        state.current_user.error = action.payload || 'Unknown error'
        state.current_user.data = null
        toast.error(action.payload)
      })
      .addCase(CurrentUser.pending, (state, action) => {
        state.current_user.loading = true
        state.current_user.error = null
        state.current_user.data = null
      })
      .addCase(CurrentUser.fulfilled, (state, action) => {
        state.current_user.loading = false
        state.current_user.data = action.payload
        state.current_user.error = null
        state.current_user.iSuccess = true
      })
      .addCase(CurrentUser.rejected, (state, action) => {
        state.current_user.loading = false
        state.current_user.error = action.payload || 'Unknown error'
        state.current_user.data = null
      })
      .addCase(RefreshTokenAPI.pending, (state, action) => {
        state.token_data.loading = true
        state.token_data.error = null
        state.token_data.data = null
      })
      .addCase(RefreshTokenAPI.fulfilled, (state, action) => {
        state.token_data.loading = false
        state.token_data.error = null
        state.token_data.data = action.payload
      })
      .addCase(RefreshTokenAPI.rejected, (state, action) => {
        state.token_data.loading = false
        state.token_data.error = action.payload
        state.token_data.data = null
      })
      // logout api
      .addCase(LogoutAPI.pending, (state, action) => {
        state.logout_State.loading = true
        state.logout_State.data = null
        state.logout_State.error = null
      })
      .addCase(LogoutAPI.fulfilled, (state, action) => {
        state.logout_State.loading = false
        state.logout_State.data = action.payload
        state.logout_State.error = null
      })
      .addCase(LogoutAPI.rejected, (state, action) => {
        state.logout_State.loading = false
        state.logout_State.data = null
        state.logout_State.error = action.payload
      })

      
  },
})

export const { RESET_CURRENTUser } = Auth_States.actions
export default Auth_States.reducer
