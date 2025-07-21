//
// API utility to interact with Django backend REST endpoints
//
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";
function getToken() {
  return localStorage.getItem("token");
}

// PUBLIC_INTERFACE
export async function apiFetch(path, method = "GET", body = null, requiresAuth = true) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (requiresAuth && getToken()) {
    headers["Authorization"] = `Token ${getToken()}`;
  }
  const opts = {
    method,
    headers,
  };
  if (body) opts.body = JSON.stringify(body);
  const response = await fetch(`${BASE_URL}${path}`, opts);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw {status: response.status, ...err};
  }
  return response.json();
}
