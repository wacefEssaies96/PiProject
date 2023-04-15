import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <Card className="h-100">
      <Link href={`/e-commerce/${product._id}`}>
        <Card.Img
          variant="top"
          src={`${process.env.backurl}/${product.images}`}
          className="p-3"
          style={{ height: '250px', objectFit: 'contain' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </div>
        <div>
          <h4 className="font-weight-bold mb-3">${product.price.toFixed(2)}</h4>
          <Button
            variant="primary"
            block
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
