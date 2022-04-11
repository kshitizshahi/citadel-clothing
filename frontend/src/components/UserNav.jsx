import { NavLink, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../styles/userNav.scss";
import { logoutUser } from "../redux/thunkApi/authApi";
import { useDispatch, useSelector } from "react-redux";
const UserNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.authUser);
  const { isLoggedIn } = user;

  const logoutHandler = (e) => {
    dispatch(logoutUser({}));
    navigate("/");
  };
  return (
    <div className="user-nav-container">
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "current-tab" : "")}
              >
                <Icon
                  icon="ant-design:user-outlined"
                  className="profile-icon"
                />
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
          </>
        )}

        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "current-tab" : "")}
          >
            <Icon icon="feather:shopping-cart" className="cart-icon" />
            <p>My Cart</p>
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              to="/reviews"
              className={({ isActive }) => (isActive ? "current-tab" : "")}
            >
              <Icon icon="codicon:star-half" className="review-icon" />
              <p>My Reviews</p>
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <Link to="/#" onClick={logoutHandler}>
              <Icon icon="clarity:sign-out-line" className="logout-icon" />
              <p>Logout</p>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserNav;
