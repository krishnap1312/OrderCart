import React, { useState } from 'react';
import "./AddMenuItem.css";
import axios from 'axios';

const AddMenuItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = { name, description, price, image };
      await axios.post('http://localhost:5000/api/menu/add', newItem); 
      
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      alert('Menu item added successfully!');
    } catch (error) {
      console.error('Error adding menu item:', error.response || error);
      alert('Failed to add menu item');
    }
  };

  return (
    <div className='AddMenuDiv'>
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
