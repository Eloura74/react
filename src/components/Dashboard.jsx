// Importation des dépendances nécessaires
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Composant Dashboard : Interface d'administration pour gérer les recettes
const Dashboard = ({ recipes, onAddRecipe, onDeleteRecipe }) => {
  // Utilisation du hook useNavigate pour la navigation entre les pages
  const navigate = useNavigate();

  // États locaux pour gérer le formulaire
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    difficulty: 1,
    category: '',
    description: '',
    imageUrl: '/images/default-recipe.jpg',
    ingredients: [],
    instructions: []
  });

  // Gestion des changements dans les champs de base du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecipe(newRecipe);
    setNewRecipe({
      title: '',
      difficulty: 1,
      category: '',
      description: '',
      imageUrl: '/images/default-recipe.jpg',
      ingredients: [],
      instructions: []
    });
  };

  return (
    <div className="min-h-screen bg-[#14142B]">
      <div className="h-[200px] w-full bg-gradient-to-r from-green-500 to-yellow-500 relative">
        <h1 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-[#00FF66]">
          Dashboard
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulaire d'ajout de recette */}
          <div className="bg-[#1F1F3D] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-[#00FF66] mb-6">Ajouter une recette</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Titre:</label>
                <input 
                  type="text" 
                  name="title"
                  value={newRecipe.title}
                  onChange={handleChange}
                  placeholder="Ex: Burger classique"
                  className="w-full p-2 rounded bg-[#14142B] text-white border border-gray-600 focus:border-[#00FF66] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Difficulté (1-5):</label>
                <input 
                  type="number" 
                  name="difficulty"
                  value={newRecipe.difficulty}
                  onChange={handleChange}
                  min="1" 
                  max="5"
                  className="w-full p-2 rounded bg-[#14142B] text-white border border-gray-600 focus:border-[#00FF66] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Catégorie:</label>
                <input 
                  type="text" 
                  name="category"
                  value={newRecipe.category}
                  onChange={handleChange}
                  placeholder="Ex: Burger"
                  className="w-full p-2 rounded bg-[#14142B] text-white border border-gray-600 focus:border-[#00FF66] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Description:</label>
                <textarea 
                  name="description"
                  value={newRecipe.description}
                  onChange={handleChange}
                  placeholder="Description de la recette"
                  rows="4"
                  className="w-full p-2 rounded bg-[#14142B] text-white border border-gray-600 focus:border-[#00FF66] focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setNewRecipe({
                    title: '',
                    difficulty: 1,
                    category: '',
                    description: '',
                    imageUrl: '/images/default-recipe.jpg',
                    ingredients: [],
                    instructions: []
                  })}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#00FF66] text-[#14142B] rounded hover:bg-[#00FF66]/80"
                >
                  + Ajouter
                </button>
              </div>
            </form>
          </div>

          {/* Liste des recettes */}
          <div className="bg-[#1F1F3D] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-[#00FF66] mb-6">Toutes les recettes</h2>
            <div className="space-y-4">
              {recipes.map(recipe => (
                <div key={recipe.id} className="bg-[#14142B] rounded p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={recipe.imageUrl} alt={recipe.title} className="w-16 h-16 rounded object-cover" />
                    <span className="text-white">{recipe.title}</span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      className="text-[#00FF66] hover:text-[#00FF66]/80"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDeleteRecipe(recipe.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportation du composant
export default Dashboard;
