import {
  faBell,
  faBox,
  faBuilding,
  faCog,
  faEnvelope,
  faHome,
  faList,
  faMobileAlt,
  faNewspaper,
  faPlus,
  faRobot,
  faSignOutAlt,
  faTachometerAlt,
  faTasks,
  faThLarge,
  faTv,
  faUser,
  faUsers,
  faVideo
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import './OffcanvasExample.css';

function OffcanvasExample() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);

  const handleNavItemClick = (index) => {
    if (activeLink === index) {
      setActiveLink(null);
    } else {
      setActiveLink(index);
    }
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-blue mb-3">
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={handleOffcanvasToggle}
            />
            <Navbar.Brand className="d-flex align-items-center">
              <span className="text-white">STABLE TEST 0.1</span>
            </Navbar.Brand>
            <Nav.Link
              href="#"
              className="navbar-brand d-flex align-items-center ms-auto"
            >
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                className="me-1"
                style={{ color: "white" }}
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                size="lg"
                className="ms-2"
                style={{ color: "white" }}
              />
            </Nav.Link>

            <Navbar.Offcanvas
              show={showOffcanvas}
              onHide={() => setShowOffcanvas(false)}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              style={{ width: "290px" }}
              className="custom-offcanvas"
            >
              <Offcanvas.Header closeButton style={{ borderBottom: '1px #dee2e4', backgroundColor: '#f8f9fa', color: '#0d87a5' }}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="custom-offcanvas-title">
                  ORDER LIST
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="flex-column">

                <Nav.Link as={Link} to="/articles" className="custom-nav-link">
                    <FontAwesomeIcon icon={faRobot} size="lg" className="me-2" />
                    <span className="nav-text">Chatbot</span>
                  </Nav.Link>
                  
                  <Nav.Link as={Link} to="/" className="custom-nav-link">
                    <FontAwesomeIcon icon={faHome} size="lg" className="me-2" />
                    <span className="nav-text">Home</span>
                  </Nav.Link>
                  
                  <Nav.Link as={Link} to="/dashboard" className="custom-nav-link">
                    <FontAwesomeIcon icon={faTachometerAlt} size="lg" className="me-2" />
                    <span className="nav-text">Dashboard</span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/clients" className="custom-nav-link">
                    <FontAwesomeIcon icon={faUsers} size="lg" className="me-2" />
                    <span className="nav-text">Clients</span>
                  </Nav.Link>

                 

                  <Nav.Link as={Link} to="/company" className="custom-nav-link">
                    <FontAwesomeIcon icon={faBuilding} size="lg" className="me-2" />
                    <span className="nav-text">Company</span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/list" className="custom-nav-link">
                    <FontAwesomeIcon icon={faList} size="lg" className="me-2" />
                    <span className="nav-text">Companies List</span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/service-cases" className="custom-nav-link">
                    <FontAwesomeIcon icon={faTasks} size="lg" className="me-2" />
                    <span className="nav-text">Service Cases</span>
                  </Nav.Link>

                 

                  <Nav.Link as={Link} to="/list-product" className="custom-nav-link">
                    <FontAwesomeIcon icon={faThLarge} size="lg" className="me-2" />
                    <span className="nav-text">Product Families</span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/ajouter-product" className="custom-nav-link">
                    <FontAwesomeIcon icon={faPlus} size="lg" className="me-2" />
                    <span className="nav-text">Add Product Family</span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/form" className="custom-nav-link">
                    <FontAwesomeIcon icon={faTv} size="lg" className="me-2" />
                    <span className="nav-text">Form Example</span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/article" className="custom-nav-link">
                    <FontAwesomeIcon icon={faNewspaper} size="lg" className="me-2" />
                    <span className="nav-text">Article</span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/dashboard1" className="custom-nav-link">
                    <FontAwesomeIcon icon={faTachometerAlt} size="lg" className="me-2" />
                    <span className="nav-text">Add Product Family </span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/company" className="custom-nav-link">
                    <FontAwesomeIcon icon={faBuilding} size="lg" className="me-2" />
                    <span className="nav-text">Company</span>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/addService" className="custom-nav-link">
                    <FontAwesomeIcon icon={faTasks} size="lg" className="me-2" />
                    <span className="nav-text">Add Service Case</span>
                  </Nav.Link>
                  <Nav.Link
                    as={Link} to="/Imagee" 
                    className="custom-nav-link"
                  >
                    <FontAwesomeIcon icon={faMobileAlt} size="lg" className="me-2" />
                    <span className="nav-text">Détection d'images</span>
                    
                  </Nav.Link>
                  <Nav.Link as={Link} to="/material" className="custom-nav-link">
                    <FontAwesomeIcon icon={faBox} size="lg" className="me-2" />
                    <span className="nav-text">traduire langue des signes</span>
                  </Nav.Link>

                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(1)}
                  >
                    <FontAwesomeIcon icon={faMobileAlt} size="lg" className="me-2" />
                    <span className="nav-text">Mobile workforce client</span>
                    {activeLink === 1 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">Option 1</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option 2</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>

                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(2)}
                  >
                    <FontAwesomeIcon icon={faVideo} size="lg" className="me-2" />
                    <span className="nav-text">Video support client</span>
                    {activeLink === 2 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">Option A</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option B</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>

                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(3)}
                  >
                    <FontAwesomeIcon icon={faTv} size="lg" className="me-2" />
                    <span className="nav-text">Schedule client</span>
                    {activeLink === 3 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">Option X</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option Y</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option Z</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>

                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(6)}
                  >
                    <FontAwesomeIcon icon={faCog} size="lg" className="me-2" />
                    <span className="nav-text">Settings</span>
                    {activeLink === 6 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">General</NavDropdown.Item>
                        <NavDropdown.Item href="#">Privacy</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>

                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(7)}
                  >
                    <FontAwesomeIcon icon={faBell} size="lg" className="me-2" />
                    <span className="nav-text">Notifications</span>
                    {activeLink === 7 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">All</NavDropdown.Item>
                        <NavDropdown.Item href="#">Mentions</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>

                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(4)}
                  >
                    <FontAwesomeIcon icon={faUser} size="lg" className="me-2" />
                    <span className="nav-text">My info</span>
                    {activeLink === 4 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">Option P</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option Q</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>

                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(5)}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="me-2" />
                    <span className="nav-text">Log out</span>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
