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
import { useEffect, useState } from "react";
import LoadingDots from "./components/Loading";

import HomePage from "./pages/HomePage";
import Mens from "./pages/Mens";
import Shop from "./pages/Shop";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/ListProduct";
import AdminRoute from "./routes/AdminRoute";
import AddProduct from "./pages/admin/AddProduct";
import Product from "./pages/Product";
import EditProduct from "./pages/admin/EditProduct";

function App() {
  const { loading } = useSelector((state) => state.authUser);

  // const { isLoggedIn } = user;

  // let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateUser({}));
  }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     if (window.innerWidth < 768) {
  //       console.log("mobile");
  //     }
  //   });
  // }, []);
  if (loading) {
    <LoadingDots />;
  }

  return (
    <Router>
      <div className="App">
        <NavBar />

        <div>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/mens" element={<Mens />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />

            <Route element={<UserRoute />}>
              <Route path="/profile" element={<UserProfile />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Products />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/edit-product/:id" element={<EditProduct />} />
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
