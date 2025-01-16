// Importation de React
import React from "react";
import { motion } from "framer-motion";

// Composant FilterBar qui affiche les options de filtrage et de tri
const FilterBar = ({
  currentFilter,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
  stats,
}) => {
  // Liste des categories disponibles
  const categories = ["All", "Snack", "Divers", "Salade", "Soupe", "Dessert"];

  // Fonction d'assistance pour les classes de boutons de filtre
  const getButtonClass = (filterName) => {
    const baseClasses = "px-4 py-2 rounded-full transition-colors";
    return `${baseClasses} ${
      currentFilter === filterName
        ? "bg-[#00FF66] text-[#14142B]"
        : "bg-[#1F1F3D] text-white hover:bg-[#2D2D4D]"
    }`;
  };

  // Fonction d'assistance pour les classes de boutons de sélection de category
  const getCategoryClass = (category) => {
    const baseClasses =
      "px-4 py-2 rounded-full text-sm transition-colors cursor-pointer flex items-center gap-2";
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
        <h2 className="text-xl text-white">Trier par :</h2>
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
            onClick={() => onFilterChange("popular")}
            className={getButtonClass("popular")}
          >
            Populaire
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange("difficulty-asc")}
            className={getButtonClass("difficulty-asc")}
          >
            Facile à difficile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange("difficulty-desc")}
            className={getButtonClass("difficulty-desc")}
          >
            Difficile à facile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange("time")}
            className={getButtonClass("time")}
          >
            Temps de préparation
          </motion.button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-xl text-white">Catégories :</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.span
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category)}
              className={getCategoryClass(category)}
            >
              {category}
              {category !== "All" && stats?.recipesByCategory?.[category] && (
                <span className="bg-[#14142B] px-2 py-1 rounded-full text-xs">
                  {stats.recipesByCategory[category]}
                </span>
              )}
              {category === "All" && stats?.totalRecipes && (
                <span className="bg-[#14142B] px-2 py-1 rounded-full text-xs">
                  {stats.totalRecipes}
                </span>
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
