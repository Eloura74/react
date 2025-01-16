// Importation des dépendances nécessaires
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetail from "./components/RecipeDetail";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import useRecipes from "./hooks/useRecipes";

// Composant principal de l'application
function App() {
  // Utilisation de notre hook personnalisé pour gérer les recettes
  const { recipes, loading, addRecipe, deleteRecipe, updateRecipe } =
    useRecipes();

  const [showScrollTop, setShowScrollTop] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    sort: "recent"
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "All",
      sort: "recent"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Affichage d'un message de chargement si les données ne sont pas encore prêtes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#14142B] text-white">
        Chargement...
      </div>
    );
  }

  return (
    // Configuration du routeur pour la navigation
    <Router>
      {/* Conteneur principal avec fond dégradé */}
      <div className="min-h-screen flex flex-col bg-[#14142B]">
        {/* Barre de navigation */}
        <Navbar onHomeClick={resetFilters} />

        {/* Conteneur principal pour le contenu */}
        <Routes>
          {/* Page d'accueil : liste des recettes */}
          <Route
            path="/"
            element={
              <div className="flex-1">
                <div 
                  className="relative w-full h-48 flex flex-col items-center justify-center bg-cover bg-center"
                  style={{
                    backgroundImage: 'url("/images/bandeauV2.png")',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundBlendMode: 'overlay'
                  }}
                >
                  <h1 className="text-4xl font-bold text-[#00FF66] z-10 mb-2">Découvrez nos recettes</h1>
                  <p className="text-xl text-white z-10">Explorez notre collection de délicieuses recettes</p>
                </div>
                <div className="container mx-auto px-4 py-8 -mt-8">
                  <div className="bg-[#1F1F3D] rounded-lg p-6 shadow-xl">
                    <RecipeGrid recipes={recipes} filters={filters} setFilters={setFilters} />
                  </div>
                </div>
              </div>
            }
          />

          {/* Page de détail d'une recette */}
          <Route
            path="/recipe/:id"
            element={<RecipeDetail recipes={recipes} />}
          />

          {/* Dashboard d'administration */}
          <Route
            path="/dashboard"
            element={
              <Dashboard
                recipes={recipes}
                onAddRecipe={addRecipe}
                onDeleteRecipe={deleteRecipe}
              />
            }
          />
        </Routes>

        {/* Pied de page */}
        <Footer />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-4 bg-[#00FF66] text-[#14142B] rounded-full shadow-lg hover:bg-[#00CC52] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

// Exportation du composant
export default App;
