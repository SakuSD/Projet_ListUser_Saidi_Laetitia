import React, { useEffect, useState } from 'react';
import UserCard from './UserCard'; // Import du composant enfant pour chaque utilisateur
import type { User } from '../types/user'; // Type pour typer le state
import './UserList.css'; 

export default function UserList() {
  // State pour stocker la liste des utilisateurs
  const [users, setUsers] = useState<User[]>([]);
  // State pour gérer le chargement
  const [loading, setLoading] = useState(true);
  // State pour gérer les erreurs
  const [error, setError] = useState<string | null>(null);

  // useEffect s'exécute une seule fois au montage du composant
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        // Appel à l'API DummyJSON
        const res = await fetch('https://dummyjson.com/users');
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

        const data = await res.json();
        setUsers(data.users); // Mise à jour du state avec les utilisateurs

        // Affichage dans la console pour debug
        console.log('Liste des utilisateurs :', data.users);
      } catch (err: any) {
        setError(err.message || 'Erreur réseau'); // En cas d'erreur
      } finally {
        setLoading(false); // Fin du chargement
      }
    }

    fetchUsers(); // On lance le fetch
  }, []); // [] : exécution unique au montage

  if (loading) return <p>Chargement des utilisateurs...</p>; // Affichage pendant le fetch
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>; // Affichage d'erreur

  return (
    <div className="user-list">
      {/* Map sur tous les utilisateurs pour afficher une carte par utilisateur */}
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
