import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des utilisateurs</h1>
      <Routes>
        <Route path="/" element={<UserList />} />           {/* Page liste */}
        <Route path="/user/:id" element={<UserDetail />} /> {/* Page détails */}
      </Routes>
    </div>
  );
}
