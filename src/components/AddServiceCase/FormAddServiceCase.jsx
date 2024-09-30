import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';

const FormAddServiceCase = () => {
  const [validated, setValidated] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceCase, setServiceCase] = useState({
    description: 'description',
    status: 'status',
    dateOpened: 'dateOpened',
    dateClosed: 'dateClosed',
    companyId: 0,
    technician: 'technician',
    serviceCaseNo: 'serviceCaseNo',
    serviceCaseTemplate: 'serviceCaseTemplate',
    serviceObject: 'serviceObject',
    affectedCompany: 'affectedCompany',
    contactPerson: 'contactPerson',
    affectedInstallation: 'affectedInstallation',
    originatingServiceOrder: 'originatingServiceOrder',
    originatingJob: 'originatingJob',
    skills: 'skills',
    checklist: 'checklist',
    element: 'element',
    message: 'message',
    priority: 'priority',
    serviceCaseCategory: 'serviceCaseCategory',
    responsibleUser: 'responsibleUser',
    visibility: 'only me'
  });

  const schema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    dateOpened: Yup.date().required('Date Opened is required'),
    dateClosed: Yup.date().required('Date Closed is required'),
    companyId: Yup.number().required('Company is required'),
    technician: Yup.string().required('Technician is required'),
    serviceCaseNo: Yup.string().required('Service Case No is required'),
    serviceCaseTemplate: Yup.string(),
    serviceObject: Yup.string(),
    affectedCompany: Yup.string(),
    contactPerson: Yup.string(),
    affectedInstallation: Yup.string(),
    originatingServiceOrder: Yup.string(),
    originatingJob: Yup.string(),
    skills: Yup.string(),
    checklist: Yup.string(),
    element: Yup.string(),
    message: Yup.string(),
    priority: Yup.string(),
    serviceCaseCategory: Yup.string(),
    responsibleUser: Yup.string(),
    visibility: Yup.string().required('Visibility is required')
  });

  const handleVisibilityChange = (e) => {
    setServiceCase({
      ...serviceCase,
      visibility: e.target.value
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log('Form submitted:', values);
    setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={serviceCase}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        setFieldValue,
        isSubmitting
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <h2 className="form-title">Add New Service Case</h2>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formServiceCaseNo">
              <Form.Label>Service Case No</Form.Label>
              <Form.Control
                type="text"
                name="serviceCaseNo"
                value={values.serviceCaseNo}
                onChange={handleChange}
                placeholder="Enter service case number"
                isInvalid={!!errors.serviceCaseNo}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.serviceCaseNo}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Enter description"
                isInvalid={!!errors.description}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={values.status}
                onChange={handleChange}
                placeholder="Enter status"
                isInvalid={!!errors.status}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.status}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formDateOpened">
              <Form.Label>Date Opened</Form.Label>
              <Form.Control
                type="date"
                name="dateOpened"
                value={values.dateOpened}
                onChange={handleChange}
                isInvalid={!!errors.dateOpened}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOpened}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formDateClosed">
              <Form.Label>Date Closed</Form.Label>
              <Form.Control
                type="date"
                name="dateClosed"
                value={values.dateClosed}
                onChange={handleChange}
                isInvalid={!!errors.dateClosed}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateClosed}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formCompanyId">
              <Form.Label>Company</Form.Label>
              <Form.Control
                as="select"
                name="companyId"
                value={values.companyId}
                onChange={handleChange}
                isInvalid={!!errors.companyId}
                required
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.companyId}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formTechnician">
              <Form.Label>Technician</Form.Label>
              <Form.Control
                type="text"
                name="technician"
                value={values.technician}
                onChange={handleChange}
                placeholder="Enter technician"
                isInvalid={!!errors.technician}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.technician}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formServiceCaseTemplate">
              <Form.Label>Service Case Template</Form.Label>
              <Form.Control
                type="text"
                name="serviceCaseTemplate"
                value={values.serviceCaseTemplate}
                onChange={handleChange}
                placeholder="Enter service case template"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formServiceObject">
              <Form.Label>Service Object</Form.Label>
              <Form.Control
                type="text"
                name="serviceObject"
                value={values.serviceObject}
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
                value={values.affectedCompany}
                onChange={handleChange}
                placeholder="Enter affected company"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formContactPerson">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                name="contactPerson"
                value={values.contactPerson}
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
                value={values.affectedInstallation}
                onChange={handleChange}
                placeholder="Enter affected installation"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formOriginatingServiceOrder">
              <Form.Label>Originating Service Order</Form.Label>
              <Form.Control
                type="text"
                name="originatingServiceOrder"
                value={values.originatingServiceOrder}
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
                value={values.originatingJob}
                onChange={handleChange}
                placeholder="Enter originating job"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                name="skills"
                value={values.skills}
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
                value={values.checklist}
                onChange={handleChange}
                placeholder="Enter checklist"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formElement">
              <Form.Label>Element</Form.Label>
              <Form.Control
                type="text"
                name="element"
                value={values.element}
                onChange={handleChange}
                placeholder="Enter element"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Enter message"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                type="text"
                name="priority"
                value={values.priority}
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
                value={values.serviceCaseCategory}
                onChange={handleChange}
                placeholder="Enter service case category"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formResponsibleUser">
              <Form.Label>Responsible User</Form.Label>
              <Form.Control
                type="text"
                name="responsibleUser"
                value={values.responsibleUser}
                onChange={handleChange}
                placeholder="Enter responsible user"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVisibility">
              <Form.Label>Visibility</Form.Label>
              <div className="mb-3">
                <Form.Check
                  inline
                  type="radio"
                  label="Only Me"
                  name="visibility"
                  id="visibility-only-me"
                  value="only me"
                  checked={values.visibility === 'only me'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Everyone"
                  name="visibility"
                  id="visibility-everyone"
                  value="everyone"
                  checked={values.visibility === 'everyone'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Row>
          <Button type="submit" disabled={isSubmitting}>
            Add Service Case
          </Button>
          {successMessage && (
            <Alert variant="success" className="mt-3">
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormAddServiceCase;
