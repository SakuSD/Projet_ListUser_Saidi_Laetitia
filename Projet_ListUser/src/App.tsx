import React, { useEffect, useState } from 'react';
import UserCard from './components/UserCard'; // ← Import de UserCard
import type { User } from './types/user';
import './App.css';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://dummyjson.com/users');
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data = await res.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message || 'Erreur réseau');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des utilisateurs</h1>
      {users.map(user => (
        <UserCard key={user.id} user={user} /> // ← On utilise maintenant UserCard
      ))}
    </div>
  );
}
