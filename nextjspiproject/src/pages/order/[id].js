//import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
//import { useSession } from 'next-auth/react';
//import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
//import { toast } from 'react-toastify';
import { Container, Form, Button } from 'react-bootstrap';
import {
  loadStripe,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/stripe-js';
import Stripe from 'stripe';
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      state;
  }
}
function OrderScreen() {
  const [stripe, setStripe] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loadingStripe, setLoadingStripe] = useState(false);

  const { query } = useRouter();
  const orderId = query.id;
  console.log(orderId);

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  useEffect(() => {
    async function fetchOrder() {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `${process.env.backurl}/api/admin/orders/${orderId}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setClientSecret(data.client_secret);
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: 'An error occurred while fetching data.',
        });
      }
    }

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }

    if (!stripe) {
      setLoadingStripe(true);
      loadStripe(
        'pk_test_51N3N5NFKx98hXj7hG2DN5cqEishc6oZNTW8ct3CQXLO8wfnmR3vf9WjZ75sCW2sFUMOhN5whUJkvLWITxYNhQ5kG00hs0v9qH9'
      ).then((stripe) => {
        setStripe(stripe);
        setLoadingStripe(false);
      });
    }
  }, [order, orderId, stripe]);
  const handlePayButtonClick = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.backurl}/api/admin/orders/${orderId}/pay`,
        {}
        // { withCredentials: true }
      );
      console.log('data', data);
      //   const sessionId = data.url;
      window.location = data.url; // Redirect the user to the Stripe checkout page

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });
      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      dispatch({ type: 'PAY_FAIL', payload: err.message });
    }
  };

  return (
    <Container title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row">
          <div className="col-md-9">
            <div className="card p-3 mt-3 custom-card">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {`${shippingAddress.fullName} ${shippingAddress.address} ${shippingAddress.city} ${shippingAddress.postalCode} ${shippingAddress.country}`}
              </div>

              {isDelivered ? (
                <div className="alert alert-success">
                  Delivered at {deliveredAt}
                </div>
              ) : (
                <div className="alert alert-danger">Not delivered</div>
              )}
            </div>

            <div className="card p-3 mt-3">
              <h2 className="mb-3">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert alert-danger">Not paid</div>
              )}
            </div>

            <div className="card p-3 mt-3">
              <h2 className="mb-3">Order Items</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <Link href={`/product/${item._id}`}>{item.name}</Link>
                      </td>
                      <td className="text-right">{item.quantityy}</td>
                      <td className="text-right">{item.price}dt</td>
                      <td className="text-right">
                        {item.quantityy * item.price}dt
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3">
              <h2 className="mb-3">Order Summary</h2>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex justify-content-between">
                  <div>Items</div>
                  <div>{itemsPrice}dt</div>
                </li>
                <li className="mb-2 d-flex justify-content-between">
                  <div>TVA</div>
                  <div>{taxPrice}dt</div>
                </li>
                <li className="mb-2 d-flex justify-content-between">
                  <div>Shipping</div>
                  <div>{shippingPrice}dt</div>
                </li>
                <li className="mb-2 d-flex justify-content-between">
                  <div>Total</div>
                  <div>{totalPrice}dt</div>
                </li>
              </ul>
              <button
                className="btn btn-primary"
                onClick={handlePayButtonClick}
                disabled={
                  loadingPay ||
                  isPaid ||
                  loadingDeliver ||
                  isDelivered ||
                  loadingStripe
                }
              >
                {loadingPay
                  ? 'Processing payment...'
                  : isPaid
                  ? 'Paid'
                  : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

//OrderScreen.auth = true;
export default OrderScreen;
