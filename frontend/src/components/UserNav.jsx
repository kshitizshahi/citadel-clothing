import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../styles/userNav.scss";
const UserNav = () => {
  return (
    <div className="user-nav-container">
      <ul>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "current-tab" : "")}
          >
            <Icon icon="ant-design:user-outlined" className="profile-icon" />
            <p>My Profile</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "current-tab" : "")}
          >
            <Icon icon="clarity:list-line" className="order-icon" />
            <p>My Orders</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "current-tab" : "")}
          >
            <Icon icon="feather:shopping-cart" className="cart-icon" />
            <p>My Cart</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reviews"
            className={({ isActive }) => (isActive ? "current-tab" : "")}
          >
            <Icon icon="codicon:star-half" className="review-icon" />
            <p>My Reviews</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? "current-tab" : "")}
          >
            <Icon icon="clarity:sign-out-line" className="logout-icon" />
            <p>Logout</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
