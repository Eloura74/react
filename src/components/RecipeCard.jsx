import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({
  id,
  title,
  image,
  category,
  difficulty,
  description,
  createdAt,
  views,
  likes,
  prepTime,
  cookTime,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

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

  const formatTime = (prep, cook) => {
    const totalTime = prep + cook;
    if (totalTime >= 60) {
      const hours = Math.floor(totalTime / 60);
      const minutes = totalTime % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}min` : ""}`;
    }
    return `${totalTime} min`;
  };

  return (
    <div className="bg-[#1F1F3D] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-[#00FF66]/20">
      {/* Image with overlay */}
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute top-0 right-0 m-3">
          <span className="bg-[#14142B]/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Title */}
        <h3 className="text-[#00FF66] font-bold text-xl mb-3 hover:text-[#00FF66]/90">
          {title}
        </h3>

        {/* Difficulty and Time */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1">
            {renderStars(difficulty)}
          </div>
          <div className="text-gray-400 text-sm">
            {formatTime(prepTime, cookTime)}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats and Button */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-gray-400 text-sm">
            <span>{views} views</span>
            <span>{likes} likes</span>
          </div>
          <Link
            to={`/recipe/${id}`}
            className="bg-[#00FF66] text-[#14142B] px-4 py-2 rounded-lg font-medium hover:bg-[#00FF66]/90 transition-colors"
          >
            View recipe
          </Link>
        </div>

        {/* Date */}
        {createdAt && (
          <div className="mt-3 text-gray-500 text-xs">
            Added on {formatDate(createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
