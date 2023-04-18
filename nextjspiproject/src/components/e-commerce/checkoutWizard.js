import React from 'react';
import { Container } from 'react-bootstrap';
import { FaUser, FaShippingFast, FaCreditCard, FaCheck } from 'react-icons/fa';

export default function CheckoutWizard({ activeStep = 0 }) {
  const steps = [
    { label: 'User Login', icon: <FaUser /> },
    { label: 'Shipping Address', icon: <FaShippingFast /> },
    { label: 'Payment Method', icon: <FaCreditCard /> },
    { label: 'Place Order', icon: <FaCheck /> },
  ];

  return (
    <Container>
      <div className="mb-5 d-flex justify-content-center align-items-center">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={`d-flex flex-column align-items-center mx-5 ${
              index <= activeStep ? 'text-primary' : 'text-secondary'
            }`}
          >
            <div
              className={`rounded-circle border border-${
                index <= activeStep ? 'primary' : 'secondary'
              } d-flex justify-content-center align-items-center p-2 rounded-icon`}
            >
              {step.icon}
            </div>
            <div>{step.label}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}
