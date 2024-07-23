import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
import Modal from '../Modal/Modal';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart/items');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleIncrement = async (itemId) => {
    try {
      await axios.post(`http://localhost:5000/api/cart/increment/${itemId}`);
      const updatedItems = cartItems.map(item =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error incrementing item:', error);
    }
  };

  const handleDecrement = async (itemId) => {
    try {
      await axios.post(`http://localhost:5000/api/cart/decrement/${itemId}`);
      const updatedItems = cartItems.map(item =>
        item._id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error decrementing item:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await axios.post(`http://localhost:5000/api/cart/remove/${itemId}`);
      const updatedItems = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart/order');
      setCartItems([]);
      setModalMessage('Order placed successfully!');
      setPaymentSuccess(true);
      setShowQrCode(false);
    } catch (error) {
      console.error('Error processing payment:', error.response?.data || error.message);
    }
  };

  const handleToggleQrCode = () => {
    setShowQrCode(prevShowQrCode => !prevShowQrCode);
  };

  const handleCloseModal = () => {
    setModalMessage('');
    setPaymentSuccess(false);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const generateUpiUri = (amount) => {
    const receiverUpiId = '9039437039@ybl'; 
    const receiverName = '';
    return `upi://pay?pa=${receiverUpiId}&pn=${receiverName}&mc=1234&tid=001&cid=001&amt=${amount}&cu=INR`;
  };

  const generateQrCodeUrl = (amount) => {
    const upiUri = generateUpiUri(amount);
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiUri)}`;
  };

  return (
    <div className='cart-container'>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <img className='EmptyCart' src="/images/shoppingCart.png" alt="Empty Cart" />
          <p className='EmptyMessage'>Your cart is empty 😔</p>
        </div>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item._id} className='cart-item'>
                <img src={item.image} className='cartImage' alt={item.name} />
                <div className='cart-item-details'>
                  <h2>{item.name}</h2>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className='cart-item-controls'>
                  <button onClick={() => handleIncrement(item._id)}>+ Add More</button>
                  <button onClick={() => handleDecrement(item._id)}>- Remove Item</button>
                  <button onClick={() => handleRemove(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className='cart-total'>
            <h2>Total: ₹{totalPrice}</h2>
            {showQrCode && (
              <div className='qr-code-container'>
                <h2>Pay with UPI</h2>
                <img className='qr-code' src={generateQrCodeUrl(totalPrice)} alt="QR Code" />
                <p>Scan and Pay using any UPI</p>
              </div>
            )}
            <button onClick={handleToggleQrCode}>
              {showQrCode ? 'Hide QR Code' : 'Show Payment QR Code'}
            </button>
            <button onClick={handlePayment}>Payment Confirm</button>
          </div>
        </div>
      )}
      {modalMessage && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Cart;
