import React, { useEffect, useState } from 'react';
import './MenuItemList.css';
import axios from 'axios';
import Modal from '../Modal/Modal'; 

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => { 
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu/items');
        console.log('Menu items fetched:', response.data); 
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', { itemId: item._id, quantity: 1 });
      console.log('Item added to cart:', response.data);
      setModalMessage('Item added to cart!');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 800); // Hide modal after 0.5s
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        alert(`Failed to add item to cart: ${error.response.data.error}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Failed to add item to cart: No response from server');
      } else {
        console.error('Error message:', error.message);
        alert(`Failed to add item to cart: ${error.message}`);
      }
    }
  };

  return (
    <div className='menu-container'>
      <h1>Menu Items</h1>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
      <ul>
        {menuItems.map(item => (
          <li key={item._id} className='menu-item'>
            {item.image && <img src={item.image} alt={item.name} className='menu-image' />}
            <div className='menu-details'>
              <h2 className='menu-title'>{item.name}</h2>
              <p className='menu-description'>{item.description}</p>
              <p className='menu-price'>Price: ₹{item.price.toFixed(2)}</p>
            </div>
            <button onClick={() => handleAddToCart(item)} className='add-to-cart-button'>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemList;
