import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../api";

// PUBLIC_INTERFACE
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  async function login({ username, password }) {
    const resp = await apiFetch("/users/login/", "POST", { username, password }, false);
    localStorage.setItem("token", resp.token ?? "");
    setUser(resp.user);
    return resp;
  }
  async function logout() {
    await apiFetch("/users/logout/", "POST");
    localStorage.removeItem("token");
    setUser(null);
  }
  async function register({ username, email, password, password2 }) {
    const resp = await apiFetch("/users/register/", "POST", { username, email, password, password2 }, false);
    return resp;
  }
  async function loadProfile() {
    try {
      const data = await apiFetch("/users/me/", "GET");
      setUser(data);
    } catch {
      setUser(null);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) loadProfile().finally(() => setAuthReady(true));
    else setAuthReady(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, authReady, login, logout, register, loadProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
