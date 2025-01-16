import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DifficultyStars from './DifficultyStars';

const SimilarRecipes = ({ currentRecipe, allRecipes }) => {
  // Trouver les recettes similaires basées sur la catégorie et la difficulté
  const similarRecipes = allRecipes
    .filter(
      (recipe) =>
        recipe.id !== currentRecipe.id && 
        (recipe.category === currentRecipe.category ||
         Math.abs(recipe.difficulty - currentRecipe.difficulty) <= 1)
    )
    .slice(0, 3); // Limiter à 3 recettes similaires

  if (similarRecipes.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-[#00FF66] mb-6">Recettes similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1F1F3D] rounded-lg overflow-hidden shadow-lg"
          >
            <Link to={`/recipe/${recipe.id}`} className="block">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2">{recipe.title}</h3>
                <div className="flex items-center justify-between">
                  <DifficultyStars difficulty={recipe.difficulty} />
                  <span className="text-gray-400 text-sm">
                    {recipe.prepTime + recipe.cookTime} min
                  </span>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-[#14142B] text-[#00FF66] px-3 py-1 rounded-full text-sm">
                    {recipe.category}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SimilarRecipes;
