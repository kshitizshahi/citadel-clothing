import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "../thunkApi/categoryApi";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    error: null,
    success: false,
  },

  extraReducers: {
    [getCategory.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.productCategory = action.payload;
      state.loading = false;
      state.success = true;
    },
    [getCategory.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export default CategorySlice.reducer;
