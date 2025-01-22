// import React from 'react';
import PropTypes from "prop-types";

// ______________________________________________________________________________
// ______________________________________________________________________________
// Composant de fonctions de filtrage
const FilterFunctions = () => {
  // Fonction de recherche
  const recherche = (term, recipesList) => {
    // Copie des recettes
    let filtered = [...recipesList];
    
    // Si un terme de recherche existe, filtrer les recettes
    if (term) {
      filtered = filtered.filter((recipe) =>
        
        recipe.title.toLowerCase().includes(term.toLowerCase()) 
        
      );
    }
    
    return filtered;
  };

  // Fonction de filtrage et tri
  const filterChange = (filterType, recipesList, term) => {
    // Copie des recettes
    let trier = [...recipesList];

    // Appliquer d'abord le filtre de recherche si un terme existe
    if (term) {
      trier = recherche(term, trier);
    }

    // Appliquer ensuite le tri selon le type
    switch (filterType) {
      case "recent":
        // Trier par date
        trier = trier.sort((a, b) => {
          const dateA = new Date(a.date); // Convertir la date en objet Date
          const dateB = new Date(b.date); 
          return dateB - dateA;
        });
        break;
      case "like":
        // Trier par likes
        trier = trier.sort((a, b) => b.likes - a.likes);
        break;
      case "difficult":
        // Trier par difficulté
        trier = trier.sort((a, b) => b.difficulty - a.difficulty);
        break;
      default:
        break;
    }

    return trier;
  };

  return { recherche, filterChange };
};

// ______________________________________________________________________________
// Prop-types pour la validation des props
// FilterFunctions.propTypes = {
//   recipes: PropTypes.array.isRequired,
//   searchTerm: PropTypes.string.isRequired,
// };

export default FilterFunctions;
