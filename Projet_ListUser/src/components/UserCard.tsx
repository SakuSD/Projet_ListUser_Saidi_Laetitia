import React from 'react';
import type { User } from '../types/user';
import { useNavigate } from 'react-router-dom';
import './UserCard.css';

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const navigate = useNavigate();

  return (
    <div className="user-card">
      <img className="user-image" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <p>{user.firstName} {user.lastName}</p>
      <p>{user.email}</p>
      <button onClick={() => navigate(`/user/${user.id}`)}>
        Voir les détails
      </button>
    </div>
  );
}
