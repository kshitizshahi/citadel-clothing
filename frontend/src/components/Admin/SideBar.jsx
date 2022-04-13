import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/sideBar.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/thunkApi/authApi";

const SideBar = ({ select }) => {
  const [openUsers, setOpenUsers] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    dispatch(logoutUser({}));
    navigate("/");
  };

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
            <NavLink
              to="/admin/product"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon
                icon="icon-park-outline:ad-product"
                className="product-icon"
              />
              <p>Products</p>
            </NavLink>
          </li>

          <li>
            <Link
              to="#"
              onClick={(e) => setOpenUsers(!openUsers)}
              className={
                select === "users" ? "dropdown current-tab" : "dropdown"
              }
            >
              <Icon
                icon="akar-icons:chevron-right"
                className={openUsers ? "caret rotate" : "caret"}
              />

              <Icon icon="ant-design:user-outlined" className="user-icon" />
              <p>Users</p>
            </Link>

            <ul className={openUsers ? "nested" : "nested hide"}>
              <NavLink
                to="/admin/users"
                className={({ isActive }) => (isActive ? "sub-category" : "")}
              >
                <Icon icon="bi:dot" className="product-icon" />
                <p>List Users</p>
              </NavLink>

              <li>
                <NavLink
                  to="/admin/add-user"
                  className={({ isActive }) => (isActive ? "sub-category" : "")}
                >
                  <Icon icon="bi:dot" className="product-icon" />
                  <p>Add User</p>
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
