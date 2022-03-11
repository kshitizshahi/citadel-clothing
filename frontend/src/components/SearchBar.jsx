import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const SearchBar = ({ placeholder }) => {
  return (
    <div className="search-bar">
      <input className="search-input" placeholder={placeholder} />
      {/* <Link to="/test"> */}
      <Icon icon="bx:bx-search" className="search-icon" />
      {/* </Link> */}
    </div>
  );
};

export default SearchBar;
