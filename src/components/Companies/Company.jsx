import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';
import Swal from "sweetalert2";



const Company = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Submitting company with values:", values);

      const requestData = {
        ...values,
        productFamilyID: values.ProductFamilyID  // If this is needed
      };

      const response = await axios.post(
        "http://localhost:5188/api/Companies",
        requestData
      );
      console.log("Company successfully added:", response.data);

      Swal.fire({
        icon: "success",
        title: "Company Added",
        text: "Your company has been successfully added!",
        confirmButtonText: "OK",
      });

    } catch (error) {
      console.error("Error adding company:", error);

      let errorMessage = "Failed to add company. Please try again later.";
      if (error.response && error.response.data && error.response.data.errors) {
        errorMessage = Object.values(error.response.data.errors).join(" ");
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <Formik
        initialValues={{
          name: 'name',
          type: 'type',
          sourceType: 'sourceType',
          responsibleUser: 'responsibleUser',
          backgroundInfo: 'backgroundInfo',
          language: 'language',
          campaign: 'campaign',
          areaSalesManager: 'areaSalesManager',
          zipCode: 'zipCode',
          city: 'city',
          region: 'region',
          germany: 'germany',
          phone: 'phone',
          email: 'email',
          fax: 'fax',
          website: 'website',
          visibility: 'visibility',
        }}
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
        }) => (
          <Form noValidate onSubmit={handleSubmit}>

                <Row>
            <h2 className="form-title">Add New Company</h2>
          </Row>
          <Row className="mb-3 mt-3">
            <Form.Text className="text-muted">Basic Information</Form.Text>

              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Company Name </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Company name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a company name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Company Type </Form.Label>
                <Form.Control
                  as="select"
                  required
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.type && !!errors.type}
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
                  value={values.sourceType}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  value={values.responsibleUser}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
              value={values.backgroundInfo}
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
              value={values.language}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Campaign</Form.Label>
            <Form.Control
              type="text"
              placeholder="Campaign"
              name="campaign"
              value={values.campaign}
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
              value={values.areaSalesManager}
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
              value={values.zipCode}
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
              value={values.city}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom11">
            <Form.Label>Region</Form.Label>
            <Form.Control
              as="select"
              name="region"
              value={values.region}
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
              value={values.germany}
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
              value={values.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom14">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
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
              value={values.fax}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom16">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Website"
              name="website"
              value={values.website}
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
              value={values.visibility}
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
        )}
      </Formik>

    
  );
};

export default Company;