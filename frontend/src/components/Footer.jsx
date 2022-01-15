import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
const Footer = () => {
  const [darkMode, setDarkMode] = useState(true);
  const darkTheme = (e) => {
    e.preventDefault();
    setDarkMode(true);
  };

  const lightTheme = (e) => {
    e.preventDefault();
    setDarkMode(false);
  };
  return (
    <div className={darkMode ? "container" : "light-container"}>
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
            <button className="light-theme" onClick={lightTheme}></button>
            <button className="dark-theme" onClick={darkTheme}></button>
          </div>
        </div>
        <div className="others">
          <div className={darkMode ? "quick-links" : "quick-links-light"}>
            <p className="links-heading">Quick Links</p>
            <Link to="/sell">
              <p>Sell</p>
            </Link>
            <Link to="/contact">
              <p>Contact Us</p>
            </Link>
          </div>
          <div className={darkMode ? "account" : "account-light"}>
            <p className="account-heading">Account</p>
            <Link to="/account">
              <p>My account</p>
            </Link>
          </div>
          <div className={darkMode ? "products" : "products-light"}>
            <p className="product-heading">Products</p>
            <Link to="/women-fashion">
              <p>Women's Fashion</p>
            </Link>
            <Link to="/men-fashion">
              <p>Men's Fashion</p>
            </Link>
            <Link to="/kid-fashion">
              <p>Kid's Fashion</p>
            </Link>
          </div>
          <div className="follow">
            <p className="follow-heading">Follow Us On </p>
            <div className="social-media">
              <a href="https://www.facebook.com/">
                <Icon
                  icon="akar-icons:facebook-fill"
                  className={darkMode ? "facebookIcon" : "facebookIcon-light"}
                />
              </a>
              <a href="https://www.instagram.com/">
                <Icon
                  icon="akar-icons:instagram-fill"
                  className={darkMode ? "instagramIcon" : "instagramIcon-light"}
                />
              </a>
              <a href="https://twitter.com/">
                <Icon
                  icon="akar-icons:twitter-fill"
                  className={darkMode ? "twitterIcon" : "twitterIcon-light"}
                />
              </a>
              <a href="https://www.youtube.com/">
                <Icon
                  icon="akar-icons:youtube-fill"
                  className={darkMode ? "youtubeIcon" : "youtubeIcon-light"}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="second-container">
        <div className="copyright">
          <hr className="line" />
          <p>Copyright &#169; 2022 Citadel Clothing. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
