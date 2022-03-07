import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/thunkApi/authApi";
import SearchBar from "./SearchBar";
import { BASE_URL } from "../utils/BaseUrl";
import "../styles/main.scss";

const NavBar = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    dispatch(logoutUser({}));
    navigate("/");
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
          {userInfo ? (
            <div className="profile-image-container">
              <img
                className="profile-image"
                src={`${BASE_URL}/${userInfo.profileImage}`}
                alt="Profile Picture"
              />
              {/* <p>{userInfo.firstName}</p> */}
            </div>
          ) : (
            <Icon icon="ant-design:user-outlined" className="profile-icon" />
          )}

          <div className="dropdown-content-wrap">
            <ul className="dropdown-content">
              {isLoggedIn ? (
                <div>
                  <Link to="/profile">
                    <li>Profile</li>
                  </Link>
                  <li onClick={logoutHandler}>Logout</li>
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
