import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import UserRoute from "./routes/UserRoute";
import { validateUser } from "./redux/thunkApi/authApi";
import { useEffect, useState } from "react";
import LoadingDots from "./components/Loading";
import HomePage from "./pages/HomePage";
import Men from "./pages/Men";
import Shop from "./pages/Shop";
import Dashboard from "./pages/admin/Dashboard";
import ListProduct from "./pages/admin/product/ListProduct";
import AdminRoute from "./routes/AdminRoute";
import Product from "./pages/Product";
import EditProduct from "./pages/admin/product/EditProduct";
import ListCategory from "./pages/admin/category/ListCategory";
import EditCategory from "./pages/admin/category/EditCategory";
import EditSubCategory from "./pages/admin/sub category/EditSubCategory";
import ListSubCategory from "./pages/admin/sub category/ListSubCategory";
import { setMedia } from "./redux/slice/mediaSlice";
import UserPageLayout from "./pages/UserPageLayout";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Category from "./pages/Category";
import Women from "./pages/Women";
import Kid from "./pages/Kid";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import ListUsers from "./pages/admin/user/ListUsers";
import AddUser from "./pages/admin/user/AddUser";
import EditUser from "./pages/admin/user/EditUser";
import ListOrder from "./pages/admin/ListOrder";
import SellerRoute from "./routes/SellerRoute";
import ListSellerCategory from "./pages/seller/category/ListCategory";
import AddSellerCategory from "./pages/seller/category/AddCategory";
import SellerDashboard from "./pages/seller/Dashboard";
import ListSellerProduct from "./pages/seller/product/ListProduct";
import AddSellerProduct from "./pages/seller/product/AddProduct";
import EditSellerProduct from "./pages/seller/product/EditProduct";
import EditSellerCategory from "./pages/seller/category/EditCategory";
import ListSellerSubCategory from "./pages/seller/sub category/ListSubCategory";
import AddSellerSubCategory from "./pages/seller/sub category/AddSubCategory";
import EditSellerSubCategory from "./pages/seller/sub category/EditSubCategory";
import ListSellerOrder from "./pages/seller/ListOrder";
import ContactUs from "./pages/ContactUs";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Reviews from "./pages/Reviews";
import Brand from "./pages/Brand";
import Seller from "./pages/Seller";

function App() {
  const { loading } = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateUser({}));
  }, [dispatch]);

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     if (erWidth < 768) {
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
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kid" element={<Kid />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/brand/:name" element={<Brand />} />
            <Route path="/seller/:name" element={<Seller />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/" element={<UserPageLayout />}>
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route element={<UserRoute />}>
              <Route path="/" element={<UserPageLayout />}>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/reviews" element={<Reviews />} />

                <Route path="/change-password" element={<ChangePassword />} />
              </Route>
              <Route path="/place-order" element={<PlaceOrder />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<ListProduct />} />
              <Route path="/admin/edit-product/:id" element={<EditProduct />} />
              <Route path="/admin/category" element={<ListCategory />} />
              <Route
                path="/admin/edit-category/:id"
                element={<EditCategory />}
              />
              <Route path="/admin/sub-category" element={<ListSubCategory />} />

              <Route
                path="/admin/edit-subcategory/:id"
                element={<EditSubCategory />}
              />
              <Route path="/admin/users" element={<ListUsers />} />
              <Route path="/admin/add-user" element={<AddUser />} />
              <Route path="/admin/edit-user/:id" element={<EditUser />} />
              <Route path="/admin/order" element={<ListOrder />} />
            </Route>

            <Route element={<SellerRoute />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/product" element={<ListSellerProduct />} />
              <Route
                path="/seller/add-product"
                element={<AddSellerProduct />}
              />
              <Route
                path="/seller/edit-product/:id"
                element={<EditSellerProduct />}
              />
              <Route path="/seller/category" element={<ListSellerCategory />} />
              <Route
                path="/seller/add-category"
                element={<AddSellerCategory />}
              />
              <Route
                path="/seller/edit-category/:id"
                element={<EditSellerCategory />}
              />
              <Route
                path="/seller/sub-category"
                element={<ListSellerSubCategory />}
              />
              <Route
                path="/seller/add-subcategory"
                element={<AddSellerSubCategory />}
              />
              <Route
                path="/seller/edit-subcategory/:id"
                element={<EditSellerSubCategory />}
              />

              <Route path="/seller/order" element={<ListSellerOrder />} />
              {/* <Route path="/seller/edit-order/:id" element={<ListOrder />} /> */}
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
