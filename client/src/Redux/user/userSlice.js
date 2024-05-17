import { createSlice } from '@reduxjs/toolkit'
const initialState ={
    currentUser: null,
    error: null,
    loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0,
  },
  reducers: {
    signInstart: (state) => {
        state.loaading = true;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
    },
    signInSuccess: (state,action) => {
        state.currentUser = action.payload;
      state.loading = false;
      state.error= null;
    },
    signInFailure: (state, action) => {
      state.error= action.payload;
      state.loading = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { signInstart,  signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer;