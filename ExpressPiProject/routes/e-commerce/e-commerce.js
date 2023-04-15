const express = require('express');
const router = express.Router();
const productController = require('../../controllers/e-commerce/produit');
const upload = require('../../services/multer');
//const multer = require('multer');
//const upload = multer({ dest: 'uploads/' });
// Create a new product
router.post('/', upload.array('images'), productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

router.get('/:type', productController.getByType);
// Update a product by ID
router.put('/update/:id', productController.updateProductById);

// Delete a product by ID
router.delete('/:id', productController.deleteProductById);

// Get a single product by ID
router.get('/find/:id', productController.getProductById);

router.get('/search/:name', productController.searchByName);

module.exports = router;
