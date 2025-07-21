import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: "48px auto", textAlign: "left" }}>
      <h1>Welcome to the Book Club Community</h1>
      <p>
        Discover new books, connect with readers, join clubs, attend events, participate in discussions, and vote for your next read!
      </p>
      <Link to="/register" className="btn btn-large" style={{ marginRight: 10 }}>Create Account</Link>
      <Link to="/login" className="btn btn-large">Sign In</Link>
    </div>
  );
}
