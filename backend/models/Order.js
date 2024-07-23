const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
