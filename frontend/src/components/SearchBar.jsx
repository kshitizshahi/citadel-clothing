import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const SearchBar = () => {
  return (
    <div className="search-bar">
      <input className="search-input" placeholder="Search here" />
      <Link to="/test">
        <Icon icon="bx:bx-search" className="search-icon" />
      </Link>
    </div>
  );
};

export default SearchBar;
