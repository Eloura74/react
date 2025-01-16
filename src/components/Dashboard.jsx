// Importation des dépendances nécessaires
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Composant Dashboard : Interface d'administration pour gérer les recettes
const Dashboard = ({ recipes, onAddRecipe, onDeleteRecipe }) => {
  const navigate = useNavigate();
  const categories = ["Snack", "Divers", "Salade", "Soupe", "Dessert"];

  // États locaux pour gérer le formulaire
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    difficulty: 1,
    category: '',
    description: '',
    imageUrl: '',
    ingredients: [''],
    instructions: [''],
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  // Gestion des changements dans les champs de base du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Gestion des ingrédients
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...newRecipe.ingredients];
    newIngredients[index] = value;
    setNewRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = newRecipe.ingredients.filter((_, i) => i !== index);
    setNewRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Gestion des instructions
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...newRecipe.instructions];
    newInstructions[index] = value;
    setNewRecipe(prev => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    const newInstructions = newRecipe.instructions.filter((_, i) => i !== index);
    setNewRecipe(prev => ({ ...prev, instructions: newInstructions }));
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    if (!newRecipe.title.trim()) newErrors.title = 'Le titre est requis';
    if (newRecipe.difficulty < 1 || newRecipe.difficulty > 5) newErrors.difficulty = 'La difficulté doit être entre 1 et 5';
    if (!newRecipe.category) newErrors.category = 'La catégorie est requise';
    if (!newRecipe.description.trim()) newErrors.description = 'La description est requise';
    if (newRecipe.ingredients.some(i => !i.trim())) newErrors.ingredients = 'Tous les ingrédients doivent être remplis';
    if (newRecipe.instructions.some(i => !i.trim())) newErrors.instructions = 'Toutes les instructions doivent être remplies';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddRecipe({
        ...newRecipe,
        id: `recipe-${Date.now()}`,
        ingredients: newRecipe.ingredients.filter(i => i.trim()),
        instructions: newRecipe.instructions.filter(i => i.trim())
      });
      setNewRecipe({
        title: '',
        difficulty: 1,
        category: '',
        description: '',
        imageUrl: '',
        ingredients: [''],
        instructions: [''],
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#14142B]">
      <div 
        className="relative w-full h-48 mb-8 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/bandeauV2.png")',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <h1 className="text-4xl font-bold text-[#00FF66] z-10">Dashboard</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulaire d'ajout de recette */}
          <div className="bg-[#1F1F3D] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-[#00FF66] mb-6">Ajouter une recette</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Titre:</label>
                <input 
                  type="text" 
                  name="title"
                  value={newRecipe.title}
                  onChange={handleChange}
                  placeholder="Ex: Burger classique"
                  className={`w-full p-2 rounded bg-[#14142B] text-white border ${errors.title ? 'border-red-500' : 'border-gray-600'} focus:border-[#00FF66] focus:outline-none`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Difficulté (1-5):</label>
                <input 
                  type="number" 
                  name="difficulty"
                  value={newRecipe.difficulty}
                  onChange={handleChange}
                  min="1" 
                  max="5"
                  className={`w-full p-2 rounded bg-[#14142B] text-white border ${errors.difficulty ? 'border-red-500' : 'border-gray-600'} focus:border-[#00FF66] focus:outline-none`}
                />
                {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Catégorie:</label>
                <select 
                  name="category"
                  value={newRecipe.category}
                  onChange={handleChange}
                  className={`w-full p-2 rounded bg-[#14142B] text-white border ${errors.category ? 'border-red-500' : 'border-gray-600'} focus:border-[#00FF66] focus:outline-none`}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Description:</label>
                <textarea 
                  name="description"
                  value={newRecipe.description}
                  onChange={handleChange}
                  placeholder="Description de la recette"
                  className={`w-full p-2 rounded bg-[#14142B] text-white border ${errors.description ? 'border-red-500' : 'border-gray-600'} focus:border-[#00FF66] focus:outline-none h-24`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Ingrédients:</label>
                <AnimatePresence>
                  {newRecipe.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-2 mb-2"
                    >
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder={`Ingrédient ${index + 1}`}
                        className="flex-1 p-2 rounded bg-[#14142B] text-white border border-gray-600 focus:border-[#00FF66] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-2 px-4 py-2 bg-[#00FF66] text-[#14142B] rounded hover:bg-[#00CC52]"
                >
                  + Ajouter un ingrédient
                </button>
                {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Instructions:</label>
                <AnimatePresence>
                  {newRecipe.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-2 mb-2"
                    >
                      <textarea
                        value={instruction}
                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                        placeholder={`Étape ${index + 1}`}
                        className="flex-1 p-2 rounded bg-[#14142B] text-white border border-gray-600 focus:border-[#00FF66] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="mt-2 px-4 py-2 bg-[#00FF66] text-[#14142B] rounded hover:bg-[#00CC52]"
                >
                  + Ajouter une instruction
                </button>
                {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00FF66] text-[#14142B] rounded hover:bg-[#00CC52]"
                >
                  + Ajouter
                </button>
              </div>
            </form>
          </div>

          {/* Liste des recettes */}
          <div className="bg-[#1F1F3D] rounded-lg p-6">
            <div 
              className="relative w-full h-48 mb-8 flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: 'url("/images/bandeauV2.png")',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backgroundBlendMode: 'overlay'
              }}
            >
              <h2 className="text-4xl font-bold text-[#00FF66] z-10">Toutes les recettes</h2>
            </div>
            <div className="space-y-4">
              {recipes.map(recipe => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between p-4 bg-[#14142B] rounded"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="text-white">{recipe.title}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      className="p-2 text-[#00FF66] hover:text-[#00CC52]"
                    >
                      👁
                    </button>
                    <button
                      onClick={() => onDeleteRecipe(recipe.id)}
                      className="p-2 text-red-500 hover:text-red-600"
                    >
                      🗑
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
