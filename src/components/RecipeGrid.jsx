import React from "react";
import RecipeCard from "./RecipeCard";
import FilterBar from "./FilterBar";
import useRecipes from "../hooks/useRecipes";

const RecipeGrid = ({ filters, setFilters }) => {
  const { recipes } = useRecipes();

  // Appliquer les filtres
  let displayedRecipes = [...recipes];

  // Filtrer par recherche
  if (filters.search.trim()) {
    const search = filters.search.toLowerCase().trim();
    displayedRecipes = displayedRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(search)
    );
  }

  // Filtrer par catégorie
  if (filters.category !== "All") {
    displayedRecipes = displayedRecipes.filter(
      (recipe) => recipe.category === filters.category
    );
  }

  // Appliquer le tri
  displayedRecipes.sort((a, b) => {
    switch (filters.sort) {
      case "recent":
        return new Date(b.date || 0) - new Date(a.date || 0);
      case "popular":
        const scoreA = (a.views || 0) + (a.likes || 0) * 2;
        const scoreB = (b.views || 0) + (b.likes || 0) * 2;
        return scoreB - scoreA;
      case "difficulty-asc":
        return (a.difficulty || 0) - (b.difficulty || 0);
      case "difficulty-desc":
        return (b.difficulty || 0) - (a.difficulty || 0);
      case "time":
        const getTime = (recipe) => {
          const prep = parseInt(recipe.prepTime) || 0;
          const cook = parseInt(recipe.cookTime) || 0;
          return prep + cook;
        };
        return getTime(a) - getTime(b);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="flex-1 px-4 py-2 rounded bg-[#14142B] border border-gray-600 text-white focus:outline-none focus:border-[#00FF66]"
        />
        <button
          onClick={() => {
            localStorage.removeItem("recipes");
            window.location.reload();
          }}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Réinitialiser
        </button>
      </div>

      <FilterBar
        currentFilter={filters.sort}
        onFilterChange={(sort) => setFilters({ ...filters, sort })}
        selectedCategory={filters.category}
        onCategoryChange={(category) => setFilters({ ...filters, category })}
      />

      {displayedRecipes.length === 0 ? (
        <div className="text-white text-center py-8">
          {filters.search 
            ? `Aucune recette ne correspond à "${filters.search}"`
            : "Aucune recette ne correspond aux critères sélectionnés"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.imageUrl}
              category={recipe.category}
              difficulty={recipe.difficulty}
              description={recipe.description}
              views={recipe.views}
              likes={recipe.likes}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
              date={recipe.date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;
