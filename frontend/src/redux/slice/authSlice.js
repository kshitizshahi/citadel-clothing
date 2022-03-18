import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  loginUser,
  registerUser,
  logoutUser,
  validateUser,
} from "../thunkApi/authApi";

const authSlice = createSlice({
  name: "auth user",
  initialState: {
    fetchSuccess: false,
    isAdmin: localStorage.getItem("isAdmin")
      ? JSON.parse(localStorage.getItem("isAdmin"))
      : {
          isAdmin: false,
        },
    isLoggedIn: localStorage.getItem("userLogin")
      ? JSON.parse(localStorage.getItem("userLogin"))
      : {
          isLoggedIn: false,
          isRegistered: false,
          isLoggedOut: null,
          loading: false,
          error: null,
          message: null,
        },
  },
  // reducers: {
  //   resetSuccess: (state) => {
  //     state.fetchSuccess = !state.fetchSuccess;
  //   },
  // },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.isLoggedIn = true;
      state.userInfo = action.payload.data;
      state.fetchSuccess = true;
      state.isAdmin = action.payload.data.isAdmin;
      localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));
      localStorage.setItem("userLogin", JSON.stringify(state.isLoggedIn));
      state.loading = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      localStorage.setItem("userLogin", JSON.stringify(state.isLoggedIn));
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.isRegistered = true;
      state.loading = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [logoutUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.isLoggedOut = true;
      state.isLoggedIn = false;
      state.loading = false;
      state.userInfo = null;
      state.isAdmin = false;
      localStorage.setItem("userLogin", JSON.stringify(state.isLoggedIn));
      localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));

      toast.success(action.payload.message);
    },
    [logoutUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [validateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.fetchSuccess = false;
    },
    [validateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload.data;
      state.isAdmin = action.payload.data.isAdmin;
      state.error = null;
      state.fetchSuccess = true;
      localStorage.setItem("userLogin", JSON.stringify(state.isLoggedIn));
      localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));
    },
    [validateUser.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload;
      state.fetchSuccess = false;
      state.isLoggedIn = false;
      localStorage.setItem("userLogin", JSON.stringify(state.isLoggedIn));
    },
  },
});

// export const { resetSuccess } = authSlice.actions;
export default authSlice.reducer;
