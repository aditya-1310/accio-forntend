import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthForm from './components/AuthForm.jsx';



function Root() {
  const [token, setToken] = useState(localStorage.getItem('token'));
// Prefer env var but fall back to localhost for dev
const API_BASE = (import.meta.env.VITE_BASE_URL
  ? `${import.meta.env.VITE_BASE_URL}`
  : 'http://localhost:3000/api');

  console.log(API_BASE);  
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

  return <App apiBase={API_BASE} onLogout={handleLogout} />;
}

createRoot(document.getElementById('root')).render(<Root />);

export default Root;
