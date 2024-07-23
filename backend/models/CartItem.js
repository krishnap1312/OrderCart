const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('CartItem', cartItemSchema);