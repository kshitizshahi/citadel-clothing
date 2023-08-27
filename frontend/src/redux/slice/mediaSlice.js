import { createSlice } from "@reduxjs/toolkit";

const mediaSlice = createSlice({
  name: "mobileDevice",
  initialState: {
    mobileDevice: window.matchMedia("(max-width: 1000px)").matches
      ? true
      : false,
  },
  reducers: {
    setMedia: (state, action) => {
      state.mobileDevice = action.payload.mobileDevice;
    },
  },
});

export const { setMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
