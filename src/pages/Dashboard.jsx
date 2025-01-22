import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footter from "../components/footter";
import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";
import Recipes from "../../public/recettes.json";

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

const Dashboard = () => {
  // État pour les recettes sauvegardées
  const [savedRecipes, setSavedRecipes] = useState([]);
  // État pour toutes les recettes (JSON + localStorage)
  const [allRecipes, setAllRecipes] = useState([]);

  // État pour la nouvelle recette
  const [newRecipe, setNewRecipe] = useState({
    imageUrl: "/images/newRecipes.webp",
    title: "",
    ingredients: "",
    difficulty: 1, // Initialiser avec 1 étoile
    prepTime: "",
    instructions: "",
    likes: 0,
    views: 0,
    date: new Date().toISOString(),
  });

  // Charger les recettes sauvegardées au chargement du composant
  useEffect(() => {
    const localRecipes = localStorage.getItem("userRecipes"); // Obtenir les recettes sauvegardées
    if (localRecipes) {
      // Si elles existent
      const parsedRecipes = JSON.parse(localRecipes); // Convertir en tableau
      setSavedRecipes(parsedRecipes);
      setAllRecipes([...Recipes, ...parsedRecipes]); // Mettre à jour toutes les recettes
    } else {
      setAllRecipes([...Recipes]); // Mettre à jour toutes les recettes
    }
  }, []);

  // Fonction pour sauvegarder une nouvelle recette
  const handleSaveRecipe = () => {
    // Vérifier que tous les champs requis sont remplis
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Créer une copie des recettes existantes
    const updatedRecipes = [...savedRecipes];

    // Ajouter la nouvelle recette
    const newRecipeWithId = {
      ...newRecipe,
      id: Date.now(),
      date: new Date().toISOString(),
      isPersonal: true, // Marquer comme recette personnelle
    };

    updatedRecipes.push(newRecipeWithId);

    // Mettre à jour le state et le localStorage
    setSavedRecipes(updatedRecipes);
    setAllRecipes([...Recipes, ...updatedRecipes]);
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes)); // convertir en string

    // Réinitialiser le formulaire
    setNewRecipe({
      imageUrl: "/images/newRecipes.webp",
      title: "",
      ingredients: "",
      difficulty: 1,
      prepTime: "",
      instructions: "",
      likes: 0,
      views: 0,
      date: new Date().toISOString(), // Mettre à jour la date
    });

    alert("Recette enregistrée avec succès !");
  };

  return (
    <section className="min-h-screen bodyBg">
      <Navbar accueilOnClick={() => {}} />

      <article className="container mx-auto p-8 flex flex-col sm:flex-row gap-8">
        <RecipeForm
          newRecipe={newRecipe}
          recipeChange={setNewRecipe}
          saveRecipe={handleSaveRecipe}
        />
        <RecipeList recipes={allRecipes} />
      </article>

      <Footter
        socialLinks={socialLinks}
        navLinks={navLinks}
        copyright="© 2024 Lets Cook. Tous droits réservés."
      />
    </section>
  );
};

export default Dashboard;
