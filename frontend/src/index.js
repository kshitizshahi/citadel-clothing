import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import { BASE_URL } from "./utils/BaseUrl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
