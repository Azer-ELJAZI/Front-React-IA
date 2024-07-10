import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newClient = {
      id: clients.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
    setClients([...clients, newClient]);
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleDeleteClient = (clientId) => {
    const updatedClients = clients.filter((client) => client.id !== clientId);
    setClients(updatedClients);
  };

  return (
    <div className="container mt-4">
      <h2>Client Management</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Client
        </Button>
      </Form>
      <hr />
      <h3>Clients List</h3>
      <ListGroup>
        {clients.map((client) => (
          <ListGroup.Item key={client.id}>
            {client.name} - {client.email} - {client.phone}
            <Button
              className="ms-2"
              variant="danger"
              size="sm"
              onClick={() => handleDeleteClient(client.id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ClientPage;
