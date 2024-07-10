import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5188/api', // Utilisation de HTTP pour les tests locaux
  // timeout: 1000, // Vous pouvez définir un délai d'attente si nécessaire
});

const API_URL = 'http://localhost:5188/api/serviceCases'; // Correction de l'URL de l'API

export const getCompanies = () => instance.get('/companies');
export const createCompany = (company) => instance.post('/companies', company);
export const deleteCompany = (id) => instance.delete(`/companies/${id}`);
export const updateCompany = (id, company) => instance.put(`/companies/${id}`, company);
export const getCompany = (id) => instance.get(`/companies/${id}`);

// Fonctions pour les cas de service
export const getServiceCases = () => instance.get('/serviceCases');
export const createServiceCase = (serviceCase) => instance.post('/serviceCases', serviceCase);
export const deleteServiceCase = (id) => instance.delete(`/serviceCases/${id}`);

export const getServiceCase = (id) => instance.get(`/serviceCases/${id}`); // Utilisation de `instance` pour les requêtes

export const getServiceCaseById = (id) => instance.get(`/serviceCases/${id}`); // Utilisation de `instance` pour les requêtes

export const updateServiceCase = (id, data) => instance.put(`/serviceCases/${id}`, data); // Utilisation de `instance` pour les requêtes

export default instance;
