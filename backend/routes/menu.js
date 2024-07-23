const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');


router.get('/items', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});


router.post('/add', async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    const newItem = new MenuItem({ name, description, price, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Backend error:', err); // Log the error
    res.status(400).json({ error: 'Failed to add menu item', details: err.message });
  }
});

module.exports = router;
