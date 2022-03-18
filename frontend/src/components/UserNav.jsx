import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../styles/userNav.scss";
const UserNav = ({ current }) => {
  return (
    <div className="user-nav-container">
      <ul>
        <Link to="/profile">
          <li className={current === "profile" ? "current-tab" : ""}>
            <Icon icon="ant-design:user-outlined" className="profile-icon" />
            <p>My Profile</p>
          </li>
        </Link>
        <Link to="/orders">
          <li className={current === "orders" ? "current-tab" : ""}>
            <Icon icon="clarity:list-line" className="order-icon" />
            <p>My Orders</p>
          </li>
        </Link>
        <Link to="/cart">
          <li>
            <Icon icon="feather:shopping-cart" className="cart-icon" />
            <p>My Cart</p>
          </li>
        </Link>
        <Link to="/reviews">
          <li>
            <Icon icon="codicon:star-half" className="review-icon" />
            <p>My Reviews</p>
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

export default UserNav;
