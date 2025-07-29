import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthForm from './components/AuthForm.jsx';

// Prefer env var but fall back to localhost for dev
const API_BASE = (import.meta.env.VITE_BASE_URL
  ? `${import.meta.env.VITE_BASE_URL}/api`
  : 'http://localhost:3000/api');

function Root() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleAuth = (jwt) => {
    if (jwt) {
      localStorage.setItem('token', jwt);
      setToken(jwt);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return <AuthForm apiBase={API_BASE} onAuth={handleAuth} />;
  }

  return <App onLogout={handleLogout} />;
}

createRoot(document.getElementById('root')).render(<Root />);

export default Root;
