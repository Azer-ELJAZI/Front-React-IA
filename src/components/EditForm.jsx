import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import './EditForm.css';

const EditForm = ({ articleId, onClose }) => {
  const [formData, setFormData] = useState({
    itemType: '',
    itemNumber: '',
    description: '',
    manufacturer: '',
    barcode: '',
    validFrom: new Date(), 
    validTo: new Date(), 
    quantity: '',
    productFamilyID: '',
    qtystep: '',
    warranty: '',
    guarantee: '',
    currency: '',
    price: '',
    purchasePrice: '',
    articleGroup1: '',
    articleGroup2: '',
    articleGroup3: '',
    articleGroup4: '',
    articleGroup5: '',
    vat: '',
  });
  const [loading, setLoading] = useState(true);
  const [productFamilies, setProductFamilies] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:4804/api/article/${articleId}`);
        const article = response.data;
        setFormData({
          ...article,
          validFrom: new Date(article.validFrom),
          validTo: new Date(article.validTo),
        });
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductFamilies = async () => {
      try {
        const response = await axios.get('http://localhost:4804/api/ProductFamily');
        setProductFamilies(response.data["$values"]);
      } catch (error) {
        console.error('Error fetching product families:', error);
      }
    };

    fetchArticle();
    fetchProductFamilies();
  }, [articleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4804/api/article/${articleId}`, formData);
      Swal.fire('Success', 'Article updated successfully', 'success');
      onClose();
    } catch (error) {
      console.error('Error updating article:', error);
      Swal.fire('Error', 'Failed to update article', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formItemType">
                <Form.Label>Item Type</Form.Label>
                <Form.Control
                  type="text"
                  name="itemType"
                  value={formData.itemType}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formItemNumber">
                <Form.Label>Item Number</Form.Label>
                <Form.Control
                  type="text"
                  name="itemNumber"
                  value={formData.itemNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formManufacturer">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBarcode">
                <Form.Label>Barcode</Form.Label>
                <Form.Control
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formValidFrom">
                <Form.Label>Valid From</Form.Label>
                <DatePicker
                  selected={formData.validFrom}
                  onChange={(date) => handleDateChange('validFrom', date)}
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formValidTo">
                <Form.Label>Valid To</Form.Label>
                <DatePicker
                  selected={formData.validTo}
                  onChange={(date) => handleDateChange('validTo', date)}
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProductFamilyID">
                <Form.Label>Product Family</Form.Label>
                <Form.Control
                  as="select"
                  name="productFamilyID"
                  value={formData.productFamilyID}
                  onChange={handleChange}
                >
                  <option value="">Select Family</option>
                  {productFamilies.map((family) => (
                    <option key={family.id} value={family.id}>
                      {family.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formQtyStep">
                <Form.Label>Qty Step</Form.Label>
                <Form.Control
                  type="text"
                  name="qtystep"
                  value={formData.qtystep}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formWarranty">
                <Form.Label>Warranty</Form.Label>
                <Form.Control
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formGuarantee">
                <Form.Label>Guarantee</Form.Label>
                <Form.Control
                  type="text"
                  name="guarantee"
                  value={formData.guarantee}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCurrency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPurchasePrice">
                <Form.Label>Purchase Price</Form.Label>
                <Form.Control
                  type="text"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formVat">
                <Form.Label>VAT</Form.Label>
                <Form.Control
                  type="text"
                  name="vat"
                  value={formData.vat}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formArticleGroup1">
                <Form.Label>Article Group 1</Form.Label>
                <Form.Control
                  type="text"
                  name="articleGroup1"
                  value={formData.articleGroup1}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formArticleGroup2">
                <Form.Label>Article Group 2</Form.Label>
                <Form.Control
                  type="text"
                  name="articleGroup2"
                  value={formData.articleGroup2}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formArticleGroup3">
                <Form.Label>Article Group 3</Form.Label>
                <Form.Control
                  type="text"
                  name="articleGroup3"
                  value={formData.articleGroup3}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formArticleGroup4">
                <Form.Label>Article Group 4</Form.Label>
                <Form.Control
                  type="text"
                  name="articleGroup4"
                  value={formData.articleGroup4}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formArticleGroup5">
                <Form.Label>Article Group 5</Form.Label>
                <Form.Control
                  type="text"
                  name="articleGroup5"
                  value={formData.articleGroup5}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;
