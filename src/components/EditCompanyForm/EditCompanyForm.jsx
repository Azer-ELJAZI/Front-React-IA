import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';
import './EditCompanyForm.css';

const EditCompanyForm = ({ companyId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    sourceType: '',
    responsibleUser: '',
    backgroundInfo: '',
    language: '',
    campaign: '',
    areaSalesManager: '',
    zipCode: '',
    city: '',
    region: '',
    germany: '',
    phone: '',
    email: '',
    fax: '',
    website: '',
    visibility: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5188/api/Companies/${companyId}`);
        const company = response.data;
        setFormData({
          ...company,
          ID: companyId
        });
      } catch (error) {
        console.error('Error fetching company details:', error);
        // Handle error as needed
      }
    };

    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log('Submitting with formData:', formData);

      const response = await axios.put(`http://localhost:5188/api/Companies/${companyId}`, formData);
      console.log('Update response:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Company Updated',
        text: 'Your company has been successfully updated!',
        confirmButtonText: 'OK'
      }).then(() => {
        onClose();
      });
    } catch (error) {
      if (error.response) {
        console.error('Error updating company:', error.message);
        console.error('Server response:', error.response.data);
      } else {
        console.error('Error updating company:', error.message);
      }
      // Handle update error as needed
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="name">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="type">
              <Form.Label>Company Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                
              >
                <option value="">Select type</option>
                <option value="Type1">Type 1</option>
                <option value="Type2">Type 2</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="sourceType">
              <Form.Label>Source Type</Form.Label>
              <Form.Control
                type="text"
                name="sourceType"
                value={formData.sourceType}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="responsibleUser">
              <Form.Label>Responsible User</Form.Label>
              <Form.Control
                type="text"
                name="responsibleUser"
                value={formData.responsibleUser}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="backgroundInfo">
              <Form.Label>Background Info</Form.Label>
              <Form.Control
                type="text"
                name="backgroundInfo"
                value={formData.backgroundInfo}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="language">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="campaign">
              <Form.Label>Campaign</Form.Label>
              <Form.Control
                type="text"
                name="campaign"
                value={formData.campaign}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="areaSalesManager">
              <Form.Label>Area Sales Manager</Form.Label>
              <Form.Control
                type="text"
                name="areaSalesManager"
                value={formData.areaSalesManager}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="region">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="germany">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="germany"
                value={formData.germany}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="fax">
              <Form.Label>Fax</Form.Label>
              <Form.Control
                type="text"
                name="fax"
                value={formData.fax}
                onChange={handleChange}
                
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="visibility">
              <Form.Label>Visibility</Form.Label>
              <Form.Control
                type="text"
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? 'Updating...' : 'Update Company'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCompanyForm;
