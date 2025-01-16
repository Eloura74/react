import { useState, useEffect } from "react";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement initial des recettes
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const storedRecipes = localStorage.getItem("recipes");
        if (storedRecipes) {
          setRecipes(JSON.parse(storedRecipes));
          setLoading(false);
          return;
        }

        const response = await fetch("/recettes.json");
        const data = await response.json();
        const recipesWithMetadata = data.map((recipe) => ({
          ...recipe,
          views: Math.floor(Math.random() * 1000),
          likes: Math.floor(Math.random() * 100),
          prepTime: Math.floor(Math.random() * 30) + 10,
          cookTime: Math.floor(Math.random() * 60) + 20,
          date: recipe.date || new Date().toISOString(),
        }));

        setRecipes(recipesWithMetadata);
        localStorage.setItem("recipes", JSON.stringify(recipesWithMetadata));
        setLoading(false);
      } catch (error) {
        console.error("Error loading recipes:", error);
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const addRecipe = (newRecipe) => {
    const recipeWithMetadata = {
      ...newRecipe,
      imageUrl: newRecipe.imageUrl || "/images/newRecipes.webp",
      date: new Date().toISOString(),
      views: 0,
      likes: 0,
      prepTime: newRecipe.prepTime || 30,
      cookTime: newRecipe.cookTime || 45,
    };

    const updatedRecipes = [...recipes, recipeWithMetadata];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const deleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const updateRecipe = (recipeId, updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const incrementViews = (recipeId) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === recipeId
        ? { ...recipe, views: (recipe.views || 0) + 1 }
        : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const toggleLike = (recipeId) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === recipeId
        ? { ...recipe, likes: (recipe.likes || 0) + 1 }
        : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  return {
    recipes,
    loading,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    incrementViews,
    toggleLike,
  };
};

export default useRecipes;
