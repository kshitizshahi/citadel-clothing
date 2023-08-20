import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import "../styles/footer.scss";

const Footer = () => {
  const darkMode = JSON.parse(localStorage.getItem("darkTheme"));

  if (darkMode) {
    document.documentElement.setAttribute("theme", "dark");
  }

  const setDarkTheme = (e) => {
    e.preventDefault();
    document.documentElement.setAttribute("theme", "dark");
    localStorage.setItem("darkTheme", true);
  };

  const setLightTheme = (e) => {
    e.preventDefault();
    document.documentElement.removeAttribute("theme");
    localStorage.setItem("darkTheme", false);
  };
  return (
    <div className="footer-container">
      <div className="container">
        <div className="first-container">
          <div className="about">
            <div className="info none">
              <p className="logo-heading">CITADEL</p>
              <p className="company-info">
                Citadel Clothing is a business that prides itself on offering
                high-quality merchandise at an affordable price. The shop
                categorizes the products to make it easier for customers to
                purchase them.
              </p>
            </div>
            <div className="site-theme">
              <p className="theme-heading">Site Theme</p>
              <button
                className="light-theme-btn"
                onClick={setLightTheme}
              ></button>
              <button
                className="dark-theme-btn"
                onClick={setDarkTheme}
              ></button>
            </div>
          </div>
          <div className="footer-others">
            <div className="quick-links none">
              <p className="links-heading">Quick Links</p>
              <ul>
                <Link to="/register">
                  <li>Sell</li>
                </Link>
                <Link to="/contact-us">
                  <li>Contact Us</li>
                </Link>
              </ul>
            </div>
            <div className="account none">
              <p className="account-heading">Account</p>
              <ul>
                <Link to="/profile">
                  <li>My account</li>
                </Link>
              </ul>
            </div>
            <div className="products none">
              <p className="product-heading">Products</p>
              <ul>
                <Link to="/women">
                  <li>Women's Fashion</li>
                </Link>
                <Link to="/men">
                  <li>Men's Fashion</li>
                </Link>
                <Link to="/kid">
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
                  <Icon
                    icon="akar-icons:twitter-fill"
                    className="twitter-icon"
                  />
                </a>
                <a href="https://www.youtube.com/">
                  <Icon
                    icon="akar-icons:youtube-fill"
                    className="youtube-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-container">
          <div className="copyright">
            <hr className="line" />
            <p>Copyright &#169; 2023 Citadel Clothing. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
