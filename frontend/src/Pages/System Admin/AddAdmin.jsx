import React, { useState } from 'react';
import axios from 'axios';
import './AddLotManager.css';

const AddAdmin = ({ onAddSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/addAdmin', formData);
      setSuccessMessage(response.data);  // Display success message
      setErrorMessage('');
      setFormData({
        email: '',
        password: '',
      });
      onAddSuccess(); // Notify the parent component (Admin) that a lot manager was added successfully
    } catch (error) {
      setErrorMessage('Failed to add admin');
      setSuccessMessage('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>X</button>
        <h2>Add Admin</h2>
        <form onSubmit={handleAddAdmin}>
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
          <button type="submit">Add Admin</button>
        </form>

        {/* Success and Error Messages */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default AddAdmin;
