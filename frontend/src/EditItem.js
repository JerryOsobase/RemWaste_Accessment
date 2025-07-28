import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './api';
import './styles.css';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`/items/${id}`);
        setFormData({ name: res.data.name, description: res.data.description || '' });
      } catch (err) {
        console.error('Failed to fetch item', err);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Name is required');
    try {
      await axios.put(`/items/${id}`, formData);
      navigate('/'); // <-- corrected path
    } catch (err) {
      console.error('Failed to update item', err);
      alert('Update failed');
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Edit Item</h1>
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
        <button type="submit" className="btn-primary full-width">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;
