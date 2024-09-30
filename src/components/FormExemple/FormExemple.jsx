import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import * as yup from "yup";
import "./FormExample.css";

function FormExample() {
  const schema = yup.object().shape({
    itemType: yup.string().required("Item type is required"),
    itemNumber: yup.string().required("Item number is required"),
    description: yup.string().required("Description is required"),
    manufacturer: yup.string().required("Manufacturer is required"),
    barcode: yup.string().required("Barcode is required"),
    price: yup.string().required("Price is required"),
    purchasePrice: yup.string().required("Purchase price is required"),
    currency: yup.string().required("Currency is required"),
    ValidFrom: yup.date().required("Valid From date is required"),
    ValidTo: yup.date().required("Valid To date is required"),
    Quantity: yup.string().required("Quantity is required"),
    ProductFamilyID: yup.number().required("Product family is required"),
    Qtystep: yup.string().required("Quantity step is required"),
    ArticleGroup1: yup.string().required("Article group 1 is required"),
    ArticleGroup2: yup.string().required("Article group 2 is required"),
    ArticleGroup3: yup.string().required("Article group 3 is required"),
    ArticleGroup4: yup.string().required("Article group 4 is required"),
    ArticleGroup5: yup.string().required("Article group 5 is required"),
    Warranty: yup.string().required("Warranty is required"),
    Guarantee: yup.string().required("Guarantee is required"),
    vat: yup.string().required("VAT is required"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const [submitting, setSubmitting] = useState(false);
  const [productFamilies, setProductFamilies] = useState([]);
  // Avant d'envoyer la requête, assurez-vous que `quantity` est une chaîne



  useEffect(() => {
    const fetchProductFamilies = async () => {
      try {
        const response = await axios.get("http://localhost:5188/api/ProductFamily");
        const productFamiliesArray = response.data;

        if (Array.isArray(productFamiliesArray)) {
          const formattedProductFamilies = productFamiliesArray.map(family => ({
            id: family.id,
            name: family.name
          }));
          setProductFamilies(formattedProductFamilies);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching product families:", error);
      }
    };

    fetchProductFamilies();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      values.quantity = values.quantity.toString();
      
      await axios.post('http://localhost:5188/api/Article', values);
      const requestData = {
        id: 0, // Assuming ID is auto-generated
        itemType: values.itemType,
        itemNumber: values.itemNumber,
        description: values.description,
        manufacturer: values.manufacturer,
        barcode: values.barcode,
        validFrom: values.ValidFrom.toISOString(), // ISO format
        validTo: values.ValidTo.toISOString(),     // ISO format
        quantity: values.Quantity,
        productFamilyID: 3,
        qtystep: values.Qtystep,
        articleGroup1: values.ArticleGroup1,
        articleGroup2: values.ArticleGroup2,
        articleGroup3: values.ArticleGroup3,
        articleGroup4: values.ArticleGroup4,
        articleGroup5: values.ArticleGroup5,
        warranty: values.Warranty,
        guarantee: values.Guarantee,
        vat: values.vat,
        price: values.price,
        purchasePrice: values.purchasePrice,
        currency: values.currency,
        
      };

      const response = await axios.post("http://localhost:5188/api/Article", requestData);
      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Your product has been successfully added!",
        confirmButtonText: "OK",
      });

    } catch (error) {
      console.error('Error submitting the form:', error);

      let errorMessage = "Failed to add product. Please try again later.";
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

  const CustomDatePickerInput = ({ value, onClick }) => (
    <InputGroup>
      <InputGroup.Text>
        <FaCalendarAlt />
      </InputGroup.Text>
      <Form.Control
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        placeholder="Select date"
      />
    </InputGroup>
  );

  const handleIncrement = (setFieldValue, value) => {
    setFieldValue("Quantity", (parseInt(value) || 0) + 1);
  };

  const handleDecrement = (setFieldValue, value) => {
    setFieldValue("Quantity", Math.max(0, (parseInt(value) || 0) - 1));
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        itemType: "",
        itemNumber: "",
        description: "",
        manufacturer: "",
        barcode: "",
        terms: false,
        price: "",
        purchasePrice: "",
        currency: "",
        ValidFrom: null,
        ValidTo: null,
        Quantity: "",
        ProductFamilyID: "3",
        Qtystep: "",
        ArticleGroup1: "",
        ArticleGroup2: "",
        ArticleGroup3: "",
        ArticleGroup4: "",
        ArticleGroup5: "",
        Warranty: "",
        Guarantee: "",
        vat: "",
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
        setFieldValue,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <h2 className="form-title">Add New Article</h2>
          </Row>

          <Row className="mb-3 mt-3">
            <Form.Text className="text-muted">Basic Information</Form.Text>

            <Form.Group as={Col} md="4">
              <Form.Label>Item Type</Form.Label>
              <Form.Control
                type="text"
                name="itemType"
                value={values.itemType}
                onChange={handleChange}
                isValid={touched.itemType && !errors.itemType}
                isInvalid={!!errors.itemType}
              />
              <Form.Control.Feedback type="invalid">
                {errors.itemType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Item Number</Form.Label>
              <Form.Control
                type="text"
                name="itemNumber"
                value={values.itemNumber}
                onChange={handleChange}
                isValid={touched.itemNumber && !errors.itemNumber}
                isInvalid={!!errors.itemNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.itemNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Description</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3 mt-3">
            <Form.Text className="text-muted">Manufacturer Details</Form.Text>

            <Form.Group as={Col} md="4">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                name="manufacturer"
                value={values.manufacturer}
                onChange={handleChange}
                isValid={touched.manufacturer && !errors.manufacturer}
                isInvalid={!!errors.manufacturer}
              />
              <Form.Control.Feedback type="invalid">
                {errors.manufacturer}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                name="barcode"
                value={values.barcode}
                onChange={handleChange}
                isValid={touched.barcode && !errors.barcode}
                isInvalid={!!errors.barcode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.barcode}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={values.price}
                onChange={handleChange}
                isValid={touched.price && !errors.price}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 mt-3">
            <Form.Text className="text-muted">Additional Information</Form.Text>

            <Form.Group as={Col} md="4">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control
                type="text"
                name="purchasePrice"
                value={values.purchasePrice}
                onChange={handleChange}
                isValid={touched.purchasePrice && !errors.purchasePrice}
                isInvalid={!!errors.purchasePrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.purchasePrice}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                name="currency"
                value={values.currency}
                onChange={handleChange}
                isValid={touched.currency && !errors.currency}
                isInvalid={!!errors.currency}
              />
              <Form.Control.Feedback type="invalid">
                {errors.currency}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Valid From</Form.Label>
              <DatePicker
                selected={values.ValidFrom}
                onChange={(date) => setFieldValue("ValidFrom", date)}
                customInput={<CustomDatePickerInput />}
                dateFormat="yyyy-MM-dd"
              />
              <Form.Control.Feedback type="invalid">
                {errors.ValidFrom}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Valid To</Form.Label>
              <DatePicker
                selected={values.ValidTo}
                onChange={(date) => setFieldValue("ValidTo", date)}
                customInput={<CustomDatePickerInput />}
                dateFormat="yyyy-MM-dd"
              />
              <Form.Control.Feedback type="invalid">
                {errors.ValidTo}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 mt-3">
            <Form.Text className="text-muted">Quantities & Categories</Form.Text>

            <Form.Group as={Col} md="4">
              <Form.Label>Quantity</Form.Label>
              <InputGroup>
                <Button variant="outline-secondary" onClick={() => handleDecrement(setFieldValue, values.Quantity)}>-</Button>
                <Form.Control
                  type="text"
                  name="Quantity"
                  value={values.Quantity}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={() => handleIncrement(setFieldValue, values.Quantity)}>+</Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.Quantity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Product Family</Form.Label>
              <Form.Control
                as="select"
                name="ProductFamilyID"
                value={values.ProductFamilyID}
                onChange={handleChange}
                isValid={touched.ProductFamilyID && !errors.ProductFamilyID}
                isInvalid={!!errors.ProductFamilyID}
              >
                <option value="">Select Product Family</option>
                {productFamilies.map((family) => (
                  <option key={family.id} value={family.id}>
                    {family.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.ProductFamilyID}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Quantity Step</Form.Label>
              <Form.Control
                type="text"
                name="Qtystep"
                value={values.Qtystep}
                onChange={handleChange}
                isValid={touched.Qtystep && !errors.Qtystep}
                isInvalid={!!errors.Qtystep}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Qtystep}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Article Group 1</Form.Label>
              <Form.Control
                type="text"
                name="ArticleGroup1"
                value={values.ArticleGroup1}
                onChange={handleChange}
                isValid={touched.ArticleGroup1 && !errors.ArticleGroup1}
                isInvalid={!!errors.ArticleGroup1}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ArticleGroup1}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Article Group 2</Form.Label>
              <Form.Control
                type="text"
                name="ArticleGroup2"
                value={values.ArticleGroup2}
                onChange={handleChange}
                isValid={touched.ArticleGroup2 && !errors.ArticleGroup2}
                isInvalid={!!errors.ArticleGroup2}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ArticleGroup2}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Article Group 3</Form.Label>
              <Form.Control
                type="text"
                name="ArticleGroup3"
                value={values.ArticleGroup3}
                onChange={handleChange}
                isValid={touched.ArticleGroup3 && !errors.ArticleGroup3}
                isInvalid={!!errors.ArticleGroup3}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ArticleGroup3}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Article Group 4</Form.Label>
              <Form.Control
                type="text"
                name="ArticleGroup4"
                value={values.ArticleGroup4}
                onChange={handleChange}
                isValid={touched.ArticleGroup4 && !errors.ArticleGroup4}
                isInvalid={!!errors.ArticleGroup4}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ArticleGroup4}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Article Group 5</Form.Label>
              <Form.Control
                type="text"
                name="ArticleGroup5"
                value={values.ArticleGroup5}
                onChange={handleChange}
                isValid={touched.ArticleGroup5 && !errors.ArticleGroup5}
                isInvalid={!!errors.ArticleGroup5}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ArticleGroup5}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Warranty</Form.Label>
              <Form.Control
                type="text"
                name="Warranty"
                value={values.Warranty}
                onChange={handleChange}
                isValid={touched.Warranty && !errors.Warranty}
                isInvalid={!!errors.Warranty}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Warranty}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Guarantee</Form.Label>
              <Form.Control
                type="text"
                name="Guarantee"
                value={values.Guarantee}
                onChange={handleChange}
                isValid={touched.Guarantee && !errors.Guarantee}
                isInvalid={!!errors.Guarantee}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Guarantee}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="text"
                name="vat"
                value={values.vat}
                onChange={handleChange}
                isValid={touched.vat && !errors.vat}
                isInvalid={!!errors.vat}
              />
              <Form.Control.Feedback type="invalid">
                {errors.vat}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Check
                type="checkbox"
                name="terms"
                label="I accept the terms and conditions"
                checked={values.terms}
                onChange={handleChange}
                isValid={touched.terms && !errors.terms}
                isInvalid={!!errors.terms}
              />
              <Form.Control.Feedback type="invalid">
                {errors.terms}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormExample;
