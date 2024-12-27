import React, { useState } from 'react';
import axios from 'axios';
import './AddLotManager.css';

const AddLotManager = ({ onAddSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Submit the form to add a new Lot Manager
  const handleAddLotManager = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/addLotManager', formData);
      setSuccessMessage(response.data);  // Display success message
      setErrorMessage('');
      setFormData({
        email: '',
        password: '',
        name: '',
        phone: ''
      });
      onAddSuccess(); // Notify the parent component (LotManagers) that a lot manager was added successfully
    } catch (error) {
      setErrorMessage('Failed to add lot manager');
      setSuccessMessage('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>X</button>
        <h2>Add Lot Manager</h2>
        <form onSubmit={handleAddLotManager}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Lot Manager</button>
        </form>

        {/* Success and Error Messages */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default AddLotManager;
