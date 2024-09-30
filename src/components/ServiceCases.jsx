import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { FaEdit, FaPlusCircle, FaSearch, FaThermometerEmpty, FaThermometerFull, FaThermometerHalf, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { deleteServiceCase, getServiceCases } from '../apiService';
const ServiceCases = () => {
  const [serviceCases, setServiceCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCases, setFilteredCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const navigate = useNavigate();

  const calculatePriorityIcon = (dateOpened, dateClosed) => {
    const opened = new Date(dateOpened);
    const closed = new Date(dateClosed);
    const diffTime = Math.abs(closed - opened);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 2) {
      return <FaThermometerFull color="red" />;
    } else if (diffDays >= 2 && diffDays <= 4) {
      return <FaThermometerHalf color="yellow" />;
    } else {
      return <FaThermometerEmpty color="green" />;
    }
  };

  useEffect(() => {
    fetchServiceCases();
  }, []);

  const fetchServiceCases = async () => {
    try {
      const response = await getServiceCases();
      setServiceCases(response.data);
      setFilteredCases(response.data);
    } catch (error) {
      console.error('Error fetching service cases:', error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredCases(serviceCases);
    } else {
      const filtered = serviceCases.filter((serviceCase) =>
        serviceCase.serviceCaseNo && serviceCase.serviceCaseNo.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCases(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteServiceCase(id);
      fetchServiceCases();
    } catch (error) {
      console.error('Error deleting service case:', error);
    }
  };

  const handleAddServiceCase = () => {
    navigate('/service-case');
  };

  const handleEditServiceCase = (id) => {
    navigate(`/modifier-service/${id}`);
  };

  const handleShowDetails = (serviceCase) => {
    setSelectedCase(serviceCase);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCase(null);
  };

  return (
    <Container>
    <h1 className="mt-5 text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.2rem'}}>Service Cases List</h1>
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
            placeholder="Search service"
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

      <Table striped bordered hover responsive className="table-custom"style={{transform: "translate(0px, -0px)" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Service Case No</th>
            <th>Status</th>
            <th>Priority</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <TransitionGroup component="tbody">
          {filteredCases.map((serviceCase, index) => (
            <CSSTransition key={serviceCase.id} timeout={500} classNames="fade">
              <tr className="table-row">
                <td>{index + 1}</td>
                <td>{serviceCase.serviceCaseNo}</td>
                <td>{serviceCase.status}</td>
                <td>{calculatePriorityIcon(serviceCase.dateOpened, serviceCase.dateClosed)}</td>
                <td className="button-container">
                  <Button variant="info" onClick={() => handleShowDetails(serviceCase)}>
                    Show Details
                  </Button>
                  <Button variant="primary" onClick={() => handleEditServiceCase(serviceCase.id)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(serviceCase.id)}>
                    <FaTrashAlt /> Delete
                  </Button>
                </td>
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Table>
      <button className="transparent-button" onClick={handleAddServiceCase}>
        <FaPlusCircle /> Add Service Case
      </button>

      <Modal show={showModal} onHide={handleCloseModal} className="service-case-details">
        <Modal.Header closeButton>
          <Modal.Title>Service Case Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCase && (
            <>
              <p><strong>ID:</strong> {selectedCase.id}</p>
              <p><strong>Service Case No:</strong> {selectedCase.serviceCaseNo}</p>
              <p><strong>Description:</strong> {selectedCase.description}</p>
              <p><strong>Status:</strong> {selectedCase.status}</p>
              <p><strong>Date Opened:</strong> {selectedCase.dateOpened}</p>
              <p><strong>Date Closed:</strong> {selectedCase.dateClosed}</p>
              <p><strong>Company:</strong> {selectedCase.company}</p>
              <p><strong>Technician:</strong> {selectedCase.technician}</p>
              <p><strong>Service Case Template:</strong> {selectedCase.serviceCaseTemplate}</p>
              <p><strong>Service Object:</strong> {selectedCase.serviceObject}</p>
              <p><strong>Affected Company:</strong> {selectedCase.affectedCompany}</p>
              <p><strong>Contact Person:</strong> {selectedCase.contactPerson}</p>
              <p><strong>Affected Installation:</strong> {selectedCase.affectedInstallation}</p>
              <p><strong>Originating Service Order:</strong> {selectedCase.originatingServiceOrder}</p>
              <p><strong>Originating Job:</strong> {selectedCase.originatingJob}</p>
              <p><strong>Skills:</strong> {selectedCase.skills}</p>
              <p><strong>Checklist:</strong> {selectedCase.checklist}</p>
              <p><strong>Element:</strong> {selectedCase.element}</p>
              <p><strong>Message:</strong> {selectedCase.message}</p>
              <p><strong>Priority:</strong> {selectedCase.priority}</p>
              <p><strong>Service Case Category:</strong> {selectedCase.serviceCaseCategory}</p>
              <p><strong>Responsible User:</strong> {selectedCase.responsibleUser}</p>
              <p><strong>Visibility:</strong> {selectedCase.visibility}</p>
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

export default ServiceCases;
