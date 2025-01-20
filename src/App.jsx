import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "./custom.css";
import Navbar from "./components/navbar";
import FilterBar from "./components/filters";
import RecipeDetails from "./components/recipeDetails";
import Recipes from "../public/recettes.json";
import { Link } from "react-router-dom";

function App() {
  const [recipes, definirRecettes] = useState([]);
  const [filteredRecipes, recettesFiltres] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("recent");

  // Charger les recettes
  useEffect(() => {
    definirRecettes(Recipes);
    recettesFiltres(Recipes);
  }, []);

  // Gérer les changements de filtre
  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
    let sorted = [...recipes];

    if (filterType === "recent") {
      // Tri par ID (supposant que les IDs plus élevés sont plus récents)
      sorted = sorted.sort((a, b) => b.id.localeCompare(a.id));
    } else if (filterType === "like") {
      // Tri par nombre de likes
      sorted = sorted.sort((a, b) => b.likes - a.likes);
    }

    recettesFiltres(sorted);
  };

  const HomePage = () => (
    <>
      <Navbar accueilOnClick={() => {}} />
      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
      />
      {/* Recettes */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {filteredRecipes.map((recipe) => (
          <article
            key={recipe.id}
            className="bgCard rounded-lg shadow-lg p-4 cursor-pointer hoverEffect"
          >
            <h3 className="text-4xl font-memoirs mb-2 text-center">
              {recipe.title}
            </h3>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="mb-2 rounded-lg object-cover w-[400px] h-[400px] mx-auto shadow-lg hover:shadow-xl hover:shadow-cyan-500/50"
            />
            <div className="text-left">
              <p className="text-gray-700 font-memoirs text-xl">
                Difficulté: {"⭐".repeat(recipe.difficulty)}
              </p>
              <hr />
              <p className="text-gray-600 font-memoirs">
                ⏲ Temps de preparation: {recipe.prepTime} minutes
              </p>
              <p className="text-gray-600 font-memoirs">
                <span className="text-red-500 text-xl"> ❤</span> Likes:{" "}
                {recipe.likes}
              </p>
              <p className="text-gray-600 font-memoirs">
                👀 Views: {recipe.views}
              </p>
              <hr />
            </div>
            <div>
              <p className="text-gray-700 font-memoirs text-xl min-h-[100px]">
                {recipe.description}
              </p>
              <hr />
              <p className="text-gray-600 font-memoirs text-xs text-right">
                Recette par: {recipe.author}
              </p>
              <p className="text-gray-600 font-memoirs text-xs text-right">
                Date de publication: {recipe.date}
              </p>
            </div>
            <Link
              to={`/recipe/${recipe.id}`}
              className="bg-[#353549] text-gray-50 text-2xl font-memoirs rounded-full px-4 py-2 hover:bg-[#343437] transition-colors shadow-lg hover:shadow-cyan-500/50 mt-4 inline-block"
            >
              Voir la recette
            </Link>
          </article>
        ))}
      </section>
    </>
  );

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-bodyBgStart via-bodyBgMid to-bodyBgEnd">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/recipe/:id"
          element={<RecipeDetails recipes={recipes} />}
        />
      </Routes>
    </main>
  );
}

export default App;
