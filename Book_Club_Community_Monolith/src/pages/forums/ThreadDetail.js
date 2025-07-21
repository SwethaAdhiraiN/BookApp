import React, { useEffect, useState } from "react";
import { apiFetch } from "../../api";
import { useParams } from "react-router-dom";

// PUBLIC_INTERFACE
export default function ThreadDetail() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch(`/forums/threads/${id}/`)
      .then(data => setThread(data))
      .catch(e => setError(e?.detail || "Failed to load thread"));

    apiFetch(`/forums/posts/?thread=${id}`)
      .then(data => setPosts(data))
      .catch(() => {}); // Posts are optional to show
  }, [id]);

  if (error) return <div style={{ margin: 32, color: "red" }}>Thread Error: {error}</div>;
  if (!thread) return <div style={{ margin: 32 }}>Loading thread...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Thread: {thread.title}</h2>
      <div style={{ fontSize: 14, color: "#555", marginBottom: 28 }}>
        Club: {thread.club} | By: {thread.created_by} | {new Date(thread.created_at).toLocaleString()}
      </div>
      <hr/>
      <h3>Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map(post => (
            <li key={post.id} style={{
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              marginBottom: 14,
              borderRadius: 8,
              padding: "14px 20px"
            }}>
              <span style={{ fontWeight: 600 }}>{post.author}</span>:
              <span style={{ marginLeft: 12 }}>{post.message}</span>
              <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
                {new Date(post.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
