import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const SearchBar = () => {
  return (
    <div className="searchBar">
      <input className="searchInput" placeholder="Search here" />
      <Link to="/test">
        <Icon icon="bx:bx-search" className="searchIcon" />
      </Link>
    </div>
  );
};

export default SearchBar;
