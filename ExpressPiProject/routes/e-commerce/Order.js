const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/e-commerce/OrderController');

// Route for creating a new order
router.post('/', OrderController.createOrder);

// Route for getting a specific order by ID
router.get('/:id', OrderController.getOrderById);

// Route for getting all orders for the currently logged-in user
router.get('/myorders', OrderController.getMyOrders);

// Route for getting all orders (admin only)
router.get('/', OrderController.getAllOrders);
router.post('/:orderId/pay', OrderController.createPaymentSession);

module.exports = router;
