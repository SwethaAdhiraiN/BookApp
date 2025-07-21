import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const onLogout = async () => {
    await logout();
    nav("/login");
  };

  return (
    <nav className="navbar" style={{
      padding: "16px 32px",
      borderBottom: "1px solid var(--border-color)",
      background: "var(--bg-secondary)",
      display: "flex",
      alignItems: "center",
      gap: 20,
      boxShadow: "0 2px 6px #0001"
    }}>
      <Link to="/" className="title" style={{ fontWeight: 700, fontSize: 22, textDecoration: "none" }}>
        Book Club Community
      </Link>
      <Link to="/clubs">Clubs</Link>
      <Link to="/events">Events</Link>
      <Link to="/forums">Forums</Link>
      <Link to="/polls">Polls</Link>
      <Link to="/notifications">Notifications</Link>
      {user?.is_superuser && <Link to="/admin">Admin</Link>}
      <div style={{ flex: 1 }} />
      {user ? (
        <>
          <span style={{ marginRight: 12 }}>Hello, <b>{user.username}</b></span>
          <Link to="/profile">Profile</Link>
          <button style={{
            padding: "7px 14px",
            background: "var(--button-bg)",
            color: "var(--button-text)",
            border: 0,
            borderRadius: 5,
            cursor: "pointer"
          }} onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
