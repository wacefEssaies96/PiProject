import { useEffect, useState } from 'react';
import { submitProduct } from '@/services/products';
import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import { Table } from 'react-bootstrap';
import Head from 'next/head';
import axios from 'axios';
import {
  FormGroup,
  Label,
  Form,
  Input,
  Button,
  Container,
} from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function ProductsForm(props) {
  const router = useRouter();

  const [operationMode, setOperationMode] = useState('Create');
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    images: [],
    category: '',
    marque: '',
    isNew: false,
    type: 'normal',
  });
  const [validated, setValidated] = useState(false);
  const [scrapedProducts, setScrapedProducts] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    console.log(product);
    await submitProduct(product, operationMode);
    if (form.checkValidity() === true) {
      router.push('/admin/Products');
    }
  };
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [imageInputMethod, setImageInputMethod] = useState('upload');

  const handleSelectProduct = (prod, category) => {
    //  setSelectedProduct(prod);
    setProduct({
      name: prod.name,
      price: prod.price,
      quantity: prod.quantity,
      description: prod.description,
      images: prod.image,
      category: category,
      marque: prod.marque,
      isNew: prod.isNew,
      type: prod.type,
    });
    // setSelectedProduct(prod);
    //setImageInputMethod('select');
  };
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search query
  const filteredProducts = Object.entries(scrapedProducts).flatMap(
    ([category, products]) =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).length > 0
        ? [[category, products]]
        : []
  );

  useEffect(() => {
    if (props.product !== undefined) {
      setProduct(props.product);
      setOperationMode('Modify');
    }
    axios
      .get(`${process.env.backurl}/api/admin/products/scrap/products`)
      .then((res) => {
        setScrapedProducts(res.data);
      });
  }, []);
  // const handleImageUpload = (e) => {
  //   const files = e.target.files;
  //   if (!files) {
  //     console.log('No files selected');
  //     return;
  //   }
  //   const newImages = [];
  //   for (let i = 0; i < files.length; i++) {
  //     newImages.push(files[i]);
  //   }
  //   console.log('Selected images:', newImages);
  //   setProduct({ ...product, images: newImages });
  //   setSelectedProduct(null);
  //   setImageInputMethod('upload');
  // };
  // const handleImageInputMethodChange = (value) => {
  //   setImageInputMethod(value);
  //   if (value === 'select') {
  //     console.log('selected product images:', selectedProduct.images);
  //     const file = new File([selectedProduct.images], selectedProduct.name);
  //     console.log('created file:', file);
  //     setProduct({ ...product, images: [file] });
  //   } else {
  //     setProduct({ ...product, images: [] });
  //   }
  // };

  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <Head>
            <title>
              {operationMode === 'Create'
                ? 'Create New Product'
                : 'Modify Product'}
            </title>
          </Head>

          <h1>
            {operationMode === 'Create'
              ? 'Create New Product'
              : 'Modify Product'}
          </h1>

          <form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="ProductName"
                type="text"
                name="name"
                required
                minLength={4}
                maxLength={20}
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files) {
                    console.log('No files selected');
                    return;
                  }
                  const newImages = [];
                  for (let i = 0; i < files.length; i++) {
                    newImages.push(files[i]);
                  }
                  console.log('Selected images:', newImages);
                  setProduct({ ...product, images: newImages });
                }}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Image</Form.Label>
              <ToggleButtonGroup
                type="radio"
                name="image-input-method"
                value={imageInputMethod}
                onChange={handleImageInputMethodChange}
              >
                <ToggleButton value="upload">Upload</ToggleButton>
                <ToggleButton value="select">
                  Select from existing products
                </ToggleButton>
              </ToggleButtonGroup>
              {imageInputMethod === 'upload' && (
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                />
              )}
              {imageInputMethod === 'select'}

              {selectedProduct && imageInputMethod === 'select' && (
                <div>
                  {Array.isArray(product.images) &&
                  product.images.length > 0 ? (
                    <img
                      src={URL.createObjectURL(product.images[0])}
                      alt={selectedProduct.name}
                    />
                  ) : (
                    <img
                      src={selectedProduct.images}
                      alt={selectedProduct.name}
                    />
                  )}
                </div>
              )}
            </Form.Group> */}

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                value={product.marque}
                onChange={(e) =>
                  setProduct({ ...product, marque: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is New"
                checked={product.isNew}
                onChange={(e) =>
                  setProduct({ ...product, isNew: e.target.checked })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={product.type}
                onChange={(e) =>
                  setProduct({ ...product, type: e.target.value })
                }
              >
                <option value="normal">Normal</option>
                <option value="featured">Featured</option>
                <option value="trending">Trending</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit">
              {operationMode === 'Create' ? 'Create' : 'Save'}
            </Button>
          </form>
        </div>

        <div style={{ flex: 1, marginLeft: '20px' }}>
          <Form.Group controlId="searchTerm">
            <Form.Control
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>image link</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(([category, products], index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan={3}>
                      <h3>{category}</h3>
                    </td>
                  </tr>
                  {products
                    .filter((prod) =>
                      prod.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )

                    .map((prod, prodIndex) => (
                      <tr key={prodIndex}>
                        <td>{prodIndex + 1}</td>
                        <td>{prod.name}</td>
                        <td>{prod.image}</td>

                        <td>{prod.description}</td>

                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleSelectProduct(prod, category)}
                          >
                            Select
                          </Button>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}
