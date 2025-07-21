import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useNavigate, Link, Navigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * Login page for Book Club Community.
 * - Authenticates user using AuthContext
 * - Handles error messages and redirects on success
 * - Prevents login if already authenticated
 */
export default function Login() {
  const { user, authReady, login } = useAuth();
  const { notify } = useNotifications();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Already authenticated - redirect to home
  if (authReady && user) {
    return <Navigate to="/" />;
  }

  // Handle input change
  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Handle login submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      notify("Login successful", "success");
      navigate("/");
    } catch (err) {
      setError(err?.error || "Login failed. Please check your credentials.");
      notify(err?.error || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "56px auto",
      background: "var(--bg-secondary)",
      border: "1px solid var(--border-color)",
      borderRadius: 10,
      padding: "32px 26px 24px 26px",
      boxShadow: "0 2px 12px #0001"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: 20,
        fontSize: 30,
        fontWeight: 700
      }}>Sign In</h1>
      <form onSubmit={onSubmit} autoComplete="on">
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={onChange}
            required
            autoFocus
            autoComplete="username"
            placeholder="Username"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: 16,
              borderRadius: 7,
              border: "1px solid var(--border-color)"
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            autoComplete="current-password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: 16,
              borderRadius: 7,
              border: "1px solid var(--border-color)"
            }}
          />
        </div>
        {error && (
          <div style={{ color: "red", fontWeight: 500, marginBottom: 14 }}>
            {error}
          </div>
        )}
        <button
          className="btn btn-large"
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 0",
            fontSize: 17,
            fontWeight: 700,
            border: 0,
            borderRadius: 7,
            background: "var(--button-bg)",
            color: "var(--button-text)",
            cursor: "pointer"
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div style={{ marginTop: 18, textAlign: "center", fontSize: 15 }}>
          New user? <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
}
