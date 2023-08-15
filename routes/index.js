const express = require('express');
const router = express.Router();
const path = require('path');

const mongoose = require('mongoose');

const connectDB = require('../MongoDB/modules/db');
const Favorite = require('../MongoDB/favorites');
const Product = require('../MongoDB/shoppingbag');
connectDB(true);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});
  
const User = mongoose.model('User', userSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Route for the root
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/main.html'));
});

router.get('/clothing', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/clothing.html'));
});

router.get('/candles', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/candles.html'));
});

router.get('/ceramics', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/ceramics.html'));
});

router.get('/favorites', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/favorites.html'));
});

router.get('/shoppingbag', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/shoppingbag.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/register.html'));
});

router.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/checkout.html'));
});

// Route for /addname
router.post('/register', (req, res) => {
  const formData = new User(req.body);
  formData.DateTime = new Date().toLocaleString();

  formData.save()
  .then((savedUser) => {
      const context = {
          name: savedUser.name,
          email: savedUser.email,
          password: savedUser.password
      };
      res.json({ success: true, user: savedUser });
  })
  .catch(error => {
      console.error('Failed to save user:', error);
      res.status(500).send('Internal Server Error');
  });
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/login.html'));
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Find the user with the submitted email
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }
      // Compare the submitted password with the stored password
      if (password === user.password) {
        // Login successful
        res.redirect('/');
      } else {
        // Password incorrect
        res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
    })
    .catch(err => {
      console.error('Login failed:', err);
      res.status(500).send('Internal Server Error');
    });
});

router.post('/addFavorite', (req, res) => {
  const favoriteData = new Favorite(req.body);
  favoriteData.save()
    .then((savedFavorite) => {
      res.json({ success: true, favorite: savedFavorite });
    })
    .catch(error => {
      console.error('Failed to save favorite:', error);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/getFavorites', (req, res) => {
  Favorite.find({})
      .then(favorites => {
          res.json(favorites);
      })
      .catch(error => {
          console.error('Failed to fetch favorites:', error);
          res.status(500).send('Internal Server Error');
      });
});

router.post('/add-to-bag', (req, res) => {
  const product = new Product(req.body);
  product.save()
    .then(() => res.json('Product added!'))
    .catch(error => {
      console.error('Failed to save Products:', error);
      res.status(500).send('Internal Server Error');
  });
});

router.get('/shopping-bag', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(error => {
      console.error('Failed to fetch Products:', error);
      res.status(500).send('Internal Server Error');
  });
});

router.post('/subscribe', (req, res) => {
  const subscriptionData = new Subscription(req.body);
  subscriptionData.save()
  .then((savedSubscription) => {
      res.json({ success: true, email: savedSubscription.email });
  })
  .catch(error => {
      console.error('Failed to save subscription:', error);
      res.status(500).send('Internal Server Error');
  });
});

module.exports = router;