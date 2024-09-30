import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { FaCalendarAlt, FaEllipsisV, FaMoneyBillAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import EditForm from '../EditForm/EditForm';
import './Article.css';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [productFamilies, setProductFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/Article');
      setArticles(response.data["$values"]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductFamilies = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/productFamily');
      setProductFamilies(response.data["$values"]);
    } catch (error) {
      console.error("Error fetching product families:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchProductFamilies();
  }, []);

  const handleToggleOptions = (id) => {
    setSelectedArticleId(selectedArticleId === id ? null : id);
  };

  const handleEdit = (id) => {
    setSelectedArticleId(id);
    setEditMode(true);
  };

  const handleCloseEditForm = () => {
    setEditMode(false);
    setSelectedArticleId(null);
    fetchArticles(); // Refresh article list after editing
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this article!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5188/api/articles/${id}`);
          fetchArticles(); // Fetch articles again after deletion
          Swal.fire(
            'Deleted!',
            'Your article has been deleted.',
            'success'
          );
        } catch (error) {
          console.error(`Error deleting article with id ${id}: `, error);
          Swal.fire(
            'Error!',
            'Failed to delete article.',
            'error'
          );
        }
      }
    });
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          Error: {error.message}
        </Alert>
      </Container>
    );
  }

  const getProductFamilyName = (id) => {
    const family = productFamilies.find(family => family.id === id);
    return family ? family.name : 'Unknown';
  };

  return (
    <Container className="my-3">
      <Card className="modern-table">
        <Card.Body className="modern-table-body">
          <h2 className="article-title my-1">Article List</h2>
          <Table bordered responsive className="modern-table">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Basic Information</th>
                <th>Details</th>
                <th>Additional Information</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article.id}>
                  <td>{index + 1}</td>
                  <td className="basic-info">
                    <div className="item-type">{article.itemType}</div>
                    <div className="item-number">{article.itemNumber}</div>
                    <div className="description">{article.description}</div>
                    <div className="manufacturer">{article.manufacturer}</div>
                    <div className="barcode">{article.barcode}</div>
                    <div><FaCalendarAlt /> <strong>validFrom: </strong>{new Date(article.validFrom).toLocaleDateString()}</div>
                    <div><FaCalendarAlt /> <strong>validTo: </strong>{new Date(article.validTo).toLocaleDateString()}</div>
                  </td>
                  <td className="details">
                    <div><strong>Quantity:</strong> {article.quantity}</div>
                    <div><strong>Product Family:</strong> {getProductFamilyName(article.productFamilyID)}</div>
                    <div><strong>Qty Step:</strong> {article.qtystep}</div>
                    <div><strong>Warranty:</strong> {article.warranty}</div>
                    <div><strong>Guarantee:</strong> {article.guarantee}</div>
                    <div><strong>Currency:</strong> {article.currency}</div>
                    <div><FaMoneyBillAlt /> <strong>Article price:</strong>{article.price}</div>
                    <div><FaMoneyBillAlt /> <strong>Article purchasePrice:</strong>{article.purchasePrice}</div>
                  </td>
                  <td className="additional-info">
                    <div><strong>Article Group 1:</strong> {article.articleGroup1}</div>
                    <div><strong>Article Group 2:</strong> {article.articleGroup2}</div>
                    <div><strong>Article Group 3:</strong> {article.articleGroup3}</div>
                    <div><strong>Article Group 4:</strong> {article.articleGroup4}</div>
                    <div><strong>Article Group 5:</strong> {article.articleGroup5}</div>
                    <div><strong>VAT:</strong> {article.vat}</div>

                    <div className="dropdown-container">
                      <DropdownButton
                        variant="light"
                        title={<FaEllipsisV style={{ cursor: 'pointer' }} />}
                        id={`dropdown-${article.id}`}
                        className="dropdown-button"
                      >
                        <Dropdown.Item onClick={() => handleEdit(article.id)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(article.id)}>Delete</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        {editMode && (
          <EditForm articleId={selectedArticleId} onClose={handleCloseEditForm} />
        )}
      </Card>
    </Container>
  );
};

export default Article;
