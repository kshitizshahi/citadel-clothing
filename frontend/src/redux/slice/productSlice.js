import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllProduct,
  getDiscountProduct,
  getSingleProduct,
  addToCart,
} from "../thunkApi/productApi";

const productSlice = createSlice({
  name: "product",
  initialState: {
    error: null,
    fetchSuccess: false,
    loading: false,
    cart: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },

  reducers: {
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (elem) => elem.productId !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
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
      // toast.success(action.payload.message);
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
    [getSingleProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.fetchSuccess = false;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
      state.fetchSuccess = true;
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.loading = false;
      state.fetchSuccess = false;
      state.error = action.payload;
    },

    [addToCart.fulfilled]: (state, action) => {
      const cartProduct = action.payload;
      const existingProduct = state.cart.find(
        (elem) => elem.productId === cartProduct.productId
      );

      if (existingProduct) {
        state.cart = state.cart.map((elem) =>
          elem.productId === existingProduct.productId ? cartProduct : elem
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      } else {
        state.cart = [...state.cart, cartProduct];
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      }
    },
  },
});

export const { removeFromCart, clearCart } = productSlice.actions;
export default productSlice.reducer;
