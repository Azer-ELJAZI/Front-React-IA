import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getCompanies, getServiceCase, updateServiceCase } from '../apiService';

const ModifierService = () => {
  const { id } = useParams(); // Récupération de l'ID du service depuis les paramètres d'URL
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [companies, setCompanies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceCase, setServiceCase] = useState({
    serviceCaseNo: '',
    description: '',
    status: '',
    dateOpened: '',
    dateClosed: '',
    companyId: '',
    technician: '',
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
  const [originalServiceCase, setOriginalServiceCase] = useState(null); // État pour stocker les données originales du service

  useEffect(() => {
    fetchServiceDetails(); // Appel à la fonction pour récupérer les détails du service au chargement du composant
    fetchCompanies(); // Appel à la fonction pour récupérer la liste des entreprises
  }, [id]); // Ajouter id dans les dépendances de useEffect pour recharger les détails lorsqu'il change

  const fetchServiceDetails = async () => {
    try {
      const response = await getServiceCase(id); // Appel à votre fonction d'API pour récupérer les détails du service
      const serviceData = response.data; // Supposons que votre API renvoie les données du service sous forme d'objet
      setServiceCase({
        ...serviceData // Met à jour les valeurs du service récupérées dans l'état local
      });
      setOriginalServiceCase({
        ...serviceData // Stocke également les données originales pour une référence ultérieure
      });
    } catch (error) {
      console.error('Error fetching service case details:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies(); // Appel à votre fonction d'API pour récupérer la liste des entreprises
      setCompanies(response.data); // Met à jour l'état avec les entreprises récupérées
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await updateServiceCase(id, serviceCase); // Appel à votre fonction d'API pour mettre à jour le service
        setSuccessMessage('Service case updated successfully!');
        setErrorMessage('');
      } catch (error) {
        console.error('Error updating service case:', error);
        setErrorMessage('Error updating service case. Please try again.');
        setSuccessMessage('');
      }
    }
    setValidated(true);
  };

  const handleReset = () => {
    // Réinitialiser les champs avec les données originales
    setServiceCase({
      ...originalServiceCase
    });
    setValidated(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Container className="service-case-container">
      <h1>Modify Service Case</h1>
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
              required
            />
          </Form.Group>
        </Row>
        {/* Ajoutez ici les autres champs pour tous les attributs restants */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formServiceCaseTemplate">
            <Form.Label>Service Case Template</Form.Label>
            <Form.Control
              type="text"
              name="serviceCaseTemplate"
              value={serviceCase.serviceCaseTemplate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formServiceObject">
            <Form.Label>Service Object</Form.Label>
            <Form.Control
              type="text"
              name="serviceObject"
              value={serviceCase.serviceObject}
              onChange={handleChange}
              required
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formContactPerson">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
              type="text"
              name="contactPerson"
              value={serviceCase.contactPerson}
              onChange={handleChange}
              required
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formOriginatingServiceOrder">
            <Form.Label>Originating Service Order</Form.Label>
            <Form.Control
              type="text"
              name="originatingServiceOrder"
              value={serviceCase.originatingServiceOrder}
              onChange={handleChange}
              required
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={serviceCase.skills}
              onChange={handleChange}
              required
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formElement">
            <Form.Label>Element</Form.Label>
            <Form.Control
              type="text"
              name="element"
              value={serviceCase.element}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              name="message"
              value={serviceCase.message}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              name="priority"
              value={serviceCase.priority}
              onChange={handleChange}
              required
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formResponsibleUser">
            <Form.Label>Responsible User</Form.Label>
            <Form.Control
              type="text"
              name="responsibleUser"
              value={serviceCase.responsibleUser}
              onChange={handleChange}
              required
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
              onChange={handleChange}
              required
            >
              <option value="only me">Only Me</option>
              <option value="everyone">Everyone</option>
              <option value="specific">Specific</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>{' '}
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>{' '}
        <Link to="/service-cases" className="btn btn-danger">
          Cancel
        </Link>
      </Form>
    </Container>
  );
};

export default ModifierService;
