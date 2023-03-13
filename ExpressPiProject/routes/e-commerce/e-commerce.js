const express = require('express');
const router = express.Router();
const productController = require('../../controllers/e-commerce/produit');

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getProducts);


// Update a product by ID
router.put('/:id', productController.updateProductById);

// Delete a product by ID
router.delete('/:id', productController.deleteProductById);

// Get a single product by ID
router.get('/:id', productController.getProductById);

router.get('/search/:name',productController.searchByName);

module.exports = router;
