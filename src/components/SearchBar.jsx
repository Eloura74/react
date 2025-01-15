import React from 'react';

const SearchBar = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
