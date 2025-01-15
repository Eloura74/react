// Importation des hooks React et composants nécessaires
import React, { useState, useMemo } from "react";
import RecipeCard from "./RecipeCard";
import FilterBar from "./FilterBar";

// Composant principal qui affiche la grille des recettes
const RecipeGrid = ({ recipes }) => {
  // États locaux pour gérer les filtres
  const [currentFilter, setCurrentFilter] = useState("recent");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fonction pour calculer la popularité (basée sur les vues et les likes)
  const getPopularityScore = (recipe) => {
    return (recipe.views || 0) + (recipe.likes || 0) * 2;
  };

  // useMemo pour optimiser le filtrage et le tri des recettes
  const filteredAndSortedRecipes = useMemo(() => {
    if (!recipes || recipes.length === 0) {
      return [];
    }

    // Filtrage par catégorie
    let filtered = [...recipes];
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (recipe) => recipe.category === selectedCategory
      );
    }

    // Application du tri selon le filtre sélectionné
    switch (currentFilter) {
      case "recent":
        // Tri par date de création (plus récent en premier)
        return filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

      case "popular":
        // Tri par popularité (vues + likes)
        return filtered.sort(
          (a, b) => getPopularityScore(b) - getPopularityScore(a)
        );

      case "difficulty-asc":
        // Tri par difficulté croissante (facile à difficile)
        return filtered.sort((a, b) => a.difficulty - b.difficulty);

      case "difficulty-desc":
        // Tri par difficulté décroissante (difficile à facile)
        return filtered.sort((a, b) => b.difficulty - a.difficulty);

      case "time":
        // Tri par temps de préparation
        return filtered.sort((a, b) => {
          const timeA = (a.prepTime || 0) + (a.cookTime || 0);
          const timeB = (b.prepTime || 0) + (b.cookTime || 0);
          return timeA - timeB;
        });

      default:
        return filtered;
    }
  }, [recipes, currentFilter, selectedCategory]);

  // Si aucune recette n'est disponible
  if (!recipes || recipes.length === 0) {
    return <div className="text-white text-center">No recipes found</div>;
  }

  // Rendu du composant
  return (
    <div>
      {/* Barre de filtres avec les options de tri et de catégorie */}
      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Message si aucune recette ne correspond aux filtres */}
      {filteredAndSortedRecipes.length === 0 ? (
        <div className="text-white text-center py-8">
          No recipes match the selected criteria
        </div>
      ) : (
        /* Grille des recettes filtrées et triées */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.imageUrl}
              category={recipe.category}
              difficulty={recipe.difficulty}
              description={recipe.description}
              createdAt={recipe.createdAt}
              views={recipe.views}
              likes={recipe.likes}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;
