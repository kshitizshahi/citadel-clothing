import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../constants/userConstants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    // const formdata = new FormData();
    // formdata.append("email", email);
    // formdata.append("password", password);

    // const config = {
    //   headers: { "content-type": "multipart/form-data" },
    // };

    const response = await axios.post(
      `${BASE_URL}/api/users/login`,
      {
        // formdata,
        email,
        password,
      },
      {
        withCredentials: true,
      }
      // config
    );
    console.log("Success", response);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const {
      userRegister: { userInfo },
    } = getState();
    const userId = userInfo._id;
    const profilePicture = "/images/default-profile.png";

    const formdata = new FormData();
    formdata.append("profileImage", profilePicture);

    const { data } = await axios.put(
      `${BASE_URL}/api/users/change-profile/${userId}`,
      formdata
    );

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userProfile", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (firstName, lastName, email, phoneNumber, password, confirmPassword) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const response = await axios.post(`${BASE_URL}/api/users/register`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
      });
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: response.data,
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));

      dispatch(login(response.data.email, password));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  const response = await axios.delete(
    `${BASE_URL}/api/users/logout`,

    {
      withCredentials: true,
    }
  );

  localStorage.removeItem("userInfo");
};
