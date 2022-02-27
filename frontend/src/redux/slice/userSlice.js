import { createSlice } from "@reduxjs/toolkit";

import { updateUser } from "../thunkApi/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    error: null,
    isValid: true,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: {
    [updateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.userUpdate = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.userUpdate = action.payload;
      state.loading = false;
      state.success = !state.success;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.userUpdate = null;
      state.error = action.payload;
      state.isValid = !state.isValid;
    },
  },
});

// const loginUserReducer = loginUserSlice.reducer;
// const registerUserReducer = registerUserSlice.reducer;

// export { loginUserReducer, registerUserReducer };

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
