import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./Dashboard.css";

const Dashboard = () => {
  const [productFamilies, setProductFamilies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [initialValues, setInitialValues] = useState({ name: "" });

  const fetchProductFamilies = async () => {
    try {
      const response = await axios.get("http://localhost:5188/api/ProductFamily");
      const productFamiliesArray = response.data; // Assumes the response is an array

      if (Array.isArray(productFamiliesArray)) {
        const formattedProductFamilies = productFamiliesArray.map((family) => ({
          id: family.id,
          name: family.name,
        }));
        setProductFamilies(formattedProductFamilies);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching product families:", error);
    }
  };

  useEffect(() => {
    fetchProductFamilies();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        id: editingId,
        name: values.name,
      };

      const response = isEditing
        ? await axios.put(`http://localhost:5188/api/ProductFamily/${editingId}`, payload)
        : await axios.post("http://localhost:5188/api/ProductFamily", values);

      setSubmitting(false);
      setIsEditing(false);
      setEditingId(null);
      setInitialValues({ name: "" });
      fetchProductFamilies();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Product family ${isEditing ? "updated" : "added"} successfully`,
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue submitting the form. Please try again later.",
        confirmButtonText: "OK",
      });
      setSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    const family = productFamilies.find((family) => family.id === id);
    setInitialValues({ name: family.name });
    setEditingId(id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product family!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5188/api/ProductFamily/${id}`);
          Swal.fire("Deleted!", "Your product family has been deleted.", "success");
          fetchProductFamilies(); // Call fetchProductFamilies to update the list
        } catch (error) {
          console.error("Error deleting product family:", error);

          let errorMessage = "Failed to delete product family. Please try again later.";
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
        }
      }
    });
  };

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        enableReinitialize={true} // This ensures that the form reinitializes with new values
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
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <h2 className="form-title">{isEditing ? "Edit Product Family" : "Add New Product Family"}</h2>
            </Row>

            <Row className="mb-3 mt-3">
              <Form.Text className="text-muted">Product Family Information</Form.Text>
              <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit" disabled={isSubmitting} className="mt-3 mb-5">
              {isSubmitting ? "Submitting..." : isEditing ? "Update" : "Confirm Add"}
            </Button>

            <Row>
              <Col>
                <h3 className="form-title">Available Product Families</h3>
                {productFamilies.length > 0 ? (
                  <div className="product-families-list">
                    {productFamilies.map((family) => (
                      <div key={family.id} className="product-family-item">
                        <div className="product-family-name">{family.name}</div>
                        <div className="product-family-actions">
                          <Dropdown>
                            <Dropdown.Toggle variant="link" id={`dropdown-${family.id}`}>
                              <i className="fas fa-ellipsis-v"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleEdit(family.id)}>Edit</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleDelete(family.id)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No product families available</p>
                )}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Dashboard;
