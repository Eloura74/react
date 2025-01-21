import PropTypes from "prop-types";

const RecipeList = ({ recipes }) => {
  // Fonction pour afficher les étoiles
  const displayStars = (difficulty) => {
    return "".repeat(difficulty);
  };

  return (
    <div className="flex-1 border-2 border-gray-300 rounded-2xl p-6 shadow-lg shadow-cyan-500/50">
      <h2 className="text-4xl font-memoirs text-center text-gray-700 mb-4">
        Toutes les Recettes
      </h2>

      {/* Liste des recettes */}
      <div className="flex flex-col gap-4 max-h-[1200px] overflow-y-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id || recipe.title}
            className="flex items-center gap-4 p-4 h-40 border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                {recipe.title}
                {recipe.isPersonal && (
                  <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
                    Ma recette
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-500">
                Difficulté: {displayStars(recipe.difficulty)} | Temps: {recipe.prepTime} |
                Likes: {recipe.likes} | Vues: {recipe.views} 
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      imageUrl: PropTypes.string,
      difficulty: PropTypes.number,
      prepTime: PropTypes.string,
      likes: PropTypes.number,
      views: PropTypes.number,
      isPersonal: PropTypes.bool,
    })
  ).isRequired,
};

export default RecipeList;
