import React, { useState } from 'react';
import type { User } from '../types/user';
import './UserCard.css';

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="user-card">
      <img className="user-image" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <div className="user-info">
        <p className="user-name">{user.firstName} {user.lastName}</p>
        <p className="user-email">{user.email}</p>

        <button 
          className="details-btn" 
          onClick={() => setShowDetails(prev => !prev)}
        >
          {showDetails ? 'Masquer les détails' : 'Voir les détails'}
        </button>

        {showDetails && (
          <div className="user-extra-details">
            <p>Âge : {user.age}</p>
            <p>Téléphone : {user.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
