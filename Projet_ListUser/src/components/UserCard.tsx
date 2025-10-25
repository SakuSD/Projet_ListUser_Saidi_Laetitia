import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';
import './UserCard.css';

export default function UserCard({ user }: { user: User }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // 🔁 Charger les favoris depuis localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(user.id));
  }, [user.id]);

  // 💾 Toggle favoris
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (favorites.includes(user.id)) {
      updatedFavorites = favorites.filter((id: number) => id !== user.id);
    } else {
      updatedFavorites = [...favorites, user.id];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="user-card">
      <button
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={toggleFavorite}
        title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        ★
      </button>

      <img src={user.image} alt={user.firstName} className="user-image" />
      <div className="user-info">
        <p className="user-name">{user.firstName} {user.lastName}</p>
        <p className="user-email">{user.email}</p>

        <button
          className="details-btn"
          onClick={() => navigate(`/user/${user.id}`)}
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
}
