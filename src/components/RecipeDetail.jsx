import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DifficultyStars from './DifficultyStars';
import SimilarRecipes from './SimilarRecipes';
import useRecipes from '../hooks/useRecipes';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, incrementViews, toggleLike } = useRecipes();
  
  const recipe = recipes.find(r => r.id === id);

  useEffect(() => {
    if (recipe) {
      incrementViews(recipe.id);
    }
  }, [recipe?.id]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#14142B] text-white p-8">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl mb-4">Recette non trouvée</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#00FF66] text-[#14142B] rounded hover:bg-[#00CC52]"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Vous pourriez ajouter une notification ici
    }
  };

  return (
    <div className="min-h-screen bg-[#14142B]">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14142B] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              {recipe.title}
            </motion.h1>
            <div className="flex items-center gap-6 text-white">
              <DifficultyStars difficulty={recipe.difficulty} size="large" />
              <div className="flex items-center gap-2">
                <span>👁 {recipe.views || 0}</span>
                <button onClick={() => toggleLike(recipe.id)} className="hover:text-[#00FF66]">
                  ❤️ {recipe.likes || 0}
                </button>
                <button onClick={handleShare} className="hover:text-[#00FF66]">
                  📤 Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1F1F3D] rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-[#00FF66] mb-6">Ingrédients</h2>
              <ul className="space-y-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white"
                  >
                    <span className="text-[#00FF66]">•</span>
                    {ingredient}
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-[#14142B] rounded-lg">
                <h3 className="text-[#00FF66] font-semibold mb-2">Temps de préparation</h3>
                <div className="grid grid-cols-2 gap-4 text-white">
                  <div>
                    <span className="block text-gray-400">Préparation</span>
                    <span className="text-lg">{recipe.prepTime} min</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Cuisson</span>
                    <span className="text-lg">{recipe.cookTime} min</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Instructions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1F1F3D] rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-[#00FF66] mb-6">Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#00FF66] text-[#14142B] rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="text-white">{instruction}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-[#1F1F3D] rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-[#00FF66] mb-4">À propos</h2>
              <p className="text-white">{recipe.description}</p>
            </motion.div>
          </div>
        </div>

        {/* Similar Recipes */}
        <SimilarRecipes currentRecipe={recipe} allRecipes={recipes} />
      </div>
    </div>
  );
};

export default RecipeDetail;
