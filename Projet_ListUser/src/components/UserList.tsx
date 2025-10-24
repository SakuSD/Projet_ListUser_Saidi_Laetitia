import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import type { User } from '../types/user';
import './UserList.css';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'age' | ''>('');
  const [currentPage, setCurrentPage] = useState(1); // ← page actuelle

  const usersPerPage = 10; // ← 10 utilisateurs par page

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

  // Filtrage
  const filteredUsers = users.filter(user =>
    (user.firstName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.lastName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tri
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.firstName.localeCompare(b.firstName);
    if (sortBy === 'age') return (a.age ?? 0) - (b.age ?? 0);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);

  // Changer de page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p className="loading">Chargement des utilisateurs...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;

  return (
    <div className="user-list-wrapper">
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom, prénom ou email"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset à la première page
        }}
        className="search-input"
      />

      {/* Sélecteur de tri */}
      <div className="sort-container">
        <label htmlFor="sort">Trier par : </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as 'name' | 'age' | '');
            setCurrentPage(1);
          }}
          className="sort-select"
        >
          <option value="">Aucun</option>
          <option value="name">Nom</option>
          <option value="age">Âge</option>
        </select>
      </div>

      {/* Liste des cartes */}
      <div className="user-list-container">
        {paginatedUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          ◀ Précédent
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant ▶
        </button>
      </div>
    </div>
  );
}
