import { useState } from "react";
import PropTypes from "prop-types";
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-1/2 sm:w-[1000px] max-w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Rechercher une recette..."
        className=" shadow-gray-700 border-b-2 border-gray-400 w-full px-4 py-2 rounded-full bg-white bg-opacity-80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg hover:shadow-xl hover:shadow-gray-700 transition-all duration-300 font-memoirs"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
