import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/sideBar.scss";
import { useState } from "react";

const SideBar = ({ current, select }) => {
  const [openProduct, setOpenProduct] = useState(false);

  return (
    <div className="admin-sidebar-container">
      <div className="container">
        <p className="heading">Admin Dashboard</p>

        <ul className="ul-items">
          <li>
            <Link
              to="/admin/dashboard"
              className={current === "dashboard" ? "current-tab" : ""}
            >
              <Icon icon="radix-icons:dashboard" className="dashboard-icon" />
              <p>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/category"
              className={current === "category" ? "current-tab" : ""}
            >
              <Icon
                icon="mdi:format-list-bulleted-type"
                className="category-icon"
              />
              <p>Category</p>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/sub-category"
              className={current === "subCategory" ? "current-tab" : ""}
            >
              <Icon
                icon="icon-park-outline:difference-set"
                className="sub-category-icon"
              />
              <p>Sub Category</p>
            </Link>
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
              <Link
                to="/admin/product"
                className={current === "product" ? "sub-category" : ""}
              >
                <Icon icon="bi:dot" className="product-icon" />
                <p>List Products</p>
              </Link>
              <li>
                <Link
                  to="/admin/add-product"
                  className={current === "addProduct" ? "sub-category" : ""}
                >
                  <Icon icon="bi:dot" className="product-icon" />
                  <p>Add Product</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/edit-product"
                  className={current === "editProduct" ? "sub-category" : ""}
                >
                  <Icon icon="bi:dot" className="product-icon" />
                  <p>Edit Product</p>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/admin/order"
              className={current === "orders" ? "current-tab" : ""}
            >
              <Icon icon="clarity:list-line" className="order-icon" />
              <p>Orders</p>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={current === "users" ? "current-tab" : ""}
            >
              <Icon icon="ant-design:user-outlined" className="user-icon" />
              <p>Users</p>
            </Link>
          </li>
          <li>
            <Link to="/logout">
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
