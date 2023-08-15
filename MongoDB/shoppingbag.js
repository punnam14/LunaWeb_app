const mongoose = require('mongoose');

// Define a schema for the product
const productSchema = new mongoose.Schema({
    image:  { type: String, required: true },
    price:  { type: String, required: true },
    size:  { type: String, required: true },
});
  
const Product = mongoose.model('Product', productSchema);

module.exports = Product;