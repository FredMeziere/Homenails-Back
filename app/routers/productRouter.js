const express = require('express');

// on importe nos controllers
const productController = require('../controllers/productController');
// const userMiddleware = require('../middleware/userMiddleware');

const router = express.Router();

// récupération des stretch
router.get('/',  productController.getAllProducts);

// on exporte le router 
module.exports = router;