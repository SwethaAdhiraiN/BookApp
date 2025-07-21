import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './Routes';

// PUBLIC_INTERFACE
function App() {
  // theme toggle support retained
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="App">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            style={{ position: 'absolute', right: 0, top: 0, margin: 16, zIndex: 1000 }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <AppRoutes />
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
