const express = require('express');
const router = express.Router();

const  CartController  = require('../../controllers/e-commerce/CartController');
//const { authenticationVerifier, accessLevelVerifier, isAdminVerifier } = require('../middlewares/verifyToken');

router.get('/',CartController.get_carts);
router.get('/:userId',CartController.get_cart);
router.post('/',  CartController.create_cart);
router.put('/:id', CartController.update_cart);
router.delete('/:id', CartController.delete_cart);

module.exports = router;