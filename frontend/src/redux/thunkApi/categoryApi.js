import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/category/get/category`);
      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
