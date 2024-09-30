import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { FaEdit, FaInfoCircle, FaPlusCircle, FaSearch, FaTrash } from 'react-icons/fa'; // Import des icônes
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../Style/styles.css'; // Assurez-vous que ce fichier CSS inclut les styles supplémentaires ci-dessous
import { deleteCompany, getCompanies } from '../apiService';
import companyImage from '../assets/company2.jpg';
const List = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.data);
      setFilteredCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleAddCompany = () => {
    navigate('/Company');
  };

  const handleEditCompany = (id) => {
    navigate(`/modifier/${id}`);
  };

  const handleShowDetails = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  return (
    <Container>
      <h1 className="mt-5 text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.2rem'}}>Companies List</h1>
      {/* Search Bar */}
       <Form.Group controlId="searchForm" className="search-bar" style={{ marginBottom: '1.9rem', textAlign: 'center' }}>
        <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
          <FaSearch style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999',
          }} />
          <Form.Control
            type="text"
            placeholder="Search company"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              paddingLeft: '40px', 
              borderRadius: '25px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
              height: '45px',
              fontSize: '1.1rem',
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
      </Form.Group>


      <Table striped bordered hover responsive className="table-custom">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Type</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <TransitionGroup component="tbody">
          {filteredCompanies.map((company) => (
            <CSSTransition key={company.id} timeout={500} classNames="fade">
              <tr className="table-row">
                <td>
                  <img src={companyImage} alt="Company" className="company-logo" />
                </td>
                <td>{company.name}</td>
                <td>{company.type}</td>
                <td className="button-container">
                  <Button variant="info" onClick={() => handleShowDetails(company)}>
                    <FaInfoCircle />  Détails
                  </Button>
                  <Button variant="primary" onClick={() => handleEditCompany(company.id)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(company.id)}>
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Table>
      <Button
        variant="success"
        className="transparent-button"
        onClick={handleAddCompany}
      >
        <FaPlusCircle /> Add Company
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} className="company-details">
        <Modal.Header closeButton>
          <Modal.Title>Company Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCompany && (
            <>
              <p><strong>Type:</strong> {selectedCompany.type}</p>
              <p><strong>Source Type:</strong> {selectedCompany.sourceType}</p>
              <p><strong>Responsible User:</strong> {selectedCompany.responsibleUser}</p>
              <p><strong>Background Info:</strong> {selectedCompany.backgroundInfo}</p>
              <p><strong>Language:</strong> {selectedCompany.language}</p>
              <p><strong>Campaign:</strong> {selectedCompany.campaign}</p>
              <p><strong>Area Sales Manager:</strong> {selectedCompany.areaSalesManager}</p>
              <p><strong>Zip Code:</strong> {selectedCompany.zipCode}</p>
              <p><strong>City:</strong> {selectedCompany.city}</p>
              <p><strong>Region:</strong> {selectedCompany.region}</p>
              <p><strong>Country:</strong> {selectedCompany.germany}</p>
              <p><strong>Phone:</strong> {selectedCompany.phone}</p>
              <p><strong>Email:</strong> {selectedCompany.email}</p>
              <p><strong>Fax:</strong> {selectedCompany.fax}</p>
              <p><strong>Website:</strong> {selectedCompany.website}</p>
              <p><strong>Visibility:</strong> {selectedCompany.visibility}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default List;
