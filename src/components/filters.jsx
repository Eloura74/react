import React from "react";
import { motion } from "framer-motion";

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const getButtonClass = (filterName) => {
    const baseClasses = "px-4 py-2 rounded-full transition-colors font-memoirs";
    return `${baseClasses} ${
      currentFilter === filterName
        ? "bg-[#9ca3af] text-[#14142B]"
        : "bg-[#1F1F3D] text-white hover:bg-[#2D2D4D]"
    }`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-4xl text-gray-50 font-memoirs [text-shadow:_0_1px_0_rgba(1_1_1_/_80%)]">
          Trier par :
        </h2>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange("recent")}
            className={getButtonClass("recent")}
          >
            Plus récent
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange("like")}
            className={getButtonClass("like")}
          >
            Plus populaire
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange("difficult")}
            className={getButtonClass("difficult")}
          >
            Plus difficile
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
