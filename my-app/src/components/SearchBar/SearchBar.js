// SearchBar.js
import React from "react";
// import "./SearchBar.css";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Buscar por nombre..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;