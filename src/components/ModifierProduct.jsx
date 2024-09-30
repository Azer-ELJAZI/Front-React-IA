import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getProductFamily, updateProductFamily } from '../apiService';

const ModifierProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');

  useEffect(() => {
    fetchProductFamily();
  }, []);

  const fetchProductFamily = async () => {
    try {
      const response = await getProductFamily(id);
      setName(response.data.name);
    } catch (error) {
      console.error('Erreur lors de la récupération de la famille de produits :', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProductFamily(id, { name });
      // Redirection après mise à jour réussie
      // Utilisation de Link pour la navigation
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la famille de produits :', error);
    }
  };

  return (
    <Container>
      <h1>Modifier une famille de produits</h1>
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
          Modifier
        </Button>
        {/* Utilisation de Link pour la navigation */}
        <Link to="/list-product" className="btn btn-secondary ms-2">
          Annuler
        </Link>
      </Form>
    </Container>
  );
};

export default ModifierProduct;
