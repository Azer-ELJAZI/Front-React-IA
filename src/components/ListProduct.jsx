import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteProductFamily, getProductFamilies } from '../apiService';

const ListProduct = () => {
  const [productFamilies, setProductFamilies] = useState([]); // Initialisation avec un tableau vide

  useEffect(() => {
    fetchProductFamilies();
  }, []);

  const fetchProductFamilies = async () => {
    try {
      const data = await getProductFamilies();
      setProductFamilies(data); // Mettre à jour productFamilies avec les données reçues
    } catch (error) {
      console.error('Error fetching product families:', error);
      setProductFamilies([]); // En cas d'erreur, initialiser productFamilies avec un tableau vide ou une autre valeur par défaut
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductFamily(id);
      fetchProductFamilies(); // Rafraîchir la liste après la suppression
    } catch (error) {
      console.error('Error deleting product family:', error);
    }
  };

  // Vérifie si productFamilies est null ou vide
  if (productFamilies.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h1>Product Families</h1>
      {productFamilies.length > 0 ? (
        productFamilies.map((family) => (
          <Card key={family.id} className="mb-3">
            <Card.Body>
              <Card.Title>{family.name}</Card.Title>
              <Link to={`/modifier-product/${family.id}`}>
                <Button variant="info" className="me-2">
                  Modifier
                </Button>
              </Link>
              <Button variant="danger" onClick={() => handleDelete(family.id)}>
                Supprimer
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No product families found.</p>
      )}
      <Link to="/ajouter-product">
        <Button variant="success">Ajouter Product Family</Button>
      </Link>
    </Container>
  );
};

export default ListProduct;
