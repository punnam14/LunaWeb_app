const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    imagePath: { type: String, required: true },
    price: { type: String, required: true },
    color: {type: String, required: true}
  });
  
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;