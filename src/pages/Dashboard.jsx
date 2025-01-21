import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footter from "../components/footter";
import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";
import Recipes from "../../public/recettes.json";

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
    const localRecipes = localStorage.getItem("userRecipes");
    if (localRecipes) {
      const parsedRecipes = JSON.parse(localRecipes);
      setSavedRecipes(parsedRecipes);
      setAllRecipes([...Recipes, ...parsedRecipes]);
    } else {
      setAllRecipes([...Recipes]);
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
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));

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
      date: new Date().toISOString(),
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
        copyright=" 2024 Lets Cook. Tous droits réservés."
        socialLinks={[
          { url: "https://twitter.com", network: "twitter" },
          { url: "https://facebook.com", network: "facebook" },
          { url: "https://instagram.com", network: "instagram" },
        ]}
        navLinks={[
          { text: "Mentions légales", url: "/mentions-legales" },
          { text: "Politique de confidentialité", url: "/confidentialite" },
          { text: "CGU", url: "/cgu" },
        ]}
      />
    </section>
  );
};

export default Dashboard;
