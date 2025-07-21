import React, { useEffect, useState } from "react";
import { apiFetch } from "../../api";

// PUBLIC_INTERFACE
export default function Polls() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/polls/")
      .then(data => setPolls(data))
      .catch(e => setError(e?.detail || "Failed to load polls"));
  }, []);

  if (error) return <div style={{ margin: 32, color: "red" }}>Polls Error: {error}</div>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h1>Polls</h1>
      {polls.length === 0 ? (
        <p>No polls available.</p>
      ) : (
        <ul style={{ padding: 0, listStyleType: "none" }}>
          {polls.map(poll => (
            <li
              key={poll.id}
              style={{
                marginBottom: 20,
                border: "1px solid var(--border-color)",
                borderRadius: 8,
                background: "var(--bg-secondary)",
                padding: "18px"
              }}
            >
              <b>{poll.question}</b>
              <div style={{ fontSize: 13, margin: "4px 0 8px 0" }}>
                <span>Created: {new Date(poll.created_at).toLocaleDateString()}</span>
                <span style={{ marginLeft: 17 }}>Club: {poll.club}</span>
              </div>
              {poll.choices && (
                <ul style={{ paddingLeft: 23 }}>
                  {poll.choices.map(choice => (
                    <li key={choice.id}>
                      {choice.text} 
                      <span style={{ color: "#555", marginLeft: 8 }}>Votes: {choice.votes ? choice.votes.length : 0}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
