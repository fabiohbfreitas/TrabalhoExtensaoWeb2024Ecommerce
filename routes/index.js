const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Product 1', price: 10.00, description: 'Description of Product 1' },
  { id: 2, name: 'Product 2', price: 20.00, description: 'Description of Product 2' },
  { id: 3, name: 'Product 3', price: 30.00, description: 'Description of Product 3' }
];

router.get('/', (req, res) => {
  res.render('index', { products });
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
