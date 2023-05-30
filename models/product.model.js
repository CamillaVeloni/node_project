const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true, 
    unique: true,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    default: null
  },
  isHotSale: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}).set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id  }
});

const ProductModel = db.model('Product', ProductSchema);

module.exports = ProductModel;