import CheckoutWizard from '@/components/e-commerce/checkoutWizard';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Store } from '@/utils/Store';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/e-commerce/placeOrder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/e-commerce/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);
  return (
    <Container className="my-4 mx-auto max-w-screen-md">
      <CheckoutWizard activeStep={2} />
      <Form onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        <Form.Group>
          {['Payment by credit card', 'CashOnDelivery'].map((payment) => (
            <Form.Check
              key={payment}
              type="radio"
              name="paymentMethod"
              id={payment}
              label={payment}
              className="mb-3"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
          ))}
        </Form.Group>
        <div className="mb-4 d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={() => router.push('/e-commerce/shipping')}
            type="button"
          >
            Back
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </Container>
  );
}
