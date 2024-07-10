import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

const MyNavbar = ({ onSidebarOpen }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Button variant="outline-secondary" onClick={onSidebarOpen}>
        <span className="navbar-toggler-icon"></span>
      </Button>
      <Navbar.Brand href="#home">Test2</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#dashboard">Dashboard</Nav.Link> {/* Lien vers le tableau de bord */}
          <Nav.Link href="#clients">Clients</Nav.Link> {/* Lien vers la gestion des clients */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
