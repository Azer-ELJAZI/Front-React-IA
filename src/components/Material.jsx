// src/Material.jsx
import React, { useState } from 'react';

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddMaterial = () => {
    const newMaterial = { id: Date.now(), name, quantity };
    setMaterials([...materials, newMaterial]);
    setName('');
    setQuantity('');
  };

  const handleDeleteMaterial = (id) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Material Management</h2>

      <form onSubmit={(e) => { e.preventDefault(); handleAddMaterial(); }}>
        <div className="mb-3">
          <label htmlFor="materialName" className="form-label">Material Name</label>
          <input
            type="text"
            className="form-control"
            id="materialName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="materialQuantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="materialQuantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Material</button>
      </form>

      <h3 className="mt-4">Stock List</h3>
      <ul className="list-group">
        {materials.map(material => (
          <li key={material.id} className="list-group-item d-flex justify-content-between align-items-center">
            {material.name} - {material.quantity}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMaterial(material.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Material;
