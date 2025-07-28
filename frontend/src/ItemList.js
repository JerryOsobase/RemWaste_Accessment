import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api';
import './styles.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await axios.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch items', err);
    }
  };

  const handleDelete = async (id) => {
    setDeletingItemId(id);
    try {
      // Animate item out first
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isFading: true } : item
        )
      );
      // Wait for animation
      setTimeout(async () => {
        await axios.delete(`/items/${id}`);
        await fetchItems(); // Refresh list
        setDeletingItemId(null);
      }, 300); // Matches CSS transition
    } catch (err) {
      console.error('Delete failed', err);
      setDeletingItemId(null);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">My Items</h1>
      {items.length === 0 ? (
        <div className="no-items">No Item Added</div>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`item-card ${item.isFading ? 'fade-out' : ''}`}
            >
              <h3>{item.name}</h3>
              <p>{item.description || 'No description'}</p>
              <div className="item-actions">
                <button
                  className="btn-secondary small"
                  onClick={() => navigate(`/edit/${item.id}`)}
                  disabled={deletingItemId === item.id}
                >
                  Edit
                </button>
                <button
                  className="btn-danger small"
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingItemId === item.id}
                >
                  {deletingItemId === item.id ? (
                    <>
                      Deleting <span className="spinner" />
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
