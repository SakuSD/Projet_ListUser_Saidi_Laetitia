import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  image: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('https://dummyjson.com/users');
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

        const data = await res.json();
        setUsers(data.users); // data.users contient la liste des utilisateurs
        setLoading(false);

        // Affichage dans la console pour debug
        console.log('Liste des utilisateurs :', data.users);
      } catch (err: any) {
        setError(err.message || 'Erreur réseau');
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des utilisateurs</h1>
      {users.map(user => (
        <div key={user.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
          <img src={user.image} alt={user.firstName} style={{ width: 50, borderRadius: '50%' }} />
          <p><strong>{user.firstName} {user.lastName}</strong></p>
          <p>Email : {user.email}</p>
          <p>Âge : {user.age}</p>
          <p>Téléphone : {user.phone}</p>
        </div>
      ))}
    </div>
  );
}
