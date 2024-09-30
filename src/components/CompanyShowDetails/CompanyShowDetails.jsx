import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTag, FaBarcode, FaInfoCircle, FaCubes } from 'react-icons/fa'; // Import icons from react-icons
import './CompanyShowDetails.css';

const CompanyShowDetails = ({ show, onHide, company }) => {
  if (!company) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="l">
      <Modal.Header closeButton>
        <Modal.Title>Company Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="article-details">
          <h4 className="details-title">{company.itemType}</h4>
          <div className="details-section">
            <p><FaTag /> <strong>Name :</strong> {company.name}</p>
            <p><FaTag /> <strong>Type :</strong> {company.type}</p>
            <p><FaInfoCircle /> <strong>SourceType:</strong> {company.sourceType}</p>
            <p><FaTag /> <strong>Responsible User:</strong> {company.responsibleUser}</p>
            <p><FaBarcode /> <strong>backgroundInfo :</strong> {company.backgroundInfo}</p>
            <p><FaCubes /> <strong>language:</strong> {company.language}</p>
            <p><FaTag /> <strong>campaign :</strong> {company.campaign}</p>
            <p><FaTag /> <strong>areaSalesManager :</strong> {company.areaSalesManager}</p>
            <p><FaTag /> <strong>zipCode:</strong> {company.zipCode}</p>
            <p><FaTag /> <strong>city:</strong> {company.city}</p>
            <p><FaTag /> <strong>region:</strong> {company.region}</p>
            <p><FaTag /> <strong>germany :</strong> {company.germany}</p>
            <p><FaTag /> <strong>phone :</strong> {company.phone}</p>
            <p><FaTag /> <strong>fax :</strong> {company.fax}</p>
            <p><FaTag /> <strong>website :</strong> {company.website}</p>
            <p><FaTag /> <strong>visibility :</strong> {company.visibility}</p>
          </div>
         
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompanyShowDetails;
