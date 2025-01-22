// Import
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
// Styles
import "./styles/index.css";
import "./styles/custom.css";

// Pages
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Dashboard from "./pages/Dashboard";

// Data
import Recipes from "../public/recettes.json";

// Components
import FilterFunctions from "./components/filterFonct";

// ______________________________________________________________________________
// ______________________________________________________________________________
function App() {
  // const pour stocker les recettes
  const [recipes, setRecipes] = useState([]); // etat initial tab vide
  // const pour stocker les recettes filtrées
  const [filteredRecipes, setFilteredRecipes] = useState([]); // stocker les recettes filtrées
  // const pour stocker le filtre actuel
  const [currentFilter, setCurrentFilter] = useState("recent"); // stocker le filtre actuel
  // const pour stocker le terme de recherche
  const [searchTerm, setSearchTerm] = useState(""); // stocker le terme de recherche

  // Initialiser les fonctions de filtrage
  const { recherche, filterChange } = FilterFunctions();

  // Charger les recettes au chargement du composant qu'une seule fois
  useEffect(() => {
    setRecipes(Recipes); // initialisationd es rectete
    setFilteredRecipes(Recipes); // prepa filtrage
  }, []);

  // Gestionnaire de recherche
  const onSearch = (term) => {
    setSearchTerm(term);
    const filtered = recherche(currentFilter, recipes, term);
    setFilteredRecipes(filtered);
  };

  // Gestionnaire de changement de filtre
  const onFilterChange = (filterType) => {
    setCurrentFilter(filterType);
    const filtered = filterChange(filterType, recipes, searchTerm);
    setFilteredRecipes(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route
          path="/"
          element={
            <Home
              recipes={filteredRecipes}
              currentFilter={currentFilter}
              onFilterChange={onFilterChange}
              onSearch={onSearch}
            />
          }
        />
        {/* Route pour la page de détails */}
        <Route
          path="/recipe/:id"
          element={
            <RecipeDetails
              recipes={recipes}
            />
          }
        />
        {/* Route pour le tableau de bord */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
