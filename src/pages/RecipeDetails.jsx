import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";

const RecipeDetails = ({ recipes, currentFilter, onFilterChange }) => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bodyBg">
        <Navbar currentFilter={currentFilter} onFilterChange={onFilterChange} />
        <div className="text-center p-6">
          <h2 className="text-4xl font-memoirs text-gray-800 mb-4">
            Recette non trouvée
          </h2>
          <Link
            to="/"
            className="bg-[#353549] text-white font-memoirs rounded-full px-4 py-2 hover:bg-[#343437] transition-colors shadowAndHover"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bodyBg">
      <Navbar currentFilter={currentFilter} onFilterChange={onFilterChange} />
      <div className="absolute inset-0 bg-[url('/images/fondDetail.png')] bg-cover bg-center bg-no-repeat opacity-25"></div>
      <div className="relative p-6">
        <article className="max-w-4xl mx-auto">
          <div className="bgCard rounded-lg shadow-lg p-8">
            <h1 className="text-5xl font-memoirs text-center mb-8 text-gray-800">
              {recipe.title}
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="rounded-lg shadow-md w-full object-cover h-[400px] shadowAndHover"
                />
              </div>

              <div className="space-y-6">
                <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow shadowAndHover">
                  <h2 className="text-3xl font-memoirs mb-4 text-gray-800">
                    Informations
                  </h2>
                  <p className="text-gray-700 font-memoirs text-xl">
                    Difficulté: {"⭐".repeat(recipe.difficulty)}
                  </p>
                  <p className="text-gray-700 font-memoirs text-xl">
                    ⏲ Temps de préparation: {recipe.prepTime} minutes
                  </p>
                  <p className="text-gray-700 font-memoirs text-xl">
                    <span className="text-red-500">❤</span> Likes:{" "}
                    {recipe.likes}
                  </p>
                  <p className="text-gray-700 font-memoirs text-xl">
                    👀 Vues: {recipe.views}
                  </p>
                </div>

                <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow shadowAndHover">
                  <h2 className="text-3xl font-memoirs mb-4 text-gray-800">
                    Description
                  </h2>
                  <p className="text-gray-700 font-memoirs text-xl">
                    {recipe.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow shadowAndHover">
                <h2 className="text-3xl font-memoirs mb-4 text-gray-800">
                  Ingrédients
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="text-gray-700 font-memoirs text-xl flex items-center"
                    >
                      <span className="mr-2">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow shadowAndHover">
                <h2 className="text-3xl font-memoirs mb-4 text-gray-800">
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="text-gray-700 font-memoirs text-xl"
                    >
                      <span className="font-bold mr-2">{index + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="text-right text-gray-600 font-memoirs">
                <p className="text-lg">Recette par: {recipe.author}</p>
                <p className="text-lg">Date de publication: {recipe.date}</p>
              </div>
            </div>
          </div>
        </article>

        {/* Bouton flottant "Retour à l'accueil" */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/"
            className="bg-[#353549] text-white font-memoirs rounded-full px-6 py-3 hover:bg-[#343437] transition-colors shadowAndHover flex items-center gap-2"
          >
            <span>←</span>
            <span>Retour</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetails;
