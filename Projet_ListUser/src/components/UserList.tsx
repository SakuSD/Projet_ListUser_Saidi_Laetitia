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
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  // 🧠 Fonction séparée pour charger les utilisateurs avec une gestion d’erreur propre
  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('https://dummyjson.com/users');

      // Vérification de la réponse HTTP
      if (!res.ok) {
        throw new Error(`Erreur du serveur : ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      // Vérification de la structure attendue
      if (!data.users || !Array.isArray(data.users)) {
        throw new Error("Les données reçues ne sont pas valides.");
      }

      setUsers(data.users);
    } catch (err: any) {
      // Gestion d’erreurs précises
      if (err.name === 'TypeError') {
        setError("Impossible de se connecter à l'API. Vérifiez votre connexion internet.");
      } else {
        setError(err.message || "Une erreur inattendue est survenue.");
      }
      console.error("Erreur lors du chargement :", err);
    } finally {
      // Toujours désactiver le chargement
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔎 Filtrage
  const filteredUsers = users.filter(user =>
    (user.firstName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.lastName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔤 Tri
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.firstName.localeCompare(b.firstName);
    if (sortBy === 'age') return (a.age ?? 0) - (b.age ?? 0);
    return 0;
  });

  // 📄 Pagination
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // 🕐 État de chargement
  if (loading) return <p className="loading">Chargement des utilisateurs...</p>;

  // ❌ État d’erreur
  if (error) {
    return (
      <div className="error-container">
        <p className="error">{error}</p>
        <button onClick={fetchUsers} className="retry-btn">Réessayer</button>
      </div>
    );
  }

  // ✅ Affichage principal
  return (
    <div className="user-list-wrapper">
      <input
        type="text"
        placeholder="Rechercher par nom, prénom ou email"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="search-input"
      />

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
