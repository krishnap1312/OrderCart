// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String // URL to image
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
