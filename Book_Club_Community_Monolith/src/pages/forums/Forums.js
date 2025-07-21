import React, { useEffect, useState } from "react";
import { apiFetch } from "../../api";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Forums() {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/forums/threads/")
      .then(data => setThreads(data))
      .catch(e => setError(e?.detail || "Failed to load the forums"));
  }, []);

  if (error) return <div style={{ margin: 32, color: "red" }}>Forums Error: {error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h1>Discussion Forums</h1>
      {threads.length === 0 ? (
        <p>No discussion threads available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {threads.map(thread => (
            <li key={thread.id} style={{
              padding: "14px 22px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: 7,
              marginBottom: 15
            }}>
              <Link to={`/forums/threads/${thread.id}`} style={{ fontWeight: 600, fontSize: 18 }}>
                {thread.title}
              </Link>
              <div style={{ fontSize: 13, color: "#666", marginTop: 7 }}>
                Club: {thread.club} | By: {thread.created_by} | {new Date(thread.created_at).toLocaleDateString()}
              </div>
              {thread.is_review && (
                <span style={{
                  marginLeft: 12, fontSize: 12, fontWeight: 500, color: "#f86b0f"
                }}>Book Review</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
