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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setRecipes(Recipes);
    setFilteredRecipes(Recipes);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    let filtered = [...recipes];

    if (term) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (currentFilter === "recent") {
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    } else if (currentFilter === "like") {
      filtered = filtered.sort((a, b) => b.likes - a.likes);
    } else if (currentFilter === "difficult") {
      filtered = filtered.sort((a, b) => b.difficulty - a.difficulty);
    }

    setFilteredRecipes(filtered);
  };

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
    let sorted = [...recipes];

    if (searchTerm) {
      sorted = sorted.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType === "recent") {
      sorted = sorted.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
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
              onSearch={handleSearch}
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
