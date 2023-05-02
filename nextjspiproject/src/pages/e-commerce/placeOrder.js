import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import nextCookie from 'next-cookies';
//import { getError } from '../utils/error';

import { Store } from '@/utils/Store';
import { Container, Form, Button } from 'react-bootstrap';
import CheckoutWizard from '@/components/e-commerce/checkoutWizard';
export default function PlaceOrderScreen(context) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantityy * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 7;
  const taxPrice = round2(itemsPrice * 0.19);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/e-commerce/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { user } = nextCookie(context);
      const { data } = await axios.post(
        `${process.env.backurl}/api/admin/orders`,
        {
          userId: user._id,
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        }
      );
      //  console.log(data);
      //console.log(data.order._id);
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data.order._id}`);
    } catch (err) {
      setLoading(false);
      toast.error('erreur');
    }
  };

  return (
    <Container title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/e-commerce">Go shopping</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-9">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              <div>
                <Link href="/e-commerce/shipping">Edit</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/e-commerce/payment">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col" className="text-right">
                      Quantity
                    </th>
                    <th scope="col" className="text-right">
                      Price
                    </th>
                    <th scope="col" className="text-right">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <Link
                          href={`/product/${item._id}`}
                          className="d-flex align-items-center"
                        >
                          {/* <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        style={{
                          maxWidth: "100%",
                          height: "auto"
                        }}></Image> */}
                          {item.name}
                        </Link>
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
              <div>
                <Link href="/e-commerce/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>Items</div>
                    <div>{itemsPrice} dt</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>Tva</div>
                    <div>{taxPrice} dt</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>Shipping</div>
                    <div>{shippingPrice} dt</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>Total</div>
                    <div>{totalPrice} dt</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? 'Loading...' : 'Place Order'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

PlaceOrderScreen.auth = true;
