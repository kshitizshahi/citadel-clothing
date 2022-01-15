import SearchBar from "./SearchBar";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navigationBar">
      <div className="logo">
        <h2>LOGO</h2>
      </div>
      <ul className="menus">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Shop</li>
        <li>Women</li>
        <li>Men</li>
        <li>Kid</li>
        <li>Contact Us</li>
        <li>
          <SearchBar />
        </li>
      </ul>
      <div className="icons">
        <Link to="/profile">
          <Icon icon="ant-design:user-outlined" className="profileIcon" />
        </Link>
        <Link to="/cart">
          <Icon icon="feather:shopping-cart" className="cartIcon" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
