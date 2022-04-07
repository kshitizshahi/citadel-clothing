import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/sideBar.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/thunkApi/authApi";

const SideBar = ({ select, subSelect }) => {
  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openSeller, setOpenSeller] = useState(false);

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
                to="/admin/category"
                className={({ isActive }) => (isActive ? "sub-category" : "")}
              >
                <Icon icon="bi:dot" className="product-icon" />
                <p>List Category</p>
              </NavLink>
              <li>
                <NavLink
                  to="/admin/add-category"
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
                to="/admin/sub-category"
                className={({ isActive }) => (isActive ? "sub-category" : "")}
              >
                <Icon icon="bi:dot" className="product-icon" />
                <p>List Sub Category</p>
              </NavLink>
              <li>
                <NavLink
                  to="/admin/add-subcategory"
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
              <li>
                <NavLink
                  to="#"
                  onClick={(e) => setOpenCustomer(!openCustomer)}
                  className={
                    subSelect === "customers"
                      ? "dropdown sub-category"
                      : "dropdown"
                  }
                >
                  <Icon
                    icon="akar-icons:chevron-right"
                    className={openCustomer ? "caret rotate" : "caret"}
                  />

                  <Icon icon="bi:dot" className="user-icon" />
                  <p>Customers</p>
                </NavLink>

                <ul className={openCustomer ? "sub-nested" : "sub-nested hide"}>
                  <li>
                    <NavLink
                      to="/admin/customer"
                      className={({ isActive }) =>
                        isActive ? "sub-category" : ""
                      }
                    >
                      <Icon icon="bi:dot" className="product-icon" />
                      <p>List Customer</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/add-customer"
                      className={({ isActive }) =>
                        isActive ? "sub-category" : ""
                      }
                    >
                      <Icon icon="bi:dot" className="product-icon" />
                      <p>Add Customer</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={(e) => setOpenSeller(!openSeller)}
                  className={
                    subSelect === "seller"
                      ? "dropdown sub-category"
                      : "dropdown"
                  }
                >
                  <Icon
                    icon="akar-icons:chevron-right"
                    className={openSeller ? "caret rotate" : "caret"}
                  />

                  <Icon icon="bi:dot" className="user-icon" />
                  <p>Sellers</p>
                </NavLink>

                <ul className={openSeller ? "sub-nested" : "sub-nested hide"}>
                  <li>
                    <NavLink
                      to="/admin/seller"
                      className={({ isActive }) =>
                        isActive ? "sub-category" : ""
                      }
                    >
                      <Icon icon="bi:dot" className="product-icon" />
                      <p>List Seller</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/add-seller"
                      className={({ isActive }) =>
                        isActive ? "sub-category" : ""
                      }
                    >
                      <Icon icon="bi:dot" className="product-icon" />
                      <p>Add Seller</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/change/seller-code"
                      className={({ isActive }) =>
                        isActive ? "sub-category" : ""
                      }
                    >
                      <Icon icon="bi:dot" className="product-icon" />
                      <p>Edit Seller Code</p>
                    </NavLink>
                  </li>
                </ul>
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
