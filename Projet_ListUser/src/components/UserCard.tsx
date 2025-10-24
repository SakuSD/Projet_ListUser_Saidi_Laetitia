import React from 'react';
import type { User } from '../types/user';
import { useNavigate } from 'react-router-dom';
import './UserCard.css';
import { useFavorites } from '../context/FavoritesContext';

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const navigate = useNavigate();

  return (
    <div className="user-card">

     <button
        className={`favorite-btn ${isFavorite(user.id) ? 'active' : ''}`}
        onClick={() => toggleFavorite(user.id)}
        title={isFavorite(user.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        ★
      </button>

      <img className="user-image" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <p>{user.firstName} {user.lastName}</p>
      <p>{user.email}</p>
      <button onClick={() => navigate(`/user/${user.id}`)}>
        Voir les détails
      </button>
    </div>
  );
}
