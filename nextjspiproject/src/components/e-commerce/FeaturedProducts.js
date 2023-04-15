import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedProducts = ({ type }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get(
        `${process.env.backurl}/api/admin/products/${type}`
      );
      setProducts(response.data);
    }
    fetchProducts();
  }, [type]);

  return (
    <div>
      <h2> Featured Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedProducts;
