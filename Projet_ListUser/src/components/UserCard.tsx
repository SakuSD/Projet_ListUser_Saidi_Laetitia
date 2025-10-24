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
      {/* Toujours visibles */}
      <img className="user-image" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <div className="user-info">
        <p className="user-name">{user.firstName} {user.lastName}</p>
        <p className="user-email">{user.email}</p>

        {/* Bouton pour afficher/masquer les détails */}
        <button 
          className="details-btn" 
          onClick={() => setShowDetails(prev => !prev)}
        >
          {showDetails ? 'Masquer les détails' : 'Voir les détails'}
        </button>

        {/* Détails supplémentaires */}
        {showDetails && (
          <div className="user-extra-details">
            <p>Âge : {user.age}</p>
            <p>Téléphone : {user.phone}</p>
            <p>Société : {user.company?.name} — {user.company?.title}</p>
            <p>Adresse : {user.address?.address}</p>
            <p>Ville : {user.address?.city}</p>
            <p>Code postal : {user.address?.postalCode}</p>
            <p>Username : {user.username}</p>
            <p>IP : {user.ip}</p>
            <p>Domain : {user.domain}</p>
            <p>Université : {user.university}</p>
            {user.bank && (
              <>
                <p>Banque : {user.bank.name}</p>
                <p>IBAN : {user.bank.iban}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
