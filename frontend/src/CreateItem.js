import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api';
import './styles.css';

const CreateItem = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Name is required');

    try {
      const res = await axios.post('/items', formData);
      if (res.status === 201) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
        }, 5000); // Show popup for 5 seconds, then redirect
      }
    } catch (err) {
      console.error('Failed to create item', err);
      alert('Failed to create item');
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Create New Item</h1>
      <form className="item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit" className="btn-primary full-width">Add Item</button>
      </form>

      {showSuccess && (
        <div className="modal success-popup">
          <p>✅ Item created successfully</p>
        </div>
      )}
    </div>
  );
};

export default CreateItem;
