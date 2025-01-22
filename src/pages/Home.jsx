// import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import FilterBar from "../components/filters";
import Footter from "../components/footter";
import PropTypes from "prop-types";

// Liens du footer
const socialLinks = [
  {
    name: "facebook",
    href: "https://facebook.com",
    icon: "/images/logoFb.svg",
    ariaLabel: "Facebook",
  },
  {
    name: "instagram",
    href: "https://instagram.com",
    icon: "/images/logoInsta.svg",
    ariaLabel: "Instagram",
  },
];

const navLinks = [
  { ariaLabel: "Accueil", label: "Accueil", path: "/" },
  { ariaLabel: "A propos", label: "A propos", path: "/about" },
  { ariaLabel: "Contact", label: "Contact", path: "/contact" },
];

// ______________________________________________________________________________
// ______________________________________________________________________________
// Fonction pour surbrillancer les mots dans le titre
const Home = ({ recipes, currentFilter, onFilterChange, onSearch }) => {
  const highlightmotTitle = (title, description) => {
    // Liste des mots à ignorer
    const motIgnore = [
      "de",
      "la",
      "le",
      "les",
      "du",
      "des",
      "un",
      "une",
      "et",
      "à",
      "au",
      "aux",
      "en",
      "avec",
    ];

    // ______________________________________________________________________________
    // ______________________________________________________________________________
    // Filtrer les mots du titre pour exclure les motIgnore
    const motTitle = title
      .toLowerCase()
      .split(/\s+/) // Diviser le titre en mots
      .filter((word) => !motIgnore.includes(word) && word.length > 2);
    // Filtrer les mots

    // ______________________________________________________________________________
    // ______________________________________________________________________________
    // Diviser la description en parties en utilisant les mots du titre
    const parts = description.split(
      new RegExp(`(${motTitle.join("|")})`, "gi")
    );

    // ______________________________________________________________________________
    // ______________________________________________________________________________
    // Surbriller les mots du titre dans la description
    return parts.map((part, index) => {
      const isMatch = motTitle.includes(part.toLowerCase());
      return isMatch ? (
        <span key={index} className="text-cyan-700">
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  // ______________________________________________________________________________
  // ______________________________________________________________________________
  return (
    <>
      <Navbar accueilOnClick={() => {}} />
      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
        onSearch={onSearch}
      />
      <section className=" container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {/* copie des recettes */}
        {recipes.map((recipe) => (
          // carte
          <article
            key={recipe.id}
            className="bgCard rounded-lg shadow-lg p-4 cursor-pointer hoverEffect"
          >
            {/* Titre */}
            <h3 className="text-4xl font-memoirs mb-2 text-center">
              {recipe.title}
            </h3>
            {/* Image */}
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="mb-2 rounded-lg object-cover w-[400px] h-[400px] mx-auto shadow-lg hover:shadow-xl hover:shadow-gray-700 hover:scale-105 transition-all duration-300"
            />
            <div className="text-left mt-4">
              {/* Difficulté */}
              <p className="text-gray-700 font-memoirs text-xl mb-2">
                Difficulté: {"⭐".repeat(recipe.difficulty)}
              </p>
              <hr />
              {/* Temps de preparation */}
              <article className="mt-2 mb-2">
                <p className="text-gray-600 font-memoirs">
                  ⏲ Temps de preparation: {recipe.prepTime} minutes
                </p>
                {/* Likes */}
                <p className="text-gray-600 font-memoirs">
                  <span className="text-red-500 text-xl"> ❤</span> Likes:{" "}
                  {recipe.likes}
                </p>
                {/* Views */}
                <p className="text-gray-600 font-memoirs">
                  👀 Views: {recipe.views}
                </p>
              </article>
              <hr />
            </div>
            <div>
              {/* Description */}
              <p className="text-gray-700 font-memoirs text-xl min-h-[100px] mt-4">
                {highlightmotTitle(recipe.title, recipe.description)}
              </p>
              <hr />
              {/* Auteur et date de publication */}
              <p className="text-gray-600 font-memoirs text-xs text-right">
                Recette par: {recipe.author}
              </p>
              <p className="text-gray-600 font-memoirs text-xs text-right">
                Date de publication: {recipe.date}
              </p>
            </div>
            {/* Bouton voir la recette */}
            <Link
              to={`/recipe/${recipe.id}#`}
              className="bg-[#353549] text-gray-50 text-2xl font-memoirs rounded-full ml-6 px-8 py-2 hover:bg-[#343437] transition-colors shadow-lg hover:text-cyan-500 hover:shadow-text-gray-700 mt-4 inline-block"
            >
              Voir la recette
            </Link>
          </article>
        ))}
      </section>
      <footer className="bg-[#14142B] bottom-0 w-full shadow-lg flex items-center justify-between z-50">
        <Footter
          socialLinks={socialLinks}
          navLinks={navLinks}
          copyright=" 2024 Lets Cook. Tous droits réservés."
        />
      </footer>
    </>
  );
};

// ______________________________________________________________________________
// ______________________________________________________________________________
// Prop-types pour rendre le debug plus facile et verifier que les proprietes sont bien passes
Home.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  currentFilter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
};

export default Home;
