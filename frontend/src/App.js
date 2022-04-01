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
import { useEffect } from "react";
import LoadingDots from "./components/Loading";

import HomePage from "./pages/HomePage";
import Mens from "./pages/Mens";
import Shop from "./pages/Shop";
import Dashboard from "./pages/admin/Dashboard";
import ListProduct from "./pages/admin/product/ListProduct";
import AdminRoute from "./routes/AdminRoute";
import AddProduct from "./pages/admin/product/AddProduct";
import Product from "./pages/Product";
import EditProduct from "./pages/admin/product/EditProduct";
import ListCategory from "./pages/admin/category/ListCategory";
import AddCategory from "./pages/admin/category/AddCategory";
import EditCategory from "./pages/admin/category/EditCategory";
import EditSubCategory from "./pages/admin/sub category/EditSubCategory";
import ListSubCategory from "./pages/admin/sub category/ListSubCategory";
import AddSubCategory from "./pages/admin/sub category/AddSubCategory";
import ListCustomer from "./pages/admin/user/customer/ListCustomer";
import AddCustomer from "./pages/admin/user/customer/AddCustomer";
import EditCustomer from "./pages/admin/user/customer/EditCustomer";
import AddSeller from "./pages/admin/user/seller/AddSeller";
import EditSeller from "./pages/admin/user/seller/EditSeller";
import ListSeller from "./pages/admin/user/seller/ListSeller";
import ChangeSellerCode from "./pages/admin/user/seller/ChangeSellerCode";

function App() {
  const { loading } = useSelector((state) => state.authUser);

  // const { isLoggedIn } = user;

  // let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateUser({}));
  }, [dispatch]);

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
              <Route path="/admin/product" element={<ListProduct />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/edit-product/:id" element={<EditProduct />} />
              <Route path="/admin/category" element={<ListCategory />} />
              <Route path="/admin/add-category" element={<AddCategory />} />
              <Route
                path="/admin/edit-category/:id"
                element={<EditCategory />}
              />
              <Route path="/admin/sub-category" element={<ListSubCategory />} />
              <Route
                path="/admin/add-subcategory"
                element={<AddSubCategory />}
              />
              <Route
                path="/admin/edit-subcategory/:id"
                element={<EditSubCategory />}
              />
            </Route>
            <Route path="/admin/customer" element={<ListCustomer />} />
            <Route path="/admin/add-customer" element={<AddCustomer />} />
            <Route path="/admin/edit-customer/:id" element={<EditCustomer />} />
            <Route path="/admin/seller" element={<ListSeller />} />
            <Route path="/admin/add-seller" element={<AddSeller />} />
            <Route path="/admin/edit-seller/:id" element={<EditSeller />} />
            <Route
              path="/admin/change/seller-code/"
              element={<ChangeSellerCode />}
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
