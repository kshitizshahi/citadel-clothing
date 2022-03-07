import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProduct = createAsyncThunk(
  "product/getAll",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/products/get/all-products`);
      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getDiscountProduct = createAsyncThunk(
  "product/getDiscount",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/products/get/discount-products`);
      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
