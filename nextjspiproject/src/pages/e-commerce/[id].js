import React, { useContext } from 'react';
import { fetchData } from '@/services/mix';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import { Store } from '@/utils/Store';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
export default function ProductScreen({ product }) {
  // const { product } = props;
  const { state, dispatch } = useContext(Store);
  console.log(product);
  // const router = useRouter();
  // useEffect(() => {
  //   if (!product) {
  //     router.push('/404');
  //   }
  // }, [product]);

  if (!product._id) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <p>We're sorry, but the product you are looking for cannot be found.</p>
      </div>
    );
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    //const existItem = cart.cartItems.find((x) => x._id === product._id);

    const quantityy = existItem ? existItem.quantityy + 1 : 1;
    const { data } = await axios.get(
      `${process.env.backurl}/api/admin/products/find/${product._id}`
    );
    console.log(data);
    if (data.quantity < quantityy) {
      return alert('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantityy } });
    console.log(state.cart.cartItems);
  };

  // const handleToast = () => {
  //   toast.success('This is a success toast message!', {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  return (
    <Container className="my-5">
      <Link href="/e-commerce"> Back to product</Link>
      <Row>
        <Col md={6}>
          <Image src={`${process.env.backurl}/${product.images}`} fluid />
        </Col>
        <Col md={6}>
          <h1 className="mb-4">{product.name}</h1>
          <h1 className="mb-4">{product.quantity}</h1>

          <h2 className="text-primary font-weight-bold mb-4">
            ${product.price}
          </h2>
          <div
            className={`badge badge-${
              product.quantity > 0 ? 'success' : 'danger'
            } mb-4`}
          >
            {product.quantity > 0 ? 'In stock' : 'Unavailable'}
          </div>
          <p className="text-muted mb-4">
            {product.marque} - {product.type}
          </p>
          <p className="mb-4">{product.description}</p>
          <Button
            variant="primary"
            size="lg"
            block={true}
            className="mt-4"
            disabled={product.quantity === 0}
            onClick={addToCartHandler}
          >
            {product.quantity === 0 ? 'Out of stock' : 'Add to cart'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const data = await fetchData(
    `${process.env.backurl}/api/admin/products/find/${context.query.id}`
  );
  return {
    props: {
      product: data,
    },
  };
}
