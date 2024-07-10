import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'; // Added Card to the imports
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../Style/styles.css';
import { createCompany, deleteCompany, getCompanies } from '../apiService';

const Company = () => {
  const [validated, setValidated] = useState(false);
  const [companies, setCompanies] = useState([]);
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
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        await createCompany(company);
        fetchCompanies(); // Refresh the list of companies
      } catch (error) {
        console.error('Error creating company:', error);
      }
    }

    setValidated(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      fetchCompanies(); // Refresh the list of companies
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  return (
    <Container>
      <h1>Add Company</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Company Name *</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Company name"
              name="name"
              value={company.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a company name.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Company Type *</Form.Label>
            <Form.Control
              as="select"
              required
              name="type"
              value={company.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="Type1">Type 1</option>
              <option value="Type2">Type 2</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a company type.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Source Type</Form.Label>
            <Form.Control
              as="select"
              name="sourceType"
              value={company.sourceType}
              onChange={handleChange}
            >
              <option value="">Select source type</option>
              <option value="SourceType1">Source Type 1</option>
              <option value="SourceType2">Source Type 2</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Responsible User</Form.Label>
            <Form.Control
              as="select"
              name="responsibleUser"
              value={company.responsibleUser}
              onChange={handleChange}
            >
              <option value="">Select responsible user</option>
              <option value="User1">User 1</option>
              <option value="User2">User 2</option>
            </Form.Control>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom05">
            <Form.Label>Background Information</Form.Label>
            <Form.Control
              type="text"
              placeholder="Background information"
              name="backgroundInfo"
              value={company.backgroundInfo}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              placeholder="Language"
              name="language"
              value={company.language}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Campaign</Form.Label>
            <Form.Control
              type="text"
              placeholder="Campaign"
              name="campaign"
              value={company.campaign}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom08">
            <Form.Label>Area Sales Manager</Form.Label>
            <Form.Control
              type="text"
              placeholder="Area sales manager"
              name="areaSalesManager"
              value={company.areaSalesManager}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom09">
            <Form.Label>Zip Code *</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Zip code"
              name="zipCode"
              value={company.zipCode}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a zip code.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom10">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              value={company.city}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom11">
            <Form.Label>Region</Form.Label>
            <Form.Control
              as="select"
              name="region"
              value={company.region}
              onChange={handleChange}
            >
              <option value="">Select region</option>
              <option value="Region1">Region 1</option>
              <option value="Region2">Region 2</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom12">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Germany"
              name="germany"
              value={company.germany}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom13">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              name="phone"
              value={company.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom14">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={company.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom15">
            <Form.Label>Fax</Form.Label>
            <Form.Control
              type="text"
              placeholder="Fax"
              name="fax"
              value={company.fax}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom16">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Website"
              name="website"
              value={company.website}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom17">
            <Form.Label>Visibility</Form.Label>
            <Form.Control
              as="select"
              name="visibility"
              value={company.visibility}
              onChange={handleChange}
            >
              <option value="">Select visibility</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Button type="submit">Add Company</Button>
      </Form>

      
  
      <Link to="/List">
        <Button variant="secondary" className="mt-3">Display Companies</Button>
      </Link>
    </Container>
  );
};

export default Company;
