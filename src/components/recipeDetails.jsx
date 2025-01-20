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
    <section className="min-h-screen bg-gradient-to-b from-bodyBgStart via-bodyBgMid to-bodyBgEnd p-6 relative">
      <div className="absolute inset-0 bg-[url('/images/download.png')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      <div className="relative">
        <article className="max-w-4xl mx-auto bg-stone-50 bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <nav className="mb-6">
            <Link
              to="/"
              className="shadowAndHover bg-[#353549] text-white font-memoirs rounded-full px-4 py-2 hover:bg-[#343437] transition-colors inline-block mb-4"
            >
              ← Retour à l'accueil
            </Link>
            <h1 className="text-5xl font-memoirs text-center mb-6 ">
              {recipe.title}
            </h1>
          </nav>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="rounded-lg shadow-md w-full object-cover h-[300px] shadowAndHover"
              />
            </div>

            <div className="space-y-4">
              <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow shadowAndHover">
                <h2 className="text-2xl font-memoirs mb-2">Informations</h2>
                <p className="text-gray-600 font-memoirs">
                  Difficulté: {"⭐".repeat(recipe.difficulty)}
                </p>
                <p className="text-gray-600 font-memoirs">
                  ⏲ Temps de préparation: {recipe.prepTime} minutes
                </p>
                <p className="text-gray-600 font-memoirs">
                  <span className="text-red-500 text-xl">❤</span> Likes: {recipe.likes}
                </p>
                <p className="text-gray-600 font-memoirs">
                  👀 Vues: {recipe.views}
                </p>
              </div>

              <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow shadowAndHover">
                <h2 className="text-2xl font-memoirs mb-2">Description</h2>
                <p className="text-gray-600 font-memoirs">{recipe.description}</p>
              </div>

              <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow shadowAndHover">
                <h2 className="text-2xl font-memoirs mb-2">Ingrédients</h2>
                <ul className="text-gray-600 list-disc list-inside font-memoirs">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow shadowAndHover">
                <h2 className="text-2xl font-memoirs mb-2">Instructions</h2>
                <ol className="text-gray-600 list-decimal list-inside font-memoirs">
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
        </article>
      </div>
    </section>
  );
};

export default RecipeDetails;
