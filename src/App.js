import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Case from './components/Case';
import ClientPage from './components/ClientPage';
import Company from './components/Company';
import Dashboard from './components/Dashboard';
import DisplayCompanies from './components/DisplayCompanies';
import List from './components/List';
import Material from './components/Material';
import Modifier from './components/Modifier';
import ModifierService from './components/ModifierService';
import MyNavbar from './components/Navbar';
import ServiceCases from './components/ServiceCases'; // Ajout de l'import pour ServiceCases
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarShow, setSidebarShow] = useState(false);

  const handleSidebarOpen = () => setSidebarShow(true);
  const handleSidebarClose = () => setSidebarShow(false);

  return (
    <Router>
      <div className="App">
        <MyNavbar onSidebarOpen={handleSidebarOpen} />
        <Sidebar show={sidebarShow} handleClose={handleSidebarClose} />
        <div className="content">
          <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/material" element={<Material />} />
            <Route path="/Company" element={<Company />} />
            <Route path="/display-companies" exact component={DisplayCompanies} />
            <Route path="/modifier/:id" element={<Modifier />} />
            <Route path="/service-cases" element={<ServiceCases />} /> // Route pour les Service Cases
            <Route path="/service-case" element={<Case />} /> {/* Assurez-vous que le chemin est correct */}
            <Route path="/modifier-service/:id" element={<ModifierService />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
