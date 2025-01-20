import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import FilterBar from '../components/filters';

const Home = ({ recipes, currentFilter, onFilterChange }) => {
  return (
    <>
      <Navbar accueilOnClick={() => {}} />
      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
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
            <div className="text-left">
              <p className="text-gray-700 font-memoirs text-xl">
                Difficulté: {"⭐".repeat(recipe.difficulty)}
              </p>
              <hr />
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
              <hr />
            </div>
            <div>
              <p className="text-gray-700 font-memoirs text-xl min-h-[100px]">
                {recipe.description}
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
              className="bg-[#353549] text-gray-50 text-2xl font-memoirs rounded-full px-4 py-2 hover:bg-[#343437] transition-colors shadow-lg hover:shadow-cyan-500/50 mt-4 inline-block"
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
