import { DARK_THEME_SUCCESS } from "../constants/themeConstants";

export const darkTheme = (value) => (dispatch) => {
  dispatch({
    type: DARK_THEME_SUCCESS,
    payload: value,
  });

  localStorage.setItem("darkTheme", JSON.stringify(value));
};
