import Link from 'next/link';
import { Container, Table, Button } from 'react-bootstrap';
import { useState } from 'react';
import { deleteData, fetchData } from '@/services/mix';

export default function Index({ products }) {
  const [list, setList] = useState(products);

  const refresh = async () =>
    setList(await fetchData(`${process.env.backurl}/api/admin/products`));

  const deleteOneProduct = async (id) =>
    deleteData(`${process.env.backurl}/api/admin/products/${id}`).then(refresh);

  return (
    <Container>
      <h1>List of Products</h1>
      <Link className="btn btn-outline-success" href={`/admin/Products/create`}>
        Create new product
      </Link>
      <hr />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
            <th>Marque</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((product, index) => {
            return (
              <tr key={index}>
                <td key={product.name}>{product.name}</td>
                <td key={product.price}>{product.price}</td>
                <td key={product.quantity}>{product.quantity}</td>
                <td key={product.description}>{product.description}</td>
                <td key={product.category}>{product.category}</td>
                <td key={product.marque}>{product.marque}</td>
                <td key={product.type}>{product.type}</td>
                <td key={product.image}>
                  {product.images.length > 0 && (
                    <img
                      style={{ height: '3rem', width: '3rem' }}
                      src={`${process.env.backurl}/${product.images}`}
                      alt="verify img"
                    />
                  )}
                </td>
                <td key={product._id}>
                  <Link
                    className="btn btn-outline-secondary me-3 ms-3"
                    href={`/admin/Products/edit/${product._id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => deleteOneProduct(product._id)}
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export async function getServerSideProps() {
  const data = await fetchData(`${process.env.backurl}/api/admin/products`);
  return {
    props: {
      products: data,
    },
  };
}
