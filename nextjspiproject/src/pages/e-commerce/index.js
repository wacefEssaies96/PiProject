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
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ReactPaginate from 'react-paginate';

export default function Index({ products }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [priceFilterValue, setPriceFilterValue] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);

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
      toast.error('Sorry. Product is out of stockk');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantityy } });

    toast.success('Product added to the cart');
  };
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    setPriceFilter(value[1]);
  };

  const [productsPerPage, setProductsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <Container style={{}}>
      <ToastContainer position="top-left" limit={1} />
      <h1 className="my-5 text-center">Shop </h1>
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
              <option value="Complément alimentaire">
                Complément alimentaire
              </option>
              <option value="Protein Bars">Protein Bars</option>
              <option value="proteines">Proteines</option>
              <option value="Weight Management">carbohydrates</option>
              <option value="Meal Replacement">acides-amines</option>
              <option value="Vitamins and Supplements">
                Vitamins and Supplements
              </option>

              <option value="Snacks and Treats">Snacks and Treats</option>
              <option value="acides-gras">acides-gras</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Organic">Organic</option>
              <option value="Non-GMO">Non-GMO</option>
            </select>
          </div>
          <div className="mb-4 bg-light p-3 border rounded">
            <h5 className="font-weight-bold mb-2">Price range</h5>
            <hr className="mb-0" />
            <Slider
              range
              min={0}
              max={500}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
            <div className="mt-2 d-flex justify-content-between">
              <span>{priceRange[0]}dt</span>
              <span>{priceRange[1]}dt</span>
            </div>
          </div>
          {/* <Col md={3}> */}
        </Col>
        {/* </Col> */}

        <Col md={9}>
          <div className="d-flex justify-content-center align-items-center mb-">
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
            {currentProducts.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3} className="mb-2">
                <ProductItem
                  product={product}
                  key={product.name}
                  addToCartHandler={addToCartHandler}
                ></ProductItem>
              </Col>
            ))}
          </Row>
        </Col>
        <ReactPaginate
          pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          disabledClassName="disabled"
        />
      </Row>
      <FeaturedProducts type="featured" />
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
