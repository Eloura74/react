import { useState, useEffect } from "react";

// Custom hook to manage all recipe operations
const useRecipes = () => {
  // State to store recipes list
  const [recipes, setRecipes] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Initial loading of recipes
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        // Check if recipes are stored in localStorage
        const storedRecipes = localStorage.getItem("recipes");
        if (storedRecipes) {
          setRecipes(JSON.parse(storedRecipes));
          setLoading(false);
          return;
        }

        // If no recipes in localStorage, load from JSON file
        const response = await fetch("/recettes.json");
        const data = await response.json();

        // Add missing metadata to existing recipes
        const recipesWithMetadata = data.map((recipe) => ({
          ...recipe,
          createdAt: new Date().toISOString(),
          views: Math.floor(Math.random() * 1000), // Test data
          likes: Math.floor(Math.random() * 100), // Test data
          prepTime: Math.floor(Math.random() * 30) + 10, // 10-40 minutes
          cookTime: Math.floor(Math.random() * 60) + 20, // 20-80 minutes
          category: recipe.category || "Main Course", // Default category
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

  // Function to add a new recipe
  const addRecipe = (newRecipe) => {
    const recipeWithMetadata = {
      ...newRecipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      prepTime: newRecipe.prepTime || 30, // Default prep time
      cookTime: newRecipe.cookTime || 45, // Default cook time
      category: newRecipe.category || "Main Course",
    };

    const updatedRecipes = [recipeWithMetadata, ...recipes];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // Function to delete a recipe
  const deleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // Function to update a recipe
  const updateRecipe = (recipeId, updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // Function to increment recipe views
  const incrementViews = (recipeId) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === recipeId
        ? { ...recipe, views: (recipe.views || 0) + 1 }
        : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // Function to handle likes
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
