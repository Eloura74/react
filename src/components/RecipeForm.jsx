import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion"; // import de framer motion pour l'animation

const RecipeForm = ({ newRecipe, recipeChange, saveRecipe }) => {
  const [hoverRating, setHoverRating] = useState(0);

  // Créer un tableau de 5 étoiles
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (rating) => {
    recipeChange({ ...newRecipe, difficulty: rating });
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 border-2 border-gray-300 rounded-2xl p-6 shadow-lg shadow-cyan-500/50">
      {/* Titre */}
      <h2 className="text-4xl font-memoirs text-center text-gray-700 mb-4">
        Créer une nouvelle recette
      </h2>

      {/* Image par défaut */}
      <div className="flex justify-center">
        <img
          src={newRecipe.imageUrl}
          alt="Image par défaut"
          className="w-2/3 h-auto rounded-tl-2xl rounded-br-2xl shadow-xl shadow-cyan-500/50"
        />
      </div>

      {/* Formulaire de création */}
      <div className="grid grid-cols-1 gap-4">
        {/* Nom de la recette */}
        <div className="flex flex-col">
          <label
            htmlFor="recipeTitle"
            className="mb-1 ml-2 text-gray-700 text-3xl font-memoirs"
          >
            Nom de la recette
          </label>
          <input
            id="recipeTitle"
            type="text"
            placeholder="Nom de la recette"
            value={newRecipe.title}
            onChange={(e) =>
              recipeChange({ ...newRecipe, title: e.target.value })
            }
            className="placeholder:text-center rounded-2xl border-2 border-gray-400 p-2"
          />
        </div>

        {/* Ingrédients */}
        <div className="flex flex-col">
          <label
            htmlFor="recipeIngredients"
            className="mb-1 ml-2 text-gray-700 text-3xl font-memoirs"
          >
            Ingrédients
          </label>
          <input
            id="recipeIngredients"
            type="text"
            placeholder="Ingrédients"
            value={newRecipe.ingredients}
            onChange={(e) =>
              recipeChange({ ...newRecipe, ingredients: e.target.value })
            }
            className="placeholder:text-center rounded-2xl border-2 border-gray-400 p-2"
          />
        </div>

        {/* Temps de préparation */}
        <div className="flex flex-col">
          <label
            htmlFor="recipePrepTime"
            className="mb-1 ml-2 text-gray-700 text-3xl font-memoirs"
          >
            Temps de préparation
          </label>
          <input
            id="recipePrepTime"
            type="text"
            placeholder="Temps de préparation"
            value={newRecipe.prepTime}
            onChange={(e) =>
              recipeChange({ ...newRecipe, prepTime: e.target.value })
            }
            className="placeholder:text-center rounded-2xl border-2 border-gray-400 p-2"
          />
        </div>

        {/* Instructions */}
        <div className="flex flex-col">
          <label
            htmlFor="recipeInstructions"
            className="mb-1 ml-2 text-gray-700 text-3xl font-memoirs"
          >
            Instructions
          </label>
          <textarea
            id="recipeInstructions"
            placeholder="Instructions"
            value={newRecipe.instructions}
            onChange={(e) =>
              recipeChange({ ...newRecipe, instructions: e.target.value })
            }
            className="placeholder:text-center rounded-2xl border-2 border-gray-400 p-2"
          />
        </div>
        {/* Difficulté avec étoiles */}
        <div className="flex flex-col">
          <label
            htmlFor="recipeDifficulty"
            className="mb-1 ml-2 text-gray-700 text-3xl font-memoirs"
          >
            Difficulté
          </label>
          <div className="flex items-center gap-2 ml-3">
            {/* Étoiles interactives */}
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleStarClick(index + 1)}
                onMouseEnter={() => handleStarHover(index + 1)}
                onMouseLeave={() => handleStarHover(0)}
                className={`text-3xl transition-transform duration-200 ${
                  index + 1 <= (hoverRating || newRecipe.difficulty)
                    ? "text-yellow-500 scale-150 "
                    : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
            {/* Affichage de la difficulté */}
            <span className="ml-3 mt-3  text-3xl font-memoirs text-gray-700">
              {newRecipe.difficulty} sur 5
            </span>
          </div>
        </div>
        {/* Bouton pour soumettre */}
        {/* <button
          className="px-4 py-4 mt-4 w-1/2 mx-auto bg-gray-500 text-white rounded-full font-medium hover:bg-teal-400/60 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 text-3xl font-memoirs"
          onClick={saveRecipe}
        >
          Enregistrer la recette
        </button> */}
        <motion.button
          className="mt-8 px-4 py-2 h-12 w-1/2 mx-auto rounded-full transition-colors font-memoirs bg-[#9ca3af] text-[#14142B] hover:text-white hover:bg-[#2D2D4D] hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 text-3xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            saveRecipe();
          }}
        >
          Enregistrer
        </motion.button>
      </div>
    </div>
  );
};

RecipeForm.propTypes = {
  newRecipe: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    ingredients: PropTypes.string,
    difficulty: PropTypes.number,
    prepTime: PropTypes.string,
    instructions: PropTypes.string,
  }).isRequired,
  recipeChange: PropTypes.func.isRequired,
  saveRecipe: PropTypes.func.isRequired,
};

export default RecipeForm;
