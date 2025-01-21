// import React from "react";
import { motion } from "framer-motion"; // import de framer motion pour l'animation
import SearchBar from "./SearchBar"; // import du composant SearchBar
import PropTypes from "prop-types"; // pour rendre le debug plus facile et verifier que les proprietes sont bien passes

// composant FilterBar
const FilterBar = ({ currentFilter, onFilterChange, onSearch }) => {
  // Style a appliquer aux boutons
  const getButtonClass = (filterName) => {
    const baseClasses = "px-4 py-2 rounded-full transition-colors font-memoirs";
    return `${baseClasses} ${
      // classe de base si le filtre actuel est le filtre actuel, sinon ajouter la classe "bg-[#1F1F3D] text-white hover:bg-[#2D2D4D]"
      currentFilter === filterName
        ? "bg-[#9ca3af] text-[#14142B]"
        : "bg-[#1F1F3D] text-white hover:bg-[#2D2D4D]"
    }`;
  };

  return (
    <section className="container mx-auto p-6 pl-4 sm:pl-0 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* search bar */}
          <div className="w-64 ml-24">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
        {/* Filtres */}
        <article className=" flex justify-center items-center gap-4 w-full mr-4 sm:w-auto">
          <h2 className="text-4xl text-gray-150 mb-2 font-memoirs [text-shadow:_0_1px_0_rgba(1_1_1_/_80%)]">
            Trier par :
          </h2>
          {/* plus recent */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange("recent")}
              className={getButtonClass("recent")}
            >
              Plus récent
            </motion.button>
            {/* plus populaire */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange("like")}
              className={getButtonClass("like")}
            >
              Plus populaire
            </motion.button>
            {/* plus difficile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange("difficult")}
              className={getButtonClass("difficult")}
            >
              Plus difficile
            </motion.button>
          </div>
        </article>
      </div>
    </section>
  );
};
// ______________________________________________________________________________
// ______________________________________________________________________________
// Prop-types pour rendre le debug plus facile et verifier que les proprietes sont bien passes
FilterBar.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default FilterBar;
