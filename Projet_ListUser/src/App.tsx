import React from 'react';
import UserList from './components/UserList';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: 20 }}>
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        🌞 / 🌙 Mode {theme === 'light' ? 'sombre' : 'clair'}
      </button>

      <h1>Liste des utilisateurs</h1>
      <UserList />
    </div>
  );
}
