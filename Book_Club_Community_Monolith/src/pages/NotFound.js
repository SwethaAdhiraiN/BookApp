import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ margin: "60px auto", maxWidth: 600 }}>
      <h1 style={{ fontSize: 40 }}>404 - Not Found</h1>
      <p>Sorry, the page you requested does not exist.</p>
      <Link to="/">Back Home</Link>
    </div>
  );
}
