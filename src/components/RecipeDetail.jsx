// Importation des dépendances nécessaires
import React from 'react';
import { useParams } from 'react-router-dom'; // Pour la navigation et l'accès aux paramètres d'URL

// Composant RecipeDetail : Affiche les détails complets d'une recette
const RecipeDetail = ({ recipes }) => {
  // Récupère l'ID de la recette depuis l'URL
  const { id } = useParams();
  
  // Trouve la recette correspondant à l'ID
  const recipe = recipes.find(r => r.id === id);

  // Si la recette n'est pas trouvée, affiche un message d'erreur
  if (!recipe) {
    return (
      <div className="text-white text-center p-8">
        <h2 className="text-2xl mb-4">Recette non trouvée</h2>
      </div>
    );
  }

  // Fonction pour afficher les étoiles de notation
  const renderStars = (level) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`text-2xl ${index < level ? 'text-yellow-400' : 'text-gray-600'}`}>
        ★
      </span>
    ));
  };

  // Rendu du composant avec les détails de la recette
  return (
    <div className="min-h-screen bg-[#14142B]">
      {/* Image de la recette */}
      <div 
        className="h-[300px] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#14142B]"></div>
        <h1 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-[#00FF66]">
          {recipe.title}
        </h1>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8 text-white">
        {/* Informations de la recette */}
        <div className="mb-6">
          {/* Niveau de difficulté */}
          <div className="flex items-center mb-4">
            <span className="mr-2">Difficulté:</span>
            <div className="flex">{renderStars(recipe.difficulty)}</div>
          </div>
          {/* Description de la recette */}
          <p className="text-gray-300">{recipe.description}</p>
        </div>

        {/* Liste des ingrédients */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#00FF66] mb-4">Ingrédients</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              ingredient && <li key={index} className="text-gray-300">{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions de préparation */}
        <div>
          <h2 className="text-2xl font-semibold text-[#00FF66] mb-4">Instructions</h2>
          <div className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              instruction && (
                <div key={index} className="flex">
                  <span className="font-bold mr-4">{index + 1}.</span>
                  <span className="text-gray-300">{instruction}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportation du composant
export default RecipeDetail;
