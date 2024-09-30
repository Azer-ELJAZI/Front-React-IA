import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { FaSearch } from 'react-icons/fa'; // Import des icônes
import Swal from 'sweetalert2';
import EditForm from '../EditForm/EditForm';
import ShowDetails from '../ShowDetails/ShowDetails';
import './Article.css';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [productFamilies, setProductFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/Article');
      
      const articlesData = response.data;

      if (Array.isArray(articlesData)) {
        setArticles(articlesData);
      } else if (articlesData && Array.isArray(articlesData["$values"])) {
        setArticles(articlesData["$values"]);
      } else {
        setArticles([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductFamilies = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/ProductFamily');
      setProductFamilies(response.data["$values"] || []);
    } catch (error) {
      console.error("Error fetching product families:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchProductFamilies();
  }, []);

  const handleEdit = (id) => {
    setSelectedArticle(getArticleById(id));
    setEditMode(true);
  };

  const handleCloseEditForm = () => {
    setEditMode(false);
    setSelectedArticle(null);
    fetchArticles();
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
          await axios.delete(`http://localhost:5188/api/Article/${id}`);
          fetchArticles();
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

  const handleShowDetails = (id) => {
    setSelectedArticle(getArticleById(id));
    setShowDetailsModal(true);
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

  const getArticleById = (id) => {
    return articles.find(article => article.id === id);
  };

  // Filter articles based on search term
  const filteredArticles = articles.filter(article =>
    article.itemType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-3">
      <h1 className="mt-5 text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.2rem'}}>Article List</h1>
      <Form.Group controlId="searchForm" className="search-bar" style={{ marginBottom: '1.9rem', textAlign: 'center' }}>
        <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
          <FaSearch style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999',
          }} />
          <Form.Control
            type="text"
            placeholder="Search by Item "
            value={searchTerm}
            aria-label="Search"
              aria-describedby="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: '40px', 
              borderRadius: '25px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
              height: '45px',
              fontSize: '1.1rem',
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
      </Form.Group>

      {/* Search Bar */}
         
      <Card className="modern-table">
        <Card.Body className="modern-table-body">



          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item Type</th>
                <th scope="col">Item Number</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                  <tr key={article.id} className="article-row">
                    <td>{index + 1}</td>
                    <td>{article.itemType}</td>
                    <td>{article.itemNumber}</td>
                    <td>{article.description}</td>
                    <td>
                      <Button variant="link" onClick={() => handleEdit(article.id)}>Edit</Button>
                      <Button variant="link" onClick={() => handleDelete(article.id)}>Delete</Button>
                      <Button variant="link" onClick={() => handleShowDetails(article.id)}>Show Details</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No articles found</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Body>
        
        {editMode && (
          <EditForm articleId={selectedArticle?.id} onClose={handleCloseEditForm} />
        )}
        
        {showDetailsModal && (
          <ShowDetails 
            show={showDetailsModal} 
            onHide={() => setShowDetailsModal(false)} 
            article={selectedArticle} 
          />
        )}
      </Card>
    </Container>
  );
};

export default Article;
