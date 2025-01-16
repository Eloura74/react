import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DifficultyStars = ({ difficulty, size = "normal" }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const getDifficultyText = (level) => {
    switch (level) {
      case 1:
        return "Très facile - Parfait pour débuter";
      case 2:
        return "Facile - Quelques étapes simples";
      case 3:
        return "Intermédiaire - Requiert de l'attention";
      case 4:
        return "Difficile - Pour cuisiniers expérimentés";
      case 5:
        return "Expert - Techniques avancées requises";
      default:
        return "";
    }
  };

  const starSize = size === "large" ? "w-8 h-8" : "w-5 h-5";
  const tooltipOffset = size === "large" ? "-top-12" : "-top-10";

  return (
    <div className="flex items-center gap-1 relative">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className="relative"
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
        >
          <svg
            className={`${starSize} ${
              star <= difficulty
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          <AnimatePresence>
            {hoveredStar === star && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className={`absolute ${tooltipOffset} left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-10`}
              >
                {getDifficultyText(star)}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default DifficultyStars;
