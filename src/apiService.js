import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5188/api',
});

const API_URL = 'http://localhost:5188/api/serviceCases';

export const getCompanies = () => instance.get('/companies');
export const createCompany = (company) => instance.post('/companies', company);
export const deleteCompany = (id) => instance.delete(`/companies/${id}`);
export const updateCompany = (id, company) => instance.put(`/companies/${id}`, company);
export const getCompany = (id) => instance.get(`/companies/${id}`);

export const getServiceCases = () => instance.get('/serviceCases');
export const createServiceCase = (serviceCase) => instance.post('/serviceCases', serviceCase);
export const deleteServiceCase = (id) => instance.delete(`/serviceCases/${id}`);
export const getServiceCase = (id) => instance.get(`/serviceCases/${id}`);
export const getServiceCaseById = (id) => instance.get(`/serviceCases/${id}`);
export const updateServiceCase = (id, data) => instance.put(`/serviceCases/${id}`, data);

// Fonctions pour les articles
export const getArticles = () => instance.get('/articles');
// export const createArticle = (article) => instance.post('/articles', article);
export const deleteArticle = (id) => instance.delete(`/articles/${id}`);
export const updateArticle = (id, article) => instance.put(`/articles/${id}`, article);
export const getArticle = (id) => instance.get(`/articles/${id}`);
// apiService.js





// Fonctions pour les Product Families
export const getProductFamilies = async () => {
  try {
    const response = await instance.get('/ProductFamily');
    return response.data; // Ensure this returns data directly
  } catch (error) {
    throw error;
  }
};

export const getProductFamily = async (id) => {
  try {
    const response = await instance.get(`/ProductFamily/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProductFamily = async (data) => {
  try {
    const response = await instance.post('/ProductFamily', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductFamily = async (id, data) => {
  try {
    const response = await instance.put(`/ProductFamily/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductFamily = async (id) => {
  try {
    const response = await instance.delete(`/ProductFamily/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }












};





export default instance;
