import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Article from "./components/ArticleComponent/Article.jsx";
import Dashboard from './components/Dashboard';
import Dashboard1 from "./components/Dashboard1/Dashboard1.jsx";
import FormExample from "./components/FormExemple/FormExemple.jsx";
import OffcanvasExample from "./components/Navbar/OffcanvasExample";

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import FormAddServiceCase from "./components/AddServiceCase/FormAddServiceCase.jsx";
import ArticleList from './components/ArticleList';
import Case from './components/Case';
import ClientPage from './components/ClientPage';
import Company from "./components/Companies/Company.jsx";
import CompanyList from "./components/CompaniesList/CompanyList.jsx";
import DisplayCompanies from './components/DisplayCompanies';
import Imagee from "./components/Imagee";
import List from './components/List';

import Material from './components/Material';
import Modifier from './components/Modifier';
import ModifierService from './components/ModifierService';
import ServiceCases from './components/ServiceCases';


// Import new components
import AjouterProduct from './components/AjouterProduct';
import ListProduct from './components/ListProduct';
import ModifierProduct from './components/ModifierProduct';

  

function App() {
  const [sidebarShow, setSidebarShow] = useState(false);

  const handleSidebarOpen = () => setSidebarShow(true);
  const handleSidebarClose = () => setSidebarShow(false);

  return (
    <Router>
      <div>
        <OffcanvasExample />
       
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Form" element={<FormExample />} />
          <Route path="/article" element={<Article />} />
          <Route path="/Dashboard1" element={<Dashboard1 />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/addService" element={<FormAddServiceCase />} />
          <Route path="/Imagee" element={<Imagee />} />

          <Route path="/Companylist" element={<CompanyList />} />
          <Route path="/list" element={<List />} />
          
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/material" element={<Material />} />
            <Route path="/company" element={<Company />} />
            <Route path="/display-companies" element={<DisplayCompanies />} />
            <Route path="/modifier/:id" element={<Modifier />} />
            <Route path="/service-cases" element={<ServiceCases />} />
            <Route path="/service-case" element={<Case />} />
            <Route path="/modifier-service/:id" element={<ModifierService />} />
            <Route path="/articles" element={<ArticleList />} />
            
            {/* New routes for product families */}
            <Route path="/list-product" element={<ListProduct />} />
            <Route path="/ajouter-product" element={<AjouterProduct />} />
            <Route path="/modifier-product/:id" element={<ModifierProduct />} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
