const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem'); // Ensure MenuItem is imported
router.use(express.json());

// Add to cart route
router.post('/add', async (req, res) => {
  const { itemId, quantity } = req.body;

  console.log('Received request to add to cart:', { itemId, quantity });

  try {
    const menuItem = await MenuItem.findById(itemId);
    console.log('Menu item fetched:', menuItem);

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    let cartItem = await CartItem.findOne({ itemId });
    console.log('Cart item fetched:', cartItem);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({
        itemId,
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        image: menuItem.image,
        quantity,
      });
    }

    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    console.error('Error adding item to cart:', err); // Log error for debugging
    res.status(400).json({ error: 'Failed to add to cart' });
  }
});

// Fetch cart items route
router.get('/items', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Increment item quantity route
router.post('/increment/:itemId', async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.itemId);
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    }
    res.json(cartItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to increment cart item' });
  }
});

// Decrement item quantity route
router.post('/decrement/:itemId', async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.itemId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    }
    res.json(cartItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to decrement cart item' });
  }
});

// Remove item from cart route
router.post('/remove/:itemId', async (req, res) => {
  try {
    await CartItem.deleteOne({ _id: req.params.itemId });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to remove cart item' });
  }
});

// Clear cart route
router.post('/clear', async (req, res) => {
  try {
    await CartItem.deleteMany();
    res.status(200).send('Cart cleared successfully');
  } catch (error) {
    res.status(500).send('Error clearing cart');
  }
});

// Place order route
router.post('/order', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const newOrder = new Order({
      items: cartItems,
      totalPrice,
    });

    await newOrder.save();
    await CartItem.deleteMany(); // Clear the cart after placing the order

    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});

module.exports = router;
