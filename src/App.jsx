import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecipeSection from "./components/RecipeSection";
import SavedRecipes from "./components/SavedRecipes";
import Login from "./components/Login";
import Register from "./components/Register";
import FoodPreference from "./components/FoodPreference";
import AboutChoice from "./components/AboutChoice";
import About from "./components/About";
import Footer from "./components/Footer";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import RecipeReviews from "./components/RecipeReviews";

import AddRecipe from "./components/AddRecipe";
import RecipeCollections from "./components/RecipeCollections";

import recipes from "./data/recipes";

import "./App.css";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("loggedInUser") || ""
  );

  const [authType, setAuthType] = useState(null);
  const [page, setPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  function handleLogin(email) {
    localStorage.setItem("loggedInUser", email);
    setUser(email);
    setAuthType(null);
    setPage("preference");
  }

  function handleRegister() {
    setAuthType("login");
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setUser("");
    setPage("home");
  }

  function handleCloseAuth() {
    setAuthType(null);
  }

  function handlePreference(preference) {
    localStorage.setItem("foodPreference", preference);
    setPage("aboutChoice");
  }

  function handleHome() {
    setPage("home");
  }

  function handleMenu() {
    setPage("menu");
  }

  function handleSavedRecipes() {
    setPage("saved");
  }

  function handleAdmin() {
    setShowAdminLogin(true);
  }

  function handleAdminLogin() {
    setAdminLoggedIn(true);
    setShowAdminLogin(false);
    setPage("admin");
  }

  function handleAdminLogout() {
    setAdminLoggedIn(false);
    setPage("home");
  }

  function handleAbout() {
    setPage("about");
  }

  // SAVE USER SUBMITTED RECIPE
  function handleSubmitRecipe(newRecipe) {
    const userRecipes = JSON.parse(
      localStorage.getItem("userRecipes") || "[]"
    );

    const updated = [...userRecipes, newRecipe];

    localStorage.setItem("userRecipes", JSON.stringify(updated));
    alert("Your recipe has been added successfully!");
    setPage("menu");
  }

  // ALL RECIPES FOR COLLECTIONS
  const userRecipes = JSON.parse(
    localStorage.getItem("userRecipes") || "[]"
  );

  const allRecipes = [...recipes, ...userRecipes];

  return (
    <div className="app">
      <Navbar
        user={user}
        onLogin={() => setAuthType("login")}
        onRegister={() => setAuthType("register")}
        onLogout={handleLogout}
        onHome={handleHome}
        onMenu={handleMenu}
        onSavedRecipes={handleSavedRecipes}
        onAbout={handleAbout}
        onAdmin={handleAdmin}
      />

      {page === "home" && (
        <>
          <Hero />
          <RecipeSection
            onViewRecipe={setSelectedRecipe}
            onAddRecipe={() => setPage("addRecipe")}
            onCollections={() => setPage("collections")}
          />
        </>
      )}

      {page === "menu" && (
        <RecipeSection
          onViewRecipe={setSelectedRecipe}
          onAddRecipe={() => setPage("addRecipe")}
          onCollections={() => setPage("collections")}
        />
      )}

      {page === "saved" && (
        <SavedRecipes onViewRecipe={setSelectedRecipe} />
      )}

      {page === "addRecipe" && (
        <AddRecipe
          onSubmitRecipe={handleSubmitRecipe}
          onBack={handleMenu}
        />
      )}

      {page === "collections" && (
        <RecipeCollections
          recipes={allRecipes}
          onBack={handleMenu}
        />
      )}

      {page === "preference" && (
        <FoodPreference onSelect={handlePreference} />
      )}

      {page === "aboutChoice" && (
        <AboutChoice
          onYes={() => setPage("about")}
          onNo={handleHome}
          onSkip={handleMenu}
        />
      )}

      {page === "about" && <About onHome={handleHome} />}

      {page === "admin" && adminLoggedIn && (
        <AdminDashboard onAdminLogout={handleAdminLogout} />
      )}

      {authType === "login" && (
        <Login
          onLogin={handleLogin}
          onClose={handleCloseAuth}
          onSwitchRegister={() => setAuthType("register")}
        />
      )}

      {authType === "register" && (
        <Register
          onRegister={handleRegister}
          onClose={handleCloseAuth}
          onSwitchLogin={() => setAuthType("login")}
        />
      )}

      {showAdminLogin && (
        <AdminLogin
          onAdminLogin={handleAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {selectedRecipe && (
        <div className="recipe-details-overlay">
          <div className="recipe-details-box">
            <button
              className="close-btn"
              onClick={() => setSelectedRecipe(null)}
            >
              ×
            </button>

            <h2>{selectedRecipe.name}</h2>

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/600x400?text=Recipe+Image";
              }}
            />

            <p><strong>Cuisine:</strong> {selectedRecipe.cuisine}</p>
            <p><strong>Cooking Time:</strong> {selectedRecipe.time}</p>

            <h3>Ingredients</h3>
            <ul>
              {(selectedRecipe.ingredients || []).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h3>Instructions</h3>
            <ol>
              {(selectedRecipe.instructions || []).map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>

            <RecipeReviews recipe={selectedRecipe} user={user} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;