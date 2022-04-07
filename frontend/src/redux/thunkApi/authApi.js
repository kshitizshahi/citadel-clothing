import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { getState, rejectWithValue }) => {
    try {
      //   const {
      //     loginUser: { loading, userInfo },
      //   } = getState();
      //   console.log("Loading ...", loading, userInfo);

      const res = await axios.post(`/api/users/login`, data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (data, { getState, rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`/api/users/register`, data);

      const { email, password } = data;

      // dispatch(loginUser({ email, password }));

      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const validateUser = createAsyncThunk(
  "user/validate",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/users/get/user`);
      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async ({}, { rejectWithValue, getState }) => {
    try {
      const res = await axios.delete(`/api/users/logout`);
      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }

      return rejectWithValue(err.response.data);
    }
  }
);
