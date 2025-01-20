import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import FilterBar from "../components/filters";

const Home = ({ recipes, currentFilter, onFilterChange, onSearch }) => {
  const highlightTitleWords = (title, description) => {
    // Liste des mots à ignorer
    const stopWords = [
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

    // Filtrer les mots du titre pour exclure les stopWords
    const titleWords = title
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => !stopWords.includes(word) && word.length > 2);

    const parts = description.split(
      new RegExp(`(${titleWords.join("|")})`, "gi")
    );

    return parts.map((part, index) => {
      const isMatch = titleWords.includes(part.toLowerCase());
      return isMatch ? (
        <span
          key={index}
          className="text-cyan-400"
        >
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  return (
    <>
      <Navbar accueilOnClick={() => {}} />
      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
        onSearch={onSearch}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {recipes.map((recipe) => (
          <article
            key={recipe.id}
            className="bgCard rounded-lg shadow-lg p-4 cursor-pointer hoverEffect"
          >
            <h3 className="text-4xl font-memoirs mb-2 text-center">
              {recipe.title}
            </h3>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="mb-2 rounded-lg object-cover w-[400px] h-[400px] mx-auto shadow-lg hover:shadow-xl hover:shadow-cyan-500/50"
            />
            <div className="text-left mt-4">
              <p className="text-gray-700 font-memoirs text-xl mb-2">
                Difficulté: {"⭐".repeat(recipe.difficulty)}
              </p>
              <hr />
              <article className="mt-2 mb-2">
                <p className="text-gray-600 font-memoirs">
                  ⏲ Temps de preparation: {recipe.prepTime} minutes
                </p>
                <p className="text-gray-600 font-memoirs">
                  <span className="text-red-500 text-xl"> ❤</span> Likes:{" "}
                  {recipe.likes}
                </p>
                <p className="text-gray-600 font-memoirs">
                  👀 Views: {recipe.views}
                </p>
              </article>
              <hr />
            </div>
            <div>
              <p className="text-gray-700 font-memoirs text-xl min-h-[100px] mt-4">
                {highlightTitleWords(recipe.title, recipe.description)}
              </p>
              <hr />
              <p className="text-gray-600 font-memoirs text-xs text-right">
                Recette par: {recipe.author}
              </p>
              <p className="text-gray-600 font-memoirs text-xs text-right">
                Date de publication: {recipe.date}
              </p>
            </div>
            <Link
              to={`/recipe/${recipe.id}`}
              className="bg-[#353549] text-gray-50 text-2xl font-memoirs rounded-full ml-6 px-8 py-2 hover:bg-[#343437] transition-colors shadow-lg hover:text-cyan-500 hover:shadow-cyan-500/50 mt-4 inline-block"
            >
              Voir la recette
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default Home;
