import React from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bodyBgStart via-bodyBgMid to-bodyBgEnd p-6">
        <div className="text-center">
          <h2 className="text-4xl font-memoirs text-white mb-4">
            Recette non trouvée
          </h2>
          <Link
            to="/"
            className="bg-[#353549] text-white font-memoirs rounded-full px-4 py-2 hover:bg-[#343437] transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodyBgStart via-bodyBgMid to-bodyBgEnd p-6">
      <div className="max-w-4xl mx-auto bgCard rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <Link
            to="/"
            className="bg-[#353549] text-white font-memoirs rounded-full px-4 py-2 hover:bg-[#343437] transition-colors inline-block mb-4"
          >
            ← Retour
          </Link>
          <h1 className="text-5xl font-memoirs text-center mb-6">
            {recipe.title}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow">
              <h2 className="text-2xl font-memoirs mb-2">Informations</h2>
              <p className="font-memoirs">
                Difficulté: {"⭐".repeat(recipe.difficulty)}
              </p>
              <p className="font-memoirs">
                ⏲ Temps de préparation: {recipe.prepTime} minutes
              </p>
              <p className="font-memoirs">❤ Likes: {recipe.likes}</p>
              <p className="font-memoirs">👀 Vues: {recipe.views}</p>
            </div>

            <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow">
              <h2 className="text-2xl font-memoirs mb-2">Description</h2>
              <p className="font-memoirs">{recipe.description}</p>
            </div>

            <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow">
              <h2 className="text-2xl font-memoirs mb-2">Ingrédients</h2>
              <ul className="list-disc list-inside font-memoirs">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow">
              <h2 className="text-2xl font-memoirs mb-2">Instructions</h2>
              <ol className="list-decimal list-inside font-memoirs">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="text-right text-sm font-memoirs">
              <p>Recette par: {recipe.author}</p>
              <p>Date de publication: {recipe.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;