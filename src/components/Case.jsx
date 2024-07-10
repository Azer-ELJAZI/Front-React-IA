import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Style/styles.css';
import { createServiceCase, getCompanies } from '../apiService';

const Case = () => {
  const [validated, setValidated] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceCase, setServiceCase] = useState({
    description: '',
    status: '',
    dateOpened: '',
    dateClosed: '',
    companyId: 0,
    technician: '',
    serviceCaseNo: '',
    serviceCaseTemplate: '',
    serviceObject: '',
    affectedCompany: '',
    contactPerson: '',
    affectedInstallation: '',
    originatingServiceOrder: '',
    originatingJob: '',
    skills: '',
    checklist: '',
    element: '',
    message: '',
    priority: '',
    serviceCaseCategory: '',
    responsibleUser: '',
    visibility: 'only me'
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
    setServiceCase({
      ...serviceCase,
      [name]: value
    });
  };

  const handleVisibilityChange = (e) => {
    setServiceCase({
      ...serviceCase,
      visibility: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await createServiceCase(serviceCase);
        setSuccessMessage('Service case added successfully!');
        setErrorMessage('');
        setServiceCase({
          description: '',
          status: '',
          dateOpened: '',
          dateClosed: '',
          companyId: 0,
          technician: '',
          serviceCaseNo: '',
          serviceCaseTemplate: '',
          serviceObject: '',
          affectedCompany: '',
          contactPerson: '',
          affectedInstallation: '',
          originatingServiceOrder: '',
          originatingJob: '',
          skills: '',
          checklist: '',
          element: '',
          message: '',
          priority: '',
          serviceCaseCategory: '',
          responsibleUser: '',
          visibility: 'only me'
        });
      } catch (error) {
        console.error('Error creating service case:', error);
        setErrorMessage('Error creating service case. Please try again.');
        setSuccessMessage('');
      }
    }
    setValidated(true);
  };

  return (
    <Container className="service-case-container">
      <h1>Add Service Case</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formServiceCaseNo">
            <Form.Label>Service Case No</Form.Label>
            <Form.Control
              type="text"
              name="serviceCaseNo"
              value={serviceCase.serviceCaseNo}
              onChange={handleChange}
              placeholder="Enter service case number"
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={serviceCase.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={serviceCase.status}
              onChange={handleChange}
              placeholder="Enter status"
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDateOpened">
            <Form.Label>Date Opened</Form.Label>
            <Form.Control
              type="date"
              name="dateOpened"
              value={serviceCase.dateOpened}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDateClosed">
            <Form.Label>Date Closed</Form.Label>
            <Form.Control
              type="date"
              name="dateClosed"
              value={serviceCase.dateClosed}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCompanyId">
            <Form.Label>Company</Form.Label>
            <Form.Control
              as="select"
              name="companyId"
              value={serviceCase.companyId}
              onChange={handleChange}
              required
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formTechnician">
            <Form.Label>Technician</Form.Label>
            <Form.Control
              type="text"
              name="technician"
              value={serviceCase.technician}
              onChange={handleChange}
              placeholder="Enter technician"
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formServiceCaseTemplate">
            <Form.Label>Service Case Template</Form.Label>
            <Form.Control
              type="text"
              name="serviceCaseTemplate"
              value={serviceCase.serviceCaseTemplate}
              onChange={handleChange}
              placeholder="Enter service case template"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formServiceObject">
            <Form.Label>Service Object</Form.Label>
            <Form.Control
              type="text"
              name="serviceObject"
              value={serviceCase.serviceObject}
              onChange={handleChange}
              placeholder="Enter service object"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formAffectedCompany">
            <Form.Label>Affected Company</Form.Label>
            <Form.Control
              type="text"
              name="affectedCompany"
              value={serviceCase.affectedCompany}
              onChange={handleChange}
              placeholder="Enter affected company"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formContactPerson">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
              type="text"
              name="contactPerson"
              value={serviceCase.contactPerson}
              onChange={handleChange}
              placeholder="Enter contact person"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formAffectedInstallation">
            <Form.Label>Affected Installation</Form.Label>
            <Form.Control
              type="text"
              name="affectedInstallation"
              value={serviceCase.affectedInstallation}
              onChange={handleChange}
              placeholder="Enter affected installation"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formOriginatingServiceOrder">
            <Form.Label>Originating Service Order</Form.Label>
            <Form.Control
              type="text"
              name="originatingServiceOrder"
              value={serviceCase.originatingServiceOrder}
              onChange={handleChange}
              placeholder="Enter originating service order"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formOriginatingJob">
            <Form.Label>Originating Job</Form.Label>
            <Form.Control
              type="text"
              name="originatingJob"
              value={serviceCase.originatingJob}
              onChange={handleChange}
              placeholder="Enter originating job"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={serviceCase.skills}
              onChange={handleChange}
              placeholder="Enter skills"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formChecklist">
            <Form.Label>Checklist</Form.Label>
            <Form.Control
              type="text"
              name="checklist"
              value={serviceCase.checklist}
              onChange={handleChange}
              placeholder="Enter checklist"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formElement">
            <Form.Label>Element</Form.Label>
            <Form.Control
              type="text"
              name="element"
              value={serviceCase.element}
              onChange={handleChange}
              placeholder="Enter element"
            />
          </Form.Group>
        </Row>

        <h2 className="form-heading">Extended Information</h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              name="message"
              value={serviceCase.message}
              onChange={handleChange}
              placeholder="Enter message"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              name="priority"
              value={serviceCase.priority}
              onChange={handleChange}
              placeholder="Enter priority"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formServiceCaseCategory">
            <Form.Label>Service Case Category</Form.Label>
            <Form.Control
              type="text"
              name="serviceCaseCategory"
              value={serviceCase.serviceCaseCategory}
              onChange={handleChange}
              placeholder="Enter service case category"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formResponsibleUser">
            <Form.Label>Responsible User</Form.Label>
            <Form.Control
              type="text"
              name="responsibleUser"
              value={serviceCase.responsibleUser}
              onChange={handleChange}
              placeholder="Enter responsible user"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formVisibility">
            <Form.Label>Visibility</Form.Label>
            <Form.Control
              as="select"
              name="visibility"
              value={serviceCase.visibility}
              onChange={handleVisibilityChange}
              required
            >
              <option value="only me">Only Me</option>
              <option value="everyone">Everyone</option>
              <option value="selected users">Selected Users</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
        <Link to="/service-cases" className="btn btn-secondary ml-2">
          Cancel
        </Link>
      </Form>
    </Container>
  );
};

export default Case;
