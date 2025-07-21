import React, { useEffect, useState } from "react";
import { apiFetch } from "../../api";

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/adminpanel/dashboard/")
      .then(setStats)
      .catch(e => setError(e?.detail || "Failed to load admin dashboard"));
  }, []);

  if (error) return <div style={{ margin: 32, color: "red" }}>Admin Dashboard Error: {error}</div>;
  if (!stats) return <div style={{ margin: 32 }}>Loading admin stats...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "48px auto" }}>
      <h1>Admin Dashboard</h1>
      <table style={{ width: "100%", marginTop: 32, borderCollapse: "collapse" }}>
        <tbody>
          <tr><td><b>Total Users:</b></td><td>{stats.users}</td></tr>
          <tr><td><b>Total Clubs:</b></td><td>{stats.clubs}</td></tr>
          <tr><td><b>Total Threads:</b></td><td>{stats.threads}</td></tr>
          <tr><td><b>Total Polls:</b></td><td>{stats.polls}</td></tr>
          <tr><td><b>Total Notifications:</b></td><td>{stats.notifications}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
