import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/sideBar.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ select }) => {
  const [openProduct, setOpenProduct] = useState(false);

  return (
    <div className="admin-sidebar-container">
      <div className="container">
        <p className="heading">Admin Dashboard</p>

        <ul className="ul-items">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon icon="radix-icons:dashboard" className="dashboard-icon" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/category"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon
                icon="mdi:format-list-bulleted-type"
                className="category-icon"
              />
              <p>Category</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/sub-category"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon
                icon="icon-park-outline:difference-set"
                className="sub-category-icon"
              />
              <p>Sub Category</p>
            </NavLink>
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
                // className="caret"
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
                to="/admin/product"
                className={({ isActive }) => (isActive ? "sub-category" : "")}
              >
                <Icon icon="bi:dot" className="product-icon" />
                <p>List Products</p>
              </NavLink>
              <li>
                <NavLink
                  to="/admin/add-product"
                  className={({ isActive }) => (isActive ? "sub-category" : "")}
                >
                  <Icon icon="bi:dot" className="product-icon" />
                  <p>Add Product</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/edit-product"
                  className={({ isActive }) => (isActive ? "sub-category" : "")}
                >
                  <Icon icon="bi:dot" className="product-icon" />
                  <p>Edit Product</p>
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/admin/order"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon icon="clarity:list-line" className="order-icon" />
              <p>Orders</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon icon="ant-design:user-outlined" className="user-icon" />
              <p>Users</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout">
              <Icon icon="clarity:sign-out-line" className="logout-icon" />
              <p>Logout</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
