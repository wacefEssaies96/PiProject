import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FeaturedProducts from '../../components/e-commerce/FeaturedProducts';
import Link from 'next/link';
import ProductItem from '../../components/e-commerce/ProductItem';
import { useContext } from 'react';
import { Store } from '@/utils/Store';
import axios from 'axios';

export default function Index({ products }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    console.log('hi');
    const quantityy = existItem ? existItem.quantityy + 1 : 1;
    const { data } = await axios.get(
      `${process.env.backurl}/api/admin/products/find/${product._id}`
    );
    if (data.quantity < quantityy) {
      return alert('Sorry. Product is out of stockk');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantityy } });

    //toast.success('Product added to the cart');
  };
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .filter((product) => (priceFilter ? product.price <= priceFilter : true));

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  return (
    <Container>
      <h1 className="my-5 text-center">Shop by category</h1>
      <Row>
        <Col md={3}>
          <div className="mb-4 bg-light p-3 border rounded">
            <h5 className="font-weight-bold mb-2">Category</h5>
            <hr className="mb-0" />
            <select
              value={categoryFilter || ''}
              onChange={handleCategoryFilterChange}
              className="form-control mt-2"
            >
              <option value="">All categories</option>
            </select>
          </div>
          <div className="mb-4 bg-light p-3 border rounded">
            <h5 className="font-weight-bold mb-2">Price</h5>
            <hr className="mb-0" />
            <select
              value={priceFilter || ''}
              onChange={handlePriceFilterChange}
              className="form-control mt-2"
            >
              <option value="">All prices</option>
            </select>
          </div>
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              className="form-control mr-2"
            />
            <Button variant="warning">Search</Button>
          </div>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3} className="mb-4">
                <ProductItem
                  product={product}
                  key={product.name}
                  addToCartHandler={addToCartHandler}
                ></ProductItem>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.backurl}/api/admin/products`);
  const data = await response.json();

  return {
    props: {
      products: data,
    },
  };
}
