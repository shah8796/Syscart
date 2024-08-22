// models/Order.js
const mongoose = require('mongoose');
const Cart = require('./cart'); // Import the Item model

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }], // Use ObjectId to reference Item model
  customerId: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
