import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompany, updateCompany } from '../apiService';

const Modifier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState({
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

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await getCompany(id);
      setCompany(response.data);
    } catch (error) {
      console.error('Error fetching company:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompany(id, company);
      navigate('/list'); // Navigate back to the list after updating
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  return (
    <Container>
      <h1>Edit Company</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="name">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={company.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="type">
            <Form.Label>Company Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={company.type}
              onChange={handleChange}
              required
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
              value={company.sourceType}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="responsibleUser">
            <Form.Label>Responsible User</Form.Label>
            <Form.Control
              type="text"
              name="responsibleUser"
              value={company.responsibleUser}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="backgroundInfo">
            <Form.Label>Background Info</Form.Label>
            <Form.Control
              type="text"
              name="backgroundInfo"
              value={company.backgroundInfo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="language">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              name="language"
              value={company.language}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="campaign">
            <Form.Label>Campaign</Form.Label>
            <Form.Control
              type="text"
              name="campaign"
              value={company.campaign}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="areaSalesManager">
            <Form.Label>Area Sales Manager</Form.Label>
            <Form.Control
              type="text"
              name="areaSalesManager"
              value={company.areaSalesManager}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="zipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zipCode"
              value={company.zipCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={company.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="region">
            <Form.Label>Region</Form.Label>
            <Form.Control
              type="text"
              name="region"
              value={company.region}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="germany">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="germany"
              value={company.germany}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={company.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={company.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="fax">
            <Form.Label>Fax</Form.Label>
            <Form.Control
              type="text"
              name="fax"
              value={company.fax}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={company.website}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="visibility">
            <Form.Label>Visibility</Form.Label>
            <Form.Control
              type="text"
              name="visibility"
              value={company.visibility}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default Modifier;
