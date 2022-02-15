import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import "../styles/main.scss";

const NavBar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="navigation-bar">
      <div className="logo">
        <Link to="/">
          <h2 className="heading">CITADEL</h2>
        </Link>
      </div>
      <div className="navigation-items">
        <ul className="menus">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/women">Women</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li>
          <li>
            <Link to="/kid">Kid</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <div className="nav-search">
            <SearchBar />
          </div>
        </ul>
      </div>
      <div className="nav-icons">
        <div className="profile-dropdown">
          <Icon icon="ant-design:user-outlined" className="profile-icon" />
          <ul className="dropdown-content">
            {userInfo ? (
              <div>
                <Link to="/profile">
                  <li>Profile</li>
                </Link>
                <li onClick={(e) => logoutHandler()}>Logout</li>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <li>Login</li>
                </Link>
                <Link to="/register">
                  <li>Register</li>
                </Link>
              </div>
            )}
          </ul>
        </div>
        <div className="cart">
          <Link to="/cart">
            <Icon icon="feather:shopping-cart" className="cart-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
