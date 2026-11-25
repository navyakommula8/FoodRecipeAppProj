import { useState } from "react";
import "../styles/Admin.css";

function AdminLogin({ onAdminLogin, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      username === "admin" &&
      password === "admin123"
    ) {
      onAdminLogin();
    } else {
      setError("Invalid admin username or password");
    }
  }

  return (
    <div className="admin-login-overlay">

      <div className="admin-login-box">

        <button
          className="admin-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2>🔐 Admin Login</h2>

        <p>Welcome to Food Recipe App Admin</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button type="submit">
            Login as Admin
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;