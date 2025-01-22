import { useParams, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";
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

// ______________________________________________________________________________
// ______________________________________________________________________________
const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-gray-600">Recette non trouvée</p>
        </div>
        <Footter
          copyright="2024 Lets Cook. Tous droits réservés."
          socialLinks={socialLinks}
          navLinks={navLinks}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* En-tête de la recette */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-memoirs mb-4">{recipe.title}</h1>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
          </div>

          {/* Informations de la recette */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div>
              <h2 className="text-xl font-memoirs mb-2">Difficulté</h2>
              <p>{"⭐".repeat(recipe.difficulty)}</p>
            </div>
            <div>
              <h2 className="text-xl font-memoirs mb-2">Temps de préparation</h2>
              <p>{recipe.prepTime} minutes</p>
            </div>
            <div>
              <h2 className="text-xl font-memoirs mb-2">Popularité</h2>
              <p>{recipe.likes} likes</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-memoirs mb-4">Description</h2>
            <p className="text-gray-700">{recipe.description}</p>
          </div>

          {/* Ingrédients */}
          <div className="mb-8">
            <h2 className="text-2xl font-memoirs mb-4">Ingrédients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-700"
                >
                  {ingredient}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-2xl font-memoirs mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-700"
                >
                  {instruction}
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Informations supplémentaires */}
          <div className="text-sm text-gray-500 mt-8">
            <p>Par {recipe.author}</p>
            <p>Publié le {new Date(recipe.date).toLocaleDateString()}</p>
            <p>{recipe.views} vues</p>
          </div>

          {/* Bouton retour */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="bg-[#353549] text-white px-6 py-2 rounded-full hover:bg-[#2D2D4D] transition-colors inline-block"
            >
              Retour aux recettes
            </Link>
          </div>
        </div>
      </main>
      <Footter
        copyright="2024 Lets Cook. Tous droits réservés."
        socialLinks={socialLinks}
        navLinks={navLinks}
      />
    </div>
  );
};

export default RecipeDetails;
