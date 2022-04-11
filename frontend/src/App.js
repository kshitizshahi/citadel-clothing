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
import { setMedia } from "./redux/slice/mediaSlice";
import UserPageLayout from "./pages/UserPageLayout";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Category from "./pages/Category";
import Women from "./pages/Women";
import Kid from "./pages/Kid";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";

function App() {
  const { loading } = useSelector((state) => state.authUser);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  const dispatch = useDispatch();

  useEffect(() => {
    window.matchMedia("(max-width: 1000px)").addEventListener("change", (e) => {
      dispatch(setMedia({ mobileDevice: e.matches }));
    });

    return () => {
      setMatches({});
      window.removeEventListener("change", null);
    };
  }, []);

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
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:name" element={<Category />} />

            <Route path="/" element={<UserPageLayout />}>
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route element={<UserRoute />}>
              <Route path="/" element={<UserPageLayout />}>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/orders" element={<Order />} />
              </Route>
              <Route path="/place-order" element={<PlaceOrder />} />
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
              <Route path="/admin/customer" element={<ListCustomer />} />
              <Route path="/admin/add-customer" element={<AddCustomer />} />
              <Route
                path="/admin/edit-customer/:id"
                element={<EditCustomer />}
              />
              <Route path="/admin/seller" element={<ListSeller />} />
              <Route path="/admin/add-seller" element={<AddSeller />} />
              <Route path="/admin/edit-seller/:id" element={<EditSeller />} />
              <Route
                path="/admin/change/seller-code/"
                element={<ChangeSellerCode />}
              />
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
