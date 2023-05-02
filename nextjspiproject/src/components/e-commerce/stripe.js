// import {
//   loadStripe,
//   CardElement,
//   useStripe,
//   useElements,
// } from '@stripe/stripe-js';

// export default function StripeButton({ clientSecret }) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: event.target.name.value,
//             email: event.target.email.value,
//             phone: event.target.phone.value,
//           },
//         },
//       }
//     );

//     if (error) {
//       console.error(error);
//     } else if (paymentIntent.status === 'succeeded') {
//       console.log('Payment successful!');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="name">Name</label>
//         <input type="text" className="form-control" name="name" required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Email</label>
//         <input type="email" className="form-control" name="email" required />
//       </div>
//       <div className="form-group">
//         <label htmlFor="phone">Phone</label>
//         <input type="tel" className="form-control" name="phone" required />
//       </div>
//       <div className="form-group">
//         <label>Card Details</label>
//         <CardElement className="form-control" />
//       </div>
//       <button type="submit" className="btn btn-primary">
//         Pay with Card
//       </button>
//     </form>
//   );
// }
