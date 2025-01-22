// import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Footter from "../components/footter";
// Liens du footer
const socialLinks = [
  {
    name: "facebook",
    href: "https://facebook.com",
    icon: "/images/logoFb.svg",
  },
  {
    name: "instagram",
    href: "https://instagram.com",
    icon: "/images/logoInsta.svg",
  },
];

const navLinks = [
  { label: "Accueil", path: "/" },
  { label: "A propos", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const RecipeDetails = ({
  recipes,
  currentFilter,
  onFilterChange,
  // onSearch,
}) => {
  const { id } = useParams(); // on recupere l'id du parametre
  const recipe = recipes.find((r) => r.id === id); // on cherche la recette avec l'id

  // si la recette n'existe pas alors on affiche un message
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
            Retour à l`&apos;`accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bodyBg">
      {/* Navbar de la page details */}
      <Navbar currentFilter={currentFilter} onFilterChange={onFilterChange} />
      {/* Fond */}
      <div className="absolute inset-0 bg-[url('/images/fondDetail.png')] bg-cover bg-center bg-no-repeat opacity-25"></div>
      {/* Contenu */}
      <div className="relative p-6">
        {/* Contenu de la recette */}
        <article className="max-w-4xl mx-auto">
          <div className="bgCard rounded-lg shadow-lg p-8">
            {/* Titre */}
            <h1 className="text-5xl font-memoirs text-center mb-8 text-gray-800">
              {recipe.title}
            </h1>

            {/* Informations */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="rounded-lg shadow-md w-full object-cover h-[400px] shadowAndHover"
                />
              </div>
              {/* Informations */}
              <div className="space-y-6">
                <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow shadowAndHover">
                  <h2 className="text-3xl font-memoirs mb-4 text-gray-800">
                    Informations
                  </h2>
                  {/* difficulté */}
                  <p className="text-gray-700 font-memoirs text-xl">
                    Difficulté: {"⭐".repeat(recipe.difficulty)}
                  </p>
                  {/* temps de preparation */}
                  <p className="text-gray-700 font-memoirs text-xl">
                    ⏲ Temps de préparation: {recipe.prepTime} minutes
                  </p>
                  {/* likes */}
                  <p className="text-gray-700 font-memoirs text-xl">
                    <span className="text-red-500">❤</span> Likes:{" "}
                    {recipe.likes}
                  </p>
                  {/* views */}
                  <p className="text-gray-700 font-memoirs text-xl">
                    👀 Vues: {recipe.views}
                  </p>
                </div>
                {/* description */}
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
            {/* ingrédients */}
            <div className="mt-8 space-y-6">
              <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow shadowAndHover">
                <h2 className="text-3xl font-memoirs mb-4 text-gray-800">
                  Ingrédients
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Liste des ingrédients */}
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
              {/* instructions */}
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
              {/* auteur */}
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
    </section>
  );
};
<footer className="bg-[#14142B] bottom-0 w-full shadow-lg flex items-center justify-between z-50">
  <Footter
    socialLinks={socialLinks}
    navLinks={navLinks}
    copyright="© 2024 Lets Cook. Tous droits réservés."
  />
</footer>;
// ______________________________________________________________________________
// ______________________________________________________________________________
// Prop-types pour rendre le debug plus facile et verifier que les proprietes sont bien passes
RecipeDetails.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      difficulty: PropTypes.number.isRequired,
      prepTime: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
      instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default RecipeDetails;
