import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams pour récupérer l'id depuis l'URL, useNavigate pour le bouton retour
import type { User } from '../types/user'; // Type pour typer le state
import './UserDetail.css'; 

export default function UserDetail() {
  const { id } = useParams<{ id: string }>(); // Récupération de l'id de l'utilisateur depuis l'URL
  const navigate = useNavigate(); // Pour naviguer en arrière
  const [user, setUser] = useState<User | null>(null); // State pour stocker l'utilisateur
  const [loading, setLoading] = useState(true); // State chargement
  const [error, setError] = useState<string | null>(null); // State erreur

  useEffect(() => {
    if (!id) return; // Si aucun id, ne fait rien
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        // Appel à l'API pour récupérer les détails de l'utilisateur
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

        const data = await res.json();
        setUser(data); // Stockage des données de l'utilisateur
      } catch (err: any) {
        setError(err.message || 'Erreur réseau'); // Gestion des erreurs
      } finally {
        setLoading(false); // Fin du chargement
      }
    }

    fetchUser();
  }, [id]); // Dépendance : id

  if (loading) return <p>Chargement du profil...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;
  if (!user) return <p>Aucun utilisateur trouvé</p>;

  return (
    <div className="user-detail">
      {/* Bouton pour revenir en arrière */}
      <button className="back-btn" onClick={() => navigate(-1)}>← Retour</button>

      {/* Affichage des détails */}
      <img className="detail-image" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <h2>{user.firstName} {user.lastName} ({user.age} ans)</h2>
      <p>Email : {user.email}</p>
      <p>Téléphone : {user.phone}</p>
      <p>Société : {user.company?.name} — {user.company?.title}</p>
      <p>Ville : {user.address?.city}</p>
      <p>Adresse : {user.address?.address}</p>
    </div>
  );
}
