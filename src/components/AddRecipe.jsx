import { useState } from "react";
import "../styles/AddRecipe.css";

function AddRecipe({ onSubmitRecipe, onBack }) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("Veg");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !cuisine.trim() || !ingredients.trim() || !instructions.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: name.trim(),
      cuisine: cuisine.trim(),
      category,
      time: time.trim() || "Not specified",
      image: image.trim() || "https://placehold.co/600x400?text=My+Recipe",
      ingredients: ingredients.split("\n").map((item) => item.trim()).filter(Boolean),
      instructions: instructions.split("\n").map((item) => item.trim()).filter(Boolean)
    };

    onSubmitRecipe(newRecipe);
  }

  return (
    <section className="add-recipe-page">
      <h2>🍳 Submit Your Recipe</h2>
      <p>Share your favorite recipe with everyone!</p>

      <form className="add-recipe-form" onSubmit={handleSubmit}>
        <label>Recipe Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Paneer Butter Masala" required />

        <label>Cuisine *</label>
        <input value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="e.g. North Indian" required />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Snacks</option>
          <option>Dinner</option>
          <option>Starters</option>
          <option>Soups</option>
          <option>Drinks</option>
          <option>Ice Creams</option>
          <option>Desserts</option>
          <option>Special Recipes</option>
        </select>

        <label>Cooking Time</label>
        <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. 30 minutes" />

        <label>Image URL (optional)</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Paste recipe image URL" />

        <label>Ingredients (one per line) *</label>
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder={"2 tomatoes\n1 onion\n1 tsp salt"} rows="5" required />

        <label>Instructions (one step per line) *</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder={"Wash and chop the ingredients\nHeat oil in a pan\nCook and serve"} rows="6" required />

        <button type="submit">Submit Recipe</button>
        <button type="button" onClick={onBack} className="back-recipe-btn">Back</button>
      </form>
    </section>
  );
}

export default AddRecipe;