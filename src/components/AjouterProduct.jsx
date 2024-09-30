import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createProductFamily } from '../apiService';

const AjouterProduct = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProductFamily({ name });
      // Redirection vers /list-product après création réussie
      // Notez que vous pouvez également simplement utiliser <Link to="/list-product">Annuler</Link> directement
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la famille de produits :', error);
    }
  };

  return (
    <Container>
      <h1>Ajouter une famille de produits</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le nom du produit"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Ajouter
        </Button>
        {/* Utilisation de Link pour la navigation */}
        <Link to="/list-product" className="btn btn-secondary ms-2">
          Annuler
        </Link>
      </Form>
    </Container>
  );
};

export default AjouterProduct;
