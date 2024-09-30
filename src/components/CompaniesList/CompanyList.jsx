import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';
import CompanyShowDetails from '../CompanyShowDetails/CompanyShowDetails';
import EditCompanyForm from '../EditCompanyForm/EditCompanyForm';
import './CompanyList.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/Companies');
      // Vérifiez la structure de la réponse ici
      const companiesData = response.data["$values"] || response.data;
      setCompanies(companiesData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleEdit = (id) => {
    setSelectedCompanyId(id);
    setEditMode(true);
  };

  const handleCloseEditForm = () => {
    setEditMode(false);
    setSelectedCompanyId(null);
    fetchCompanies(); // Refresh company list after editing
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this company!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5188/api/Companies/${id}`);
          fetchCompanies();
          Swal.fire(
            'Deleted!',
            'Your company has been deleted.',
            'success'
          );
        } catch (error) {
          console.error(`Error deleting company with id ${id}: `, error);
          Swal.fire(
            'Error!',
            'Failed to delete company.',
            'error'
          );
        }
      }
    });
  };

  const handleShowDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5188/api/Companies/${id}`);
      setSelectedCompany(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error(`Error fetching company with id ${id}: `, error);
      Swal.fire(
        'Error!',
        'Failed to fetch company details.',
        'error'
      );
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          Error: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-3">
      <Card className="modern-table">
        <Card.Body className="modern-table-body">
          <h2 className="article-title my-1">Company List</h2>
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Responsible User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 ? (
                companies.map((company, index) => (
                  <tr key={company.id} className="article-row">
                    <td>{index + 1}</td>
                    <td>{company.name}</td>
                    <td>{company.type}</td>
                    <td>{company.responsibleUser}</td>
                    <td className="actions-column">
                      <Button variant="link" className="action-button" onClick={() => handleEdit(company.id)}>Edit</Button>
                      <Button variant="link" className="action-button" onClick={() => handleDelete(company.id)}>Delete</Button>
                      <Button variant="link" className="action-button" onClick={() => handleShowDetails(company.id)}>Show Details</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No companies found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Body>
        {editMode && selectedCompanyId && (
          <EditCompanyForm
            companyId={selectedCompanyId}
            onClose={handleCloseEditForm}
          />
        )}
        {showDetailsModal && selectedCompany && (
          <CompanyShowDetails
            show={showDetailsModal}
            onHide={() => setShowDetailsModal(false)}
            company={selectedCompany}
          />
        )}
      </Card>
    </Container>
  );
};

export default CompanyList;
