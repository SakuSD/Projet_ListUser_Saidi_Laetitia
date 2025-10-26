import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { User } from '../types/user';
import './UserDetail.css';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || 'Erreur réseau');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;
  if (!user) return <p>Aucun utilisateur trouvé</p>;

  return (
    <div className="user-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Retour à la liste
      </button>

      <img src={user.image} alt={`${user.firstName}`} className="user-image" />
      <h2>{user.firstName} {user.lastName}</h2>

      <div className="info-cards">
        {/* Informations personnelles */}
        <div className="info-card">
          <h3>Informations personnelles</h3>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Âge :</strong> {user.age}</p>
          <p><strong>Username :</strong> {user.username}</p>
          <p><strong>Téléphone :</strong> {user.phone}</p>
        </div>

        {/* Informations professionnelles */}
        <div className="info-card">
          <h3>Informations professionnelles</h3>
          <p><strong>Adresse :</strong> {user.address?.address}, {user.address?.city}, {user.address?.postalCode}</p>
          <p><strong>Société :</strong> {user.company?.name} — {user.company?.title}</p>
          <p><strong>IP :</strong> {user.ip}</p>
          <p><strong>Domaine :</strong> {user.domain}</p>
          <p><strong>Université :</strong> {user.university}</p>
          {user.bank && (
            <>
              <p><strong>Banque :</strong> {user.bank.name}</p>
              <p><strong>IBAN :</strong> {user.bank.iban}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
