import { Icon } from "@iconify/react";
const SearchBar = ({ placeholder, onChange }) => {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder={placeholder}
        // onChange={onChange}
        // onKeyUp={onChange}
        onKeyUpCapture={onChange}
      />

      <Icon icon="bx:bx-search" className="search-icon" />
    </div>
  );
};

export default SearchBar;
