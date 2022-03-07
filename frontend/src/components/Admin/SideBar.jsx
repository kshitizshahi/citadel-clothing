import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/sideBar.scss";
const SideBar = ({ dashboard, category, product, order, users, height }) => {
  return (
    <div
      className="admin-sidebar-container"
      style={height && { height: height }}
    >
      <p className="heading">Citadel</p>
      <p className="sub-heading">Admin Dashboard</p>

      <ul>
        <Link to="/admin/dashboard">
          <li className={dashboard && "current-tab"}>
            <Icon icon="ant-design:user-outlined" className="profile-icon" />
            <p>Dashboard</p>
          </li>
        </Link>
        <Link to="/admin/category">
          <li className={category && "current-tab"}>
            <Icon icon="clarity:list-line" className="order-icon" />
            <p>Category</p>
          </li>
        </Link>
        <Link to="/admin/product">
          <li className={product && "current-tab"}>
            <Icon icon="feather:shopping-cart" className="cart-icon" />
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
            <Icon icon="codicon:star-half" className="review-icon" />
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
  );
};

export default SideBar;
