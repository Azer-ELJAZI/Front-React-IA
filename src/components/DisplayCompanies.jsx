import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation
import '../Style/styles.css'; // Assuming your CSS file is named styles.css and is in the Style folder
import { deleteCompany, getCompanies } from '../apiService'; // Import deleteCompany from apiService
import companyImage from '../assets/company2.jpg'; // Change this path as needed

const List = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null); // State to track expanded card ID
  const navigate = useNavigate(); // Access the navigate function from react-router-dom

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
      fetchCompanies(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const toggleAccordion = (id) => {
    if (expandedCardId === id) {
      setExpandedCardId(null); // Close accordion if clicking again
    } else {
      setExpandedCardId(id); // Expand accordion for this card
    }
  };

  const handleAddCompany = () => {
    navigate('/Company'); // Navigate to /Company when button is clicked
  };

  return (
    <Container>
      <h1 className="mt-5">Companies List</h1>

      <Form style={{ marginBottom: '2cm' }}>
        <Form.Group controlId="searchForm">
          <Form.Label>Search Company by Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      <Row>
        {filteredCompanies.map((company) => (
          <Col key={company.id} sm={6} md={4} lg={3}>
            <Card className="mb-4 company-card" onClick={() => toggleAccordion(company.id)}>
              <Card.Img
                variant="top"
                src={companyImage}
                onClick={() => toggleAccordion(company.id)} // Toggle accordion on image click
              />
              <Card.Body onClick={() => toggleAccordion(company.id)}>
                <Card.Title>{company.name}</Card.Title>
                <Accordion expanded={expandedCardId === company.id}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>More Details</Accordion.Header>
                    <Accordion.Body>
                      <p>Type: {company.type}</p>
                      <p>Source Type: {company.sourceType}</p>
                      <p>Responsible User: {company.responsibleUser}</p>
                      <p>Background Info: {company.backgroundInfo}</p>
                      <p>Language: {company.language}</p>
                      <p>Campaign: {company.campaign}</p>
                      <p>Area Sales Manager: {company.areaSalesManager}</p>
                      <p>Zip Code: {company.zipCode}</p>
                      <p>City: {company.city}</p>
                      <p>Region: {company.region}</p>
                      <p>Germany: {company.germany}</p>
                      <p>Phone: {company.phone}</p>
                      <p>Email: {company.email}</p>
                      <p>Fax: {company.fax}</p>
                      <p>Website: {company.website}</p>
                      <p>Visibility: {company.visibility}</p>
                      <Button variant="danger" onClick={() => handleDelete(company.id)} className="mt-3">Delete</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Button to navigate to /Company */}
      <Button variant="primary" size="lg" className="mt-4" style={{ width: '30cm' }} onClick={handleAddCompany}>
        Add New Company
      </Button>
    </Container>
  );
};

export default List;
