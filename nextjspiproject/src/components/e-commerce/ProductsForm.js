import { useEffect, useState } from 'react';
import { submitProduct } from '@/services/products';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    await submitProduct(product, operationMode);
    if (form.checkValidity() === true) {
      router.push('/admin/Products');
    }
  };

  useEffect(() => {
    if (props.product !== undefined) {
      setProduct(props.product);
      setOperationMode('Modify');
    }
  }, []);
  return (
    <>
      <Container>
        <Head>
          <title>
            {operationMode === 'Create'
              ? 'Create New Product'
              : 'Modify Product'}
          </title>
        </Head>

        <h1>
          {operationMode === 'Create' ? 'Create New Product' : 'Modify Product'}
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
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
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
      </Container>
    </>
  );
}
