import Link from 'next/link';
import { Container, Table, Button } from 'react-bootstrap';
import { useState } from 'react';
import { fetchData } from '@/services/mix';

import React from 'react';

export default function Index({ orders }) {
  const [list, setList] = useState(orders);

  return (
    <Container>
      <h1>List of Orders</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Orders</th>
            <th>Items Price</th>
            <th>Shipping Price</th>
            <th>Tax Price</th>
            <th>Total Price</th>
            <th>Paid</th>
            <th>Delivered</th>
          </tr>
        </thead>
        <tbody>
          {list.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td></td>
              <td>
                {' '}
                {order.orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </td>
              <td>{order.itemsPrice}</td>
              <td>{order.shippingPrice}</td>
              <td>{order.taxPrice}</td>
              <td>{order.totalPrice}</td>
              <td>{order.isPaid ? 'Yes' : 'No'}</td>
              <td>{order.isDelivered ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export async function getServerSideProps() {
  const data = await fetchData(`${process.env.backurl}/api/admin/orders`);
  return {
    props: {
      orders: data,
    },
  };
}
