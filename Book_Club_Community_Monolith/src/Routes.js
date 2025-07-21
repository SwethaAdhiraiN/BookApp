import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Lazy imports for code splitting/fast load
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profile = lazy(() => import("./pages/auth/Profile"));
const Clubs = lazy(() => import("./pages/clubs/Clubs"));
const ClubDetail = lazy(() => import("./pages/clubs/ClubDetail"));
const Events = lazy(() => import("./pages/events/Events"));
const Forums = lazy(() => import("./pages/forums/Forums"));
const ThreadDetail = lazy(() => import("./pages/forums/ThreadDetail"));
const Polls = lazy(() => import("./pages/polls/Polls"));
const Notifications = lazy(() => import("./pages/notifications/Notifications"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PrivateRoute({ children, roles }) {
  const { user, authReady } = useAuth();
  if (!authReady) return null;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.some(role => user?.is_superuser)) return <Navigate to="/" />;
  return children;
}

// PUBLIC_INTERFACE
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div style={{ margin: 40, textAlign: 'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/clubs" element={<PrivateRoute><Clubs /></PrivateRoute>} />
          <Route path="/clubs/:id" element={<PrivateRoute><ClubDetail /></PrivateRoute>} />
          <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
          <Route path="/forums" element={<PrivateRoute><Forums /></PrivateRoute>} />
          <Route path="/forums/threads/:id" element={<PrivateRoute><ThreadDetail /></PrivateRoute>} />
          <Route path="/polls" element={<PrivateRoute><Polls /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
