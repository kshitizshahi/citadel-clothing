import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import categorySlice from "./slice/categorySlice";
import mediaSlice from "./slice/mediaSlice";

export default configureStore({
  reducer: {
    // userLogin: loginUserReducer,
    // userRegister: registerUserReducer,
    authUser: authSlice,
    User: userSlice,
    Product: productSlice,
    Category: categorySlice,
    Media: mediaSlice,
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
});
