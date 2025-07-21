import React, { useEffect, useState } from "react";
import { apiFetch } from "../../api";

// PUBLIC_INTERFACE
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/notifications/")
      .then(data => setNotifications(data))
      .catch(e => setError(e?.detail || "Failed to load notifications"));
  }, []);

  if (error) return <div style={{ margin: 32, color: "red" }}>Notifications Error: {error}</div>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Notifications</h1>
      {notifications.length === 0
        ? <p>No notifications.</p>
        : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {notifications.map(n => (
              <li
                key={n.id}
                style={{
                  padding: "14px 18px",
                  marginBottom: 13,
                  border: "1px solid var(--border-color)",
                  borderRadius: 8,
                  background: n.read ? "var(--bg-secondary)" : "#ffe8be",
                  color: "var(--text-primary)",
                  fontWeight: n.read ? 400 : 700
                }}
              >
                {n.message}
                <span style={{ float: "right", fontSize: 12, color: "#696969" }}>
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
