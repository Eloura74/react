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

  // Charger les recettes au chargement du composant qu'une seule fois
  useEffect(() => {
    setRecipes(Recipes); // initialisationd es rectete
    setFilteredRecipes(Recipes); // prepa filtrage
  }, []);

  // Fonction pour filtrer les recettes en fonction du terme de recherche et du filtre actuel
  const handleSearch = (term) => {
    // Mettre à jour le terme de recherche
    setSearchTerm(term);
    // Copie des recettes
    let filtered = [...recipes];
    // Filtrer les recettes en fonction du terme de recherche
    if (term) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
    }
    // Trier les recettes en fonction du filtre actuel
    if (currentFilter === "recent") {
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.date); // Convertit la date de l'élément 'a' en objet Date
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    } else if (currentFilter === "like") {
      filtered = filtered.sort((a, b) => b.likes - a.likes); // Trier par likes
    } else if (currentFilter === "difficult") {
      filtered = filtered.sort((a, b) => b.difficulty - a.difficulty); // Trier par diff
    }

    setFilteredRecipes(filtered);
  };

  // Fonction pour changer le filtre
  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType); // mettre a jour le filtre actuel
    // Copie des recettes
    let sorted = [...recipes];

    if (searchTerm) {
      sorted = sorted.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // filtre pour Recent
    if (filterType === "recent") {
      sorted = sorted.sort((a, b) => {
        // trier par date
        const dateA = new Date(a.date); // Convertit la date de l'élément 'a' en objet Date
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      // filtre pour Like
    } else if (filterType === "like") {
      sorted = sorted.sort((a, b) => b.likes - a.likes); // trier par likes
      // filtre pour Difficulté
    } else if (filterType === "difficult") {
      sorted = sorted.sort((a, b) => b.difficulty - a.difficulty); // trier par difficulté
    }

    setFilteredRecipes(sorted);
  };

  return (
    <main className="flex flex-col min-h-screen bodyBg">
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route
          path="/"
          element={
            <Home
              recipes={filteredRecipes}
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
          }
        />
        {/* Route pour la page de détails */}
        <Route
          path="/recipe/:id"
          element={<RecipeDetails recipes={filteredRecipes} />}
        />
        {/* Route pour le tableau de bord */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
