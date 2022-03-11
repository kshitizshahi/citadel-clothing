import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import UserRoute from "./routes/UserRoute";

import { getUser } from "./redux/thunkApi/userApi";
import { validateUser } from "./redux/thunkApi/authApi";
import { useEffect } from "react";
import LoadingDots from "./components/Loading";

import HomePage from "./pages/HomePage";
import Mens from "./pages/Mens";
import Shop from "./pages/Shop";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AdminRoute from "./routes/AdminRoute";
import AddProduct from "./pages/admin/AddProduct";

function App() {
  const { isLoggedIn, loading } = useSelector((state) => state.authUser);
  // const { isLoggedIn } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateUser({}));
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingDots />
      </div>
    );
  }

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     console.log("hey");
  //   });
  // }, [window.innerWidth]);

  return (
    <Router>
      <div className="App">
        {window.innerWidth > 768 && <NavBar />}
        {/* style={{ minHeight: window.innerHeight }} */}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} exact />

            <Route path="/mens" element={<Mens />} />

            <Route path="/shop" element={<Shop />} />

            {/* {!isLoggedIn && ( */}
            <>
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
            </>
            {/* )} */}

            <Route element={<UserRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              {/* <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Products />} /> */}
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Products />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
