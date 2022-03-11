import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllProduct, getDiscountProduct } from "../thunkApi/productApi";

const productSlice = createSlice({
  name: "product",
  initialState: {
    error: null,
    fetchSuccess: false,
  },

  extraReducers: {
    [getAllProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.fetchSuccess = false;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.shopProduct = action.payload;
      state.loading = false;
      state.fetchSuccess = true;
      toast.success(action.payload.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    [getAllProduct.rejected]: (state, action) => {
      state.loading = false;
      state.fetchSuccess = false;
      state.error = action.payload;
    },
    [getDiscountProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.fetchSuccess = false;
    },
    [getDiscountProduct.fulfilled]: (state, action) => {
      state.homeProduct = action.payload;
      state.loading = false;
      state.fetchSuccess = true;
    },
    [getDiscountProduct.rejected]: (state, action) => {
      state.loading = false;
      state.fetchSuccess = false;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
