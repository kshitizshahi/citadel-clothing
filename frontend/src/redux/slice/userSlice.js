import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { logoutUser } from "../thunkApi/authApi";

import { updateUser } from "../thunkApi/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    error: null,
    success: false,
    userUpdate: null,
    isValid: true,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearuserUpdate: (state) => {
      state.userUpdate = null;
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

      toast.success(action.payload.message);
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.userUpdate = null;
      state.error = action.payload;
      state.isValid = !state.isValid;
      toast.error(action.payload.message);
    },
  },
});

// const loginUserReducer = loginUserSlice.reducer;
// const registerUserReducer = registerUserSlice.reducer;

// export { loginUserReducer, registerUserReducer };

export const { clearError, clearuserUpdate } = userSlice.actions;
export default userSlice.reducer;
