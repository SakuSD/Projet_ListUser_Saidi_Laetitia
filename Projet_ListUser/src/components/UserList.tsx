import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import type { User } from '../types/user';
import './UserList.css';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Recherche
  const [sortBy, setSortBy] = useState<'name' | 'age' | ''>(''); // Tri

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
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

  // 1️⃣ Filtrage
  const filteredUsers = users.filter(user =>
    (user.firstName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.lastName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2️⃣ Tri
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.firstName.localeCompare(b.firstName);
    if (sortBy === 'age') return (a.age ?? 0) - (b.age ?? 0); // gestion undefined
    return 0;
  });

  if (loading) return <p className="loading">Chargement des utilisateurs...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;

  return (
    <div className="user-list-wrapper">
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom, prénom ou email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Sélecteur de tri */}
      <div className="sort-container">
        <label htmlFor="sort">Trier par : </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'age' | '')}
          className="sort-select"
        >
          <option value="">Aucun</option>
          <option value="name">Nom</option>
          <option value="age">Âge</option>
        </select>
      </div>

      {/* Liste des cartes */}
      <div className="user-list-container">
        {sortedUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
