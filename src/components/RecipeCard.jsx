import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({
  id,
  title,
  image,
  category,
  difficulty,
  description,
  views,
  likes,
  prepTime,
  cookTime,
}) => {
  const renderStars = (level) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < level ? "text-yellow-400" : "text-gray-600"
        }`}
      >
        ★
      </span>
    ));
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? minutes + "min" : ""}`;
    }
    return `${minutes}min`;
  };

  const totalTime = formatTime(prepTime + cookTime);

  return (
    <div className="group bg-[#1F1F3D] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,102,0.3)]">
      {/* Image et catégorie */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-[#14142B]/90 text-white text-xs px-3 py-1.5 rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Titre */}
        <h3 className="text-[#00FF66] font-bold text-xl mb-2 truncate group-hover:text-[#00FF66]/90">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Difficulté et temps */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1">
            {renderStars(difficulty)}
          </div>
          <span className="text-gray-400 text-sm">{totalTime}</span>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span>{views} vues</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{likes} likes</span>
          </div>
        </div>

        {/* Bouton */}
        <Link
          to={`/recipe/${id}`}
          className="block w-full bg-[#00FF66] text-[#14142B] px-4 py-2 rounded font-medium text-center transition-all duration-300 hover:bg-[#00FF66]/90 hover:shadow-[0_0_10px_rgba(0,255,102,0.5)]"
        >
          View recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
