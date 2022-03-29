import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/thunkApi/authApi";
import SearchBar from "./SearchBar";
import { BASE_URL } from "../utils/BaseUrl";
import { NavLink } from "react-router-dom";
import "../styles/main.scss";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { isLoggedIn, userInfo, isAdmin } = useSelector(
    (state) => state.authUser
  );

  const [openNav, setOpenNav] = useState(false);

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    dispatch(logoutUser({}));
    navigate("/");
  };

  useEffect(() => {
    window
      .matchMedia("(max-width: 1000px)")
      .addEventListener("change", (e) => setMatches(e.matches));

    return () => {
      setMatches({});
      window.removeEventListener("change", null);
    };
  }, []);

  const showNav = (e) => {
    setOpenNav(!openNav);
  };

  return (
    <div className="navigation-bar">
      <div className="logo">
        <Link to="/">
          <h2 className="heading">CITADEL</h2>
        </Link>
      </div>
      <div className="navigation-items">
        {matches && (
          <div
            className="navigation-side-bar"
            style={{ width: openNav ? "20rem" : "0" }}
          >
            {openNav && (
              <div className={"close"}>
                <Icon icon="ci:close-big" id="cancel-btn" onClick={showNav} />
              </div>
            )}

            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/women"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Women
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/men"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/kid"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Kid
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {matches ? (
          <Icon
            icon="charm:menu-hamburger"
            onClick={showNav}
            className="toggle-navbar"
          />
        ) : (
          <ul className="menus">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/women"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Women
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/men"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Men
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/kid"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Kid
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact Us
              </NavLink>
            </li>
            <div className="nav-search">
              <SearchBar placeholder="Search here" />
            </div>
          </ul>
        )}
      </div>

      {!matches && (
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
                    {isAdmin && (
                      <Link to="/admin/dashboard">
                        <li>Dashboard</li>
                      </Link>
                    )}
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
      )}
    </div>
  );
};

export default NavBar;
