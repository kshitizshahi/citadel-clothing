import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import themeReducer from "./reducers/themeReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userChangeProfileReducer,
} from "./reducers/userReducers";

const inititalState = {
  theme: {
    darkMode: localStorage.getItem("darkTheme")
      ? JSON.parse(localStorage.getItem("darkTheme"))
      : null,
  },
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  userProfilePicture: {
    userProfile: localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null,
  },
};

const reducer = combineReducers({
  theme: themeReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfilePicture: userChangeProfileReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  inititalState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
