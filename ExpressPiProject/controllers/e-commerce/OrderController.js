const Order = require('../../models/e-commerce/Order');

const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).send({ message: 'No order items' });
    }

    const order = new Order({
      // user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).send({ message: 'New order created', order: createdOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

//

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');

    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  //   updateOrderToPaid,
  //   updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
};
