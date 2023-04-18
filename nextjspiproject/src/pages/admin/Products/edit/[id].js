import { fetchData } from '@/services/mix';
import { Suspense, lazy } from 'react';

const ProductsForm = lazy(() => import('@/components/e-commerce/ProductsForm'));

export default function EditMeal({ product }) {
  return (
    <Suspense>
      <ProductsForm product={product}></ProductsForm>
    </Suspense>
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
