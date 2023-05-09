import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedProducts = ({ type }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get(
        `${process.env.backurl}/api/admin/products/${type}`
      );
      setProducts(response.data);
      console.log(response.data);
    }
    fetchProducts();
  }, [type]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2>Featured Products</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <Card key={product._id} className="m-3" style={{ width: '18rem' }}>
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
                <StarRatings
                  rating={2}
                  starRatedColor="#FFC107"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                />
              </div>
              <div>
                <h4 className="font-weight-bold mb-3">
                  ${product.price.toFixed(2)}
                </h4>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Slider>
      <style jsx global>{`
        .slick-dots {
          bottom: -40px;
        }
        .slick-prev:before,
        .slick-next:before {
          color: #000;
          font-size: 30px;
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;
