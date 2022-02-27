import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import authSlice from "./slice/authSlice";

export default configureStore({
  reducer: {
    // userLogin: loginUserReducer,
    // userRegister: registerUserReducer,
    authUser: authSlice,
    User: userSlice,
  },
});
