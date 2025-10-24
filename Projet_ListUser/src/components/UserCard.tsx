import React from 'react';
import type { User } from '../types/user'; // On importe le type User pour typer les props
import './UserCard.css'; 

type Props = {
  user: User; // Le composant reçoit un utilisateur en props
};

export default function UserCard({ user }: Props) {
  return (
    <div className="user-card">
      {/* Affiche l'image de l'utilisateur */}
      <img className="user-image" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      
      {/* Informations textuelles de l'utilisateur */}
      <div className="user-info">
        <p className="user-name">{user.firstName} {user.lastName}</p>
        <p className="user-email">{user.email}</p>
      </div>
    </div>
  );
}
