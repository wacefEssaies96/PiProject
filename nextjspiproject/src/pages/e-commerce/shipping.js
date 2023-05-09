import { Container, Form, Button } from 'react-bootstrap';

import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../../components/e-commerce/checkoutWizard';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import withAuth from '@/components/Withauth';
//import withAuth from '@/utils/Withauth';
function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();
  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/e-commerce/payment');
  };

  return (
    <Container
      title="Shipping Address"
      className="my-4 mx-auto max-w-screen-md"
    >
      <CheckoutWizard activeStep={1} />
      <div className="card p-4">
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label htmlFor="fullName">Full Name</label>
            <input
              className="form-control"
              id="fullName"
              autoFocus
              {...register('fullName', {
                required: 'Please enter full name',
              })}
            />
            {errors.fullName && (
              <div className="text-danger">{errors.fullName.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address">Address</label>
            <input
              className="form-control"
              id="address"
              {...register('address', {
                required: 'Please enter address',
                minLength: {
                  value: 3,
                  message: 'Address is more than 2 chars',
                },
              })}
            />
            {errors.address && (
              <div className="text-danger">{errors.address.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="city">City</label>
            <input
              className="form-control"
              id="city"
              {...register('city', {
                required: 'Please enter city',
              })}
            />
            {errors.city && (
              <div className="text-danger">{errors.city.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              className="form-control"
              id="postalCode"
              {...register('postalCode', {
                required: 'Please enter postal code',
              })}
            />
            {errors.postalCode && (
              <div className="text-danger">{errors.postalCode.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="country">Country</label>
            <input
              className="form-control"
              id="country"
              {...register('country', {
                required: 'Please enter country',
              })}
            />
            {errors.country && (
              <div className="text-danger">{errors.country.message}</div>
            )}
          </div>
          <div className="mb-4 text-center">
            <button className="btn btn-primary">Next</button>
          </div>
        </form>
      </div>
    </Container>
  );
}
//need to add withauth
export default withAuth(ShippingScreen);
