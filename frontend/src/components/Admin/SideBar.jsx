import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/sideBar.scss";
const SideBar = ({ dashboard, category, product, order, users }) => {
  return (
    <div className="admin-sidebar-container">
      <div className="container">
        <p className="heading">Admin Dashboard</p>

        <ul>
          <Link to="/admin/dashboard">
            <li className={dashboard && "current-tab"}>
              <Icon icon="radix-icons:dashboard" className="dashboard-icon" />
              <p>Dashboard</p>
            </li>
          </Link>
          <Link to="/admin/category">
            <li className={category && "current-tab"}>
              <Icon
                icon="mdi:format-list-bulleted-type"
                className="category-icon"
              />
              <p>Category</p>
            </li>
          </Link>
          <Link to="/admin/sub-category">
            <li className={category && "current-tab"}>
              <Icon
                icon="icon-park-outline:difference-set"
                className="sub-category-icon"
              />
              <p>Sub Category</p>
            </li>
          </Link>
          <Link to="/admin/product">
            <li className={product && "current-tab"}>
              <Icon
                icon="icon-park-outline:ad-product"
                className="product-icon"
              />
              <p>Products</p>
            </li>
          </Link>
          <Link to="/admin/order">
            <li className={order && "current-tab"}>
              <Icon icon="clarity:list-line" className="order-icon" />
              <p>Orders</p>
            </li>
          </Link>

          <Link to="/admin/users">
            <li className={users && "current-tab"}>
              <Icon icon="ant-design:user-outlined" className="user-icon" />
              <p>Users</p>
            </li>
          </Link>
          <Link to="/logout">
            <li>
              <Icon icon="clarity:sign-out-line" className="logout-icon" />
              <p>Logout</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
