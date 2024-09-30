import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTag, FaBarcode, FaCalendarAlt, FaInfoCircle, FaCubes, FaMoneyBillWave } from 'react-icons/fa'; // Import icons from react-icons
import './ShowDetails.css';

const ShowDetails = ({ show, onHide, article }) => {
  if (!article) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="l">
      <Modal.Header closeButton>
        <Modal.Title>Article Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="article-details">
          <h4 className="details-title">{article.itemType}</h4>
          <div className="details-section">
            <p><FaTag /> <strong>Item Type:</strong> {article.itemType}</p>
            <p><FaTag /> <strong>Item Number:</strong> {article.itemNumber}</p>
            <p><FaInfoCircle /> <strong>Description:</strong> {article.description}</p>
            <p><FaTag /> <strong>Manufacturer:</strong> {article.manufacturer}</p>
            <p><FaBarcode /> <strong>Barcode:</strong> {article.barcode}</p>
            <p><FaCalendarAlt /> <strong>Valid From:</strong> {new Date(article.validFrom).toLocaleDateString()}</p>
            <p><FaCalendarAlt /> <strong>Valid To:</strong> {new Date(article.validTo).toLocaleDateString()}</p>
            <p><FaCubes /> <strong>Quantity:</strong> {article.quantity}</p>
            <p><FaTag /> <strong>Product Family:</strong> {article.productFamilyID}</p>
            <p><FaTag /> <strong>Qty Step:</strong> {article.qtystep}</p>
            <p><FaTag /> <strong>Warranty:</strong> {article.warranty}</p>
            <p><FaTag /> <strong>Guarantee:</strong> {article.guarantee}</p>
            <p><FaMoneyBillWave /> <strong>Currency:</strong> {article.currency}</p>
            <p><FaMoneyBillWave /> <strong>Price:</strong> {article.price}</p>
            <p><FaMoneyBillWave /> <strong>Purchase Price:</strong> {article.purchasePrice}</p>
            <p><FaTag /> <strong>Article Group 1:</strong> {article.articleGroup1}</p>
            <p><FaTag /> <strong>Article Group 2:</strong> {article.articleGroup2}</p>
            <p><FaTag /> <strong>Article Group 3:</strong> {article.articleGroup3}</p>
            <p><FaTag /> <strong>Article Group 4:</strong> {article.articleGroup4}</p>
            <p><FaTag /> <strong>Article Group 5:</strong> {article.articleGroup5}</p>
            <p><FaTag /> <strong>VAT:</strong> {article.vat}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowDetails;
