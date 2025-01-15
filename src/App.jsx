// Importation des dépendances nécessaires
import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetail from "./components/RecipeDetail";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import useRecipes from "./hooks/useRecipes";

// Composant principal de l'application
function App() {
  // Utilisation de notre hook personnalisé pour gérer les recettes
  const { recipes, loading, addRecipe, deleteRecipe, updateRecipe } = useRecipes();

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
        <Navbar />
        
        {/* Conteneur principal pour le contenu */}
        <Routes>
          {/* Page d'accueil : liste des recettes */}
          <Route 
            path="/" 
            element={
              <div className="flex-1">
                <div className="bg-gradient-to-r from-green-500 to-yellow-500 py-12">
                  <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-4">
                      Découvrez nos recettes
                    </h1>
                    <p className="text-white text-lg">
                      Explorez notre collection de délicieuses recettes
                    </p>
                  </div>
                </div>
                <div className="container mx-auto px-4 py-8 -mt-8">
                  <div className="bg-[#1F1F3D] rounded-lg p-6 shadow-xl">
                    <RecipeGrid recipes={recipes} />
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
      </div>
    </Router>
  );
}

// Exportation du composant
export default App;
