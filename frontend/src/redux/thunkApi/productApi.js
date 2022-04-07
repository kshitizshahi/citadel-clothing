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

export const getSingleProduct = createAsyncThunk(
  "product/getSingle",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/products/get/${id}`);
      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "product/addCart",
  async ({ id, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`/api/products/get/${id}`);

      const data = res.data.product;

      return {
        productId: data._id,
        name: data.name,
        image: data.images[0],
        markPrice: data.markPrice,
        price: data.price,
        discount: data.discount,
        countInStock: data.countInStock,
        brand: data.brand,
        subCategory: data.subCategory.name,
        quantity: quantity,
      };
    } catch (err) {
      if (!err.response) {
        return err.message;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
