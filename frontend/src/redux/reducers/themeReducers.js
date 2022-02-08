import { DARK_THEME_SUCCESS } from "../constants/themeConstants";

const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case DARK_THEME_SUCCESS:
      return { darkMode: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
