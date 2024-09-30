import React from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sidebar</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/clients">Clients</Nav.Link>
          <Nav.Link as={Link} to="/material">Material</Nav.Link>
          <Nav.Link as={Link} to="/company">Company</Nav.Link>
          <Nav.Link as={Link} to="/list">Companies List</Nav.Link>
          <Nav.Link as={Link} to="/service-cases">Service Cases</Nav.Link>
          <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
          
          {/* New links for product families */}
          <Nav.Link as={Link} to="/list-product">Product Families</Nav.Link>
          <Nav.Link as={Link} to="/ajouter-product">Add Product Family</Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
