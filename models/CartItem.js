// models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemId: mongoose.Schema.Types.ObjectId,
  quantity: Number
});

module.exports = mongoose.model('CartItem', cartItemSchema);
