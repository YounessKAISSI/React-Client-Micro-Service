import React, { useState } from 'react';

export function NewCustomer() {
  const [formData, setFormData] = useState({
    id: '', // ID du client (unique)
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  // Gestion des changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rafraîchissement de la page

    try {
      const response = await fetch(`http://localhost:8888/customer-service/api/customers/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Le client a été ajouté avec succès.');
        setFormData({ id: '', name: '', email: '' }); // Réinitialise le formulaire
      } else {
        const errorData = await response.json();
        setMessage(`Erreur: ${errorData.message || 'Impossible d’ajouter le client.'}`);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setMessage('Erreur réseau ou problème avec le serveur.');
    }
  };

  return (
    <div>
      <h1>Ajouter un nouveau client</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            ID :
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Nom :
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        
        <button type="submit">Ajouter le client</button>
      </form>
    </div>
  );
}

export default NewCustomer;