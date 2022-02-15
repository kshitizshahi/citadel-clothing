import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme } from "../redux/actions/themeActions";
import "../styles/footer.scss";

const Footer = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme);
  const { darkMode } = theme;

  if (darkMode) {
    document.body.classList.add("dark-mode");
  }

  const setDarkTheme = (e) => {
    e.preventDefault();
    dispatch(darkTheme(true));
    document.body.classList.add("dark-mode");
  };

  const setLightTheme = (e) => {
    e.preventDefault();
    dispatch(darkTheme(false));
    document.body.classList.remove("dark-mode");
  };
  return (
    <div className="footer-container">
      <div className="first-container">
        <div className="about">
          <div className="info">
            <p className="logo-heading">CITADEL</p>
            <p className="company-info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>
          <div className="site-theme">
            <p className="theme-heading">Site Theme</p>
            <button
              className="light-theme-btn"
              onClick={setLightTheme}
            ></button>
            <button className="dark-theme-btn" onClick={setDarkTheme}></button>
          </div>
        </div>
        <div className="footer-others">
          <div className="quick-links">
            <p className="links-heading">Quick Links</p>
            <ul>
              <Link to="/sell">
                <li>Sell</li>
              </Link>
              <Link to="/contact">
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>
          <div className="account">
            <p className="account-heading">Account</p>
            <ul>
              <Link to="/account">
                <li>My account</li>
              </Link>
            </ul>
          </div>
          <div className="products">
            <p className="product-heading">Products</p>
            <ul>
              <Link to="/women-fashion">
                <li>Women's Fashion</li>
              </Link>
              <Link to="/men-fashion">
                <li>Men's Fashion</li>
              </Link>
              <Link to="/kid-fashion">
                <li>Kid's Fashion</li>
              </Link>
            </ul>
          </div>
          <div className="follow">
            <p className="follow-heading">Follow Us On </p>
            <div className="footer-social-media">
              <a href="https://www.facebook.com/">
                <Icon
                  icon="akar-icons:facebook-fill"
                  className="facebook-icon"
                />
              </a>
              <a href="https://www.instagram.com/">
                <Icon
                  icon="akar-icons:instagram-fill"
                  className="instagram-icon"
                />
              </a>
              <a href="https://twitter.com/">
                <Icon icon="akar-icons:twitter-fill" className="twitter-icon" />
              </a>
              <a href="https://www.youtube.com/">
                <Icon icon="akar-icons:youtube-fill" className="youtube-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-container">
        <div className="copyright">
          <hr className="line" />
          <p>Copyright &#169; 2022 Citadel Clothing. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
