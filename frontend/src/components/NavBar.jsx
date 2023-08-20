import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/thunkApi/authApi";
import SearchBar from "./SearchBar";
import { BASE_URL, SEARCH_PRODUCTS } from "../utils/BaseUrl";
import { NavLink } from "react-router-dom";
import "../styles/main.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
  const { isLoggedIn, userInfo, isAdmin, isSeller } = useSelector(
    (state) => state.authUser
  );

  const [openNav, setOpenNav] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [searchData, setSearchData] = useState([]);

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    dispatch(logoutUser({}));
    navigate("/");
  };

  const keywordsChange = (e) => {
    setKeywords(e.target.value);
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

  if (matches && openNav) {
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.height = "";
    document.body.style.overflow = "";
  }

  useEffect(() => {
    let mounted = true;
    if (keywords.length > 0) {
      (async function () {
        try {
          const response = await axios.get(`${SEARCH_PRODUCTS}/${keywords}`);
          if (mounted) {
            setSearchData(response.data.product);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    }

    return () => {
      mounted = false;
      setSearchData(null);
    };
  }, [keywords]);

  return (
    <div className="hero">
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
                    to="/cart"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Cart
                  </NavLink>
                </li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Profile
                      </NavLink>
                    </li>

                    {isAdmin && (
                      <li>
                        <NavLink
                          to="/admin/dashboard"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}
                    {isSeller && (
                      <li>
                        <NavLink
                          to="/seller/dashboard"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <Link to="#" onClick={logoutHandler}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
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
              <div className="nav-search search-dropdown">
                <SearchBar
                  placeholder="Search here"
                  onChange={keywordsChange}
                />
                {searchData?.length > 0 && (
                  <div className="dropdown-content-wrap">
                    <ul className="dropdown-content">
                      <div>
                        {searchData.map((elem) => (
                          <div>
                            <a href={`/product/${elem._id}`}>
                              <li>{elem.name}</li>
                            </a>
                          </div>
                        ))}
                      </div>
                    </ul>
                  </div>
                )}
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
                    alt=""
                  />
                </div>
              ) : (
                <Icon
                  icon="ant-design:user-outlined"
                  className="profile-icon"
                />
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
                      {isSeller && (
                        <Link to="/seller/dashboard">
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
    </div>
  );
};

export default NavBar;
