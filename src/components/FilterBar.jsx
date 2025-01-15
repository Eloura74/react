// Importation de React
import React from "react";

// FilterBar component that displays filtering and sorting options
const FilterBar = ({
  currentFilter,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
}) => {
  // List of available categories
  const categories = [
    "All",
    "Appetizer",
    "Main Course",
    "Dessert",
    "Drink",
    "Snack",
  ];

  // Helper function for filter button classes
  const getButtonClass = (filterName) => {
    const baseClasses = "px-4 py-2 rounded-full transition-colors";
    return `${baseClasses} ${
      currentFilter === filterName
        ? "bg-[#00FF66] text-[#14142B]"
        : "bg-[#1F1F3D] text-white hover:bg-[#2D2D4D]"
    }`;
  };

  // Helper function for category selector classes
  const getCategoryClass = (category) => {
    const baseClasses =
      "px-4 py-2 rounded-full text-sm transition-colors cursor-pointer";
    return `${baseClasses} ${
      selectedCategory === category
        ? "bg-[#00FF66] text-[#14142B]"
        : "bg-[#1F1F3D] text-white hover:bg-[#2D2D4D]"
    }`;
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Main filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-xl text-white">Sort by :</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onFilterChange("recent")}
            className={getButtonClass("recent")}
          >
            Most recent
          </button>
          <button
            onClick={() => onFilterChange("popular")}
            className={getButtonClass("popular")}
          >
            Popular
          </button>
          <button
            onClick={() => onFilterChange("difficulty-asc")}
            className={getButtonClass("difficulty-asc")}
          >
            Easy to difficult
          </button>
          <button
            onClick={() => onFilterChange("difficulty-desc")}
            className={getButtonClass("difficulty-desc")}
          >
            Difficult to easy
          </button>
          <button
            onClick={() => onFilterChange("time")}
            className={getButtonClass("time")}
          >
            Preparation time
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-xl text-white">Categories :</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              onClick={() => onCategoryChange(category)}
              className={getCategoryClass(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
