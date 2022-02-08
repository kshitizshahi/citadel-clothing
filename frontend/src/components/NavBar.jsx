import SearchBar from "./SearchBar";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const NavBar = () => {
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
          <div className="search">
            <SearchBar />
          </div>
        </ul>
      </div>
      <div className="icons">
        <Link to="/profile">
          <Icon icon="ant-design:user-outlined" className="profile-icon" />
        </Link>
        <Link to="/cart">
          <Icon icon="feather:shopping-cart" className="cart-icon" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
