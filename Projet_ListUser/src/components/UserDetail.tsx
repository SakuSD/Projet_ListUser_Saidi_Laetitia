import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { User } from '../types/user';

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
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>← Retour à la liste</button>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email : {user.email}</p>
      <p>Âge : {user.age}</p>
      <p>Téléphone : {user.phone}</p>
      <p>Adresse : {user.address?.address}, {user.address?.city}, {user.address?.postalCode}</p>
      <p>Société : {user.company?.name} — {user.company?.title}</p>
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
  );
}
