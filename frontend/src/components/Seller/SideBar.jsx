import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/sideBar.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/thunkApi/authApi";

const SideBar = ({ select }) => {
  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    dispatch(logoutUser({}));
    navigate("/");
  };

  return (
    <div className="admin-sidebar-container">
      <div className="container">
        <p className="heading">Seller Dashboard</p>

        <ul className="ul-items">
          <li>
            <NavLink
              to="/seller/dashboard"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon icon="radix-icons:dashboard" className="dashboard-icon" />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <Link
              to="#"
              onClick={(e) => setOpenCategory(!openCategory)}
              className={
                select === "category" ? "dropdown current-tab" : "dropdown"
              }
            >
              <Icon
                icon="akar-icons:chevron-right"
                className={openCategory ? "caret rotate" : "caret"}
              />

              <Icon
                icon="mdi:format-list-bulleted-type"
                className="category-icon"
              />
              <p>Category</p>
            </Link>

            <ul className={openCategory ? "nested" : "nested hide"}>
              <NavLink
                to="/seller/category"
                className={({ isActive }) => (isActive ? "sub-category" : "")}
              >
                <Icon icon="bi:dot" className="product-icon" />
                <p>List Category</p>
              </NavLink>
              <li>
                <NavLink
                  to="/seller/add-category"
                  className={({ isActive }) => (isActive ? "sub-category" : "")}
                >
                  <Icon icon="bi:dot" className="product-icon" />
                  <p>Add Category</p>
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="#"
              onClick={(e) => setOpenSubCategory(!openSubCategory)}
              className={
                select === "sub-category" ? "dropdown current-tab" : "dropdown"
              }
            >
              <Icon
                icon="akar-icons:chevron-right"
                className={openSubCategory ? "caret rotate" : "caret"}
              />

              <Icon
                icon="icon-park-outline:difference-set"
                className="sub-category-icon"
              />
              <p>Sub Category</p>
            </Link>

            <ul className={openSubCategory ? "nested" : "nested hide"}>
              <NavLink
                to="/seller/sub-category"
                className={({ isActive }) => (isActive ? "sub-category" : "")}
              >
                <Icon icon="bi:dot" className="product-icon" />
                <p>List Sub Category</p>
              </NavLink>
              <li>
                <NavLink
                  to="/seller/add-subcategory"
                  className={({ isActive }) => (isActive ? "sub-category" : "")}
                >
                  <Icon icon="bi:dot" className="product-icon" />
                  <p>Add Sub Category</p>
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="#"
              onClick={(e) => setOpenProduct(!openProduct)}
              className={
                select === "product" ? "dropdown current-tab" : "dropdown"
              }
            >
              <Icon
                icon="akar-icons:chevron-right"
                className={openProduct ? "caret rotate" : "caret"}
              />

              <Icon
                icon="icon-park-outline:ad-product"
                className="product-icon"
              />
              <p>Products</p>
            </Link>

            <ul className={openProduct ? "nested" : "nested hide"}>
              <NavLink
                to="/seller/product"
                className={({ isActive }) => (isActive ? "sub-category" : "")}
              >
                <Icon icon="bi:dot" className="product-icon" />
                <p>List Products</p>
              </NavLink>

              <li>
                <NavLink
                  to="/seller/add-product"
                  className={({ isActive }) => (isActive ? "sub-category" : "")}
                >
                  <Icon icon="bi:dot" className="product-icon" />
                  <p>Add Product</p>
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink
              to="/seller/order"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon icon="clarity:list-line" className="order-icon" />
              <p>Orders</p>
            </NavLink>
          </li>

          <li>
            <Link to="#" onClick={logoutHandler}>
              <Icon icon="clarity:sign-out-line" className="logout-icon" />
              <p>Logout</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
