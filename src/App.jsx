import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
// Styles
import "./styles/index.css";
import "./styles/custom.css";

// Pages
import Home from "./pages/home";
import RecipeDetails from "./pages/RecipeDetails";

// Data
import Recipes from "../public/recettes.json";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("recent");

  useEffect(() => {
    setRecipes(Recipes);
    setFilteredRecipes(Recipes);
  }, []);

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
    let sorted = [...recipes];

    if (filterType === "recent") {
      sorted = sorted.sort((a, b) => b.id.localeCompare(a.id));
    } else if (filterType === "like") {
      sorted = sorted.sort((a, b) => b.likes - a.likes);
    } else if (filterType === "difficult") {
      sorted = sorted.sort((a, b) => b.difficulty - a.difficulty);
    }

    setFilteredRecipes(sorted);
  };

  return (
    <main className="flex flex-col min-h-screen bodyBg">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              recipes={filteredRecipes}
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
            />
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <RecipeDetails
              recipes={filteredRecipes}
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
