const Order = require('../../models/e-commerce/Order');
//const cookieParser = require('cookie-parser');
//app.use(cookieParser());

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
    console.log(req.body.userId);

    //const userId = req.cookies.user._id;

    const userId = req.body.userId;

    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    //console.log(req.user.id);
    console.log(req);
    console.log(req.user);
    const createdOrder = await order.save();

    res.status(201).send({ message: 'New order created', order: createdOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

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
const stripe = require('stripe')(
  'sk_test_51N3N5NFKx98hXj7hnBQ1bRQaArBgsy9GpjelTQp4kzkXWTrgcj568mhmnVuYYYBpoLA9XdL5YGB9EuWkZJPCBI3K00S5SykBaz'
); // Replace with your Stripe API key

const createPaymentSession = async (req, res) => {
  console.log('hi');
  const orderId = req.params.id; // Get the order ID from the request params
  try {
    // Find the order in the database
    const order = await Order.findById(orderId);
    console.log(order);
    // Create a new payment session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.orderItems.map((item) => ({
        name: item.name,
        amount: Math.round(item.price * 100),
        quantity: item.quantityy,
        currency: 'usd',
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order/${order._id}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/order/${order._id}/cancel`,
      metadata: {
        orderId: order._id.toString(),
        userId: order.user._id.toString(),
      },
    });

    // Update the order with the payment session ID
    order.paymentSessionId = session.id;
    await order.save();

    // Send the session ID back to the client
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment session.' });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  //   updateOrderToPaid,
  //   updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
  createPaymentSession,
};
