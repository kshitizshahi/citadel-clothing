import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateUser } from "./authApi";

// const formdata = new FormData();
// formdata.append("profileImage", userImage);

// const { data } = await axios.put(
//   `/api/users/change-profile/${userInfo.data._id}`,
//   formdata
// );

export const updateUser = createAsyncThunk(
  "user/update",
  async (
    { firstName, lastName, email, phoneNumber, userImage },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const formdata = new FormData();
      formdata.append("firstName", firstName);
      formdata.append("lastName", lastName);
      formdata.append("email", email);
      formdata.append("phoneNumber", phoneNumber);

      formdata.append("profileImage", userImage);

      const res = await axios.put(`/api/users/update-user`, formdata);
      dispatch(validateUser({}));
      return res.data;
    } catch (err) {
      if (!err.response) {
        return err.message;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
