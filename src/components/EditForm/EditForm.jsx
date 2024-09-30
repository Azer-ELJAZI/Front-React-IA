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
    ID: articleId,
    itemType: '',
    itemNumber: '',
    description: '',
    manufacturer: '',
    barcode: '',
    validFrom: new Date(), // Initialize with current date or appropriate default
    validTo: new Date(), // Initialize with current date or appropriate default
    quantity: '',
    ProductFamilyID: "",
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
    vat: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [productFamilies, setProductFamilies] = useState([]);

  useEffect(() => {
    const fetchProductFamilies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5188/api/ProductFamily"
        );
        
        const productFamiliesArray = response.data["$values"];
    
        // Extracting only the necessary fields
        const formattedProductFamilies = productFamiliesArray.map(family => ({
          id: family.id,
          name: family.name
        }));
    
        setProductFamilies(formattedProductFamilies);
      } catch (error) {
        console.error("Error fetching product families:", error);
      }
    };
    
    fetchProductFamilies();
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5188/api/article/${articleId}`);
        const article = response.data;
        setFormData({
          ...article,
          validFrom: new Date(article.validFrom),
          validTo: new Date(article.validTo),
          ID: articleId
        });
      } catch (error) {
        console.error('Error fetching article details:', error);
        // Handle error as needed
      }
    };

    if (articleId) {
      fetchArticleDetails();
    }
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log('Submitting with formData:', formData);

      const response = await axios.put(`http://localhost:5188/api/article/${articleId}`, formData);
      console.log('Update response:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Article Updated',
        text: 'Your article has been successfully updated!',
        confirmButtonText: 'OK'
      }).then(() => {
        onClose();
      });
    } catch (error) {
      if (error.response) {
        console.error('Error updating article:', error.message);
        console.error('Server response:', error.response.data);
      } else {
        console.error('Error updating article:', error.message);
      }
      // Handle update error as needed
    } finally {
      setSubmitting(false);
    }
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formItemType">
              <Form.Label>Item Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item type"
                value={formData.itemType}
                onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formItemNumber">
              <Form.Label>Item Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item number"
                value={formData.itemNumber}
                onChange={(e) => setFormData({ ...formData, itemNumber: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formManufacturer">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter manufacturer"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formBarcode">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter barcode"
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formValidFrom">
              <Form.Label>Valid From</Form.Label><br />
              <DatePicker
                selected={formData.validFrom}
                onChange={(date) => setFormData({ ...formData, validFrom: date })}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formValidTo">
              <Form.Label>Valid To</Form.Label><br />
              <DatePicker
                selected={formData.validTo}
                onChange={(date) => setFormData({ ...formData, validTo: date })}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formProductFamily">
              <Form.Label>Product Family</Form.Label>
              <Form.Control
                as="select"
                value={formData.ProductFamilyID}
                onChange={(e) => setFormData({ ...formData, ProductFamilyID: e.target.value })}
              >
                <option value="">Select a product family</option>
                {productFamilies.map(family => (
                  <option key={family.id} value={family.id}>{family.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formQtystep">
              <Form.Label>Quantity Step</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quantity step"
                value={formData.qtystep}
                onChange={(e) => setFormData({ ...formData, qtystep: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formWarranty">
              <Form.Label>Warranty</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter warranty"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGuarantee">
              <Form.Label>Guarantee</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter guarantee"
                value={formData.guarantee}
                onChange={(e) => setFormData({ ...formData, guarantee: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formCurrency">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                as="select"
                name="currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="form-select"
              >
                <option value="">Select currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
                <option value="GBP">GBP</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPurchasePrice">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter purchase price"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formArticleGroup1">
              <Form.Label>Article Group 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article group 1"
                value={formData.articleGroup1}
                onChange={(e) => setFormData({ ...formData, articleGroup1: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formArticleGroup2">
              <Form.Label>Article Group 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article group 2"
                value={formData.articleGroup2}
                onChange={(e) => setFormData({ ...formData, articleGroup2: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formArticleGroup3">
              <Form.Label>Article Group 3</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article group 3"
                value={formData.articleGroup3}
                onChange={(e) => setFormData({ ...formData, articleGroup3: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formArticleGroup4">
              <Form.Label>Article Group 4</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article group 4"
                value={formData.articleGroup4}
                onChange={(e) => setFormData({ ...formData, articleGroup4: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formArticleGroup5">
              <Form.Label>Article Group 5</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article group 5"
                value={formData.articleGroup5}
                onChange={(e) => setFormData({ ...formData, articleGroup5: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formVat">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter VAT"
                value={formData.vat}
                onChange={(e) => setFormData({ ...formData, vat: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Update Article
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;
