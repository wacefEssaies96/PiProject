import { fetchData } from '@/services/mix';
import { Suspense, lazy } from 'react';

const ProductsForm = lazy(() => import('@/components/e-commerce/ProductsForm'));

export default function EditMeal({ editproduct }) {
  return (
    <Suspense>
      <ProductsForm editproduct={editproduct}></ProductsForm>
    </Suspense>
  );
}

export async function getServerSideProps(context) {
  const data = await fetchData(
    `${process.env.backurl}/api/admin/products/find/${context.query.id}`
  );
  return {
    props: {
      editproduct: data,
    },
  };
}
