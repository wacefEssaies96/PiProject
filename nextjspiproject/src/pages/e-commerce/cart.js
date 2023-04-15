import React, { useContext } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
//import { XCircleIcon } from '@heroicons/react/outline';
import { FaTimesCircle } from 'react-icons/fa';

export default function cartScreen({ product }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  //console.log(cartItems);
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantityy = Number(qty);
    const { data } = await axios.get(
      `${process.env.backurl}/api/admin/products/find/${item._id}`
    );
    console.log(data);
    if (data.quantity < quantityy) {
      return alert('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantityy } });
    alert('Product updated in the cart');
  };
  return (
    <Container title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {/* {console.log(cartItems)} */}
      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-9">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Link href={`/product/${item._id}`} legacyBehavior>
                        <a className="d-flex align-items-center">
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="text-right">
                      <select
                        value={item.quantityy}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.quantity).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-right">${item.price}</td>
                    <td className=" text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <FaTimesCircle className="h-5 w-5"></FaTimesCircle>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <ul className="list-unstyled">
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantityy, 0)}
                      ) : $
                      {cartItems.reduce((a, c) => a + c.quantityy * c.price, 0)}
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push('/e-commerce/shipping')}
                      className="btn btn-primary btn-block"
                    >
                      Check Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
