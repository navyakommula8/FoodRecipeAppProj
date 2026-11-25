import { useState, useEffect } from "react";

import "../styles/Admin.css";

function AdminDashboard({ onAdminLogout }) {
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [saved, setSaved] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const activity = JSON.parse(
      localStorage.getItem("activityHistory") || "[]"
    );

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const savedRecipes = JSON.parse(
      localStorage.getItem("savedRecipes") || "[]"
    );

    const likedRecipes = JSON.parse(
      localStorage.getItem("likedRecipes") || "[]"
    );

    const recipeReviews = JSON.parse(
      localStorage.getItem("recipeReviews") || "[]"
    );

    setHistory(activity);
    setUsers(registeredUsers);
    setSaved(savedRecipes);
    setLikes(likedRecipes);
    setReviews(recipeReviews);

    setRecipes(
      JSON.parse(localStorage.getItem("recipes") || "[]")
    );
  }, []);

  return (
    <div className="admin-dashboard">

      {/* HEADER */}

      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Food Recipe App Management</p>
        </div>

        <button
          className="admin-logout"
          onClick={onAdminLogout}
        >
          Logout
        </button>
      </div>

      {/* STATISTICS */}

      <div className="admin-stats">

        <div className="admin-card">
          <span>👥</span>
          <h3>Total Users</h3>
          <h2>{users.length}</h2>
        </div>

        <div className="admin-card">
          <span>🍲</span>
          <h3>Total Recipes</h3>
          <h2>{recipes.length}</h2>
        </div>

        <div className="admin-card">
          <span>❤️</span>
          <h3>Total Likes</h3>
          <h2>{likes.length}</h2>
        </div>

        <div className="admin-card">
          <span>🔖</span>
          <h3>Saved Recipes</h3>
          <h2>{saved.length}</h2>
        </div>

        <div className="admin-card">
          <span>⭐</span>
          <h3>Total Reviews</h3>
          <h2>{reviews.length}</h2>
        </div>

      </div>

      {/* USER ACTIVITY */}

      <div className="admin-history">

        <h2>📋 User Activity History</h2>

        {history.length === 0 ? (
          <p className="admin-empty">
            No activity history available yet.
          </p>
        ) : (
          <div className="admin-table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.user || "Guest"}</td>
                    <td>{item.action || "Activity"}</td>
                    <td>{item.details || "-"}</td>
                    <td>{item.date || "-"}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* REGISTERED USERS */}

      <div className="admin-history">

        <h2>👥 Registered Users</h2>

        {users.length === 0 ? (
          <p className="admin-empty">
            No registered users found.
          </p>
        ) : (
          <div className="admin-table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      {user.name || user.username || "-"}
                    </td>

                    <td>
                      {user.email || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* RECIPE REVIEWS */}

      <div className="admin-history">

        <h2>⭐ Recipe Reviews</h2>

        {reviews.length === 0 ? (
          <p className="admin-empty">
            No reviews available yet.
          </p>
        ) : (
          <div className="admin-table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Recipe</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review.id || index}>

                    <td>
                      {review.user || "Guest"}
                    </td>

                    <td>
                      {review.recipeName || "-"}
                    </td>

                    <td>
                      {"⭐".repeat(
                        Math.min(
                          5,
                          Math.max(0, Number(review.rating) || 0)
                        )
                      )}
                    </td>

                    <td>
                      {review.text || review.comment || "-"}
                    </td>

                    <td>
                      {review.date || "-"}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;