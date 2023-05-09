import { Suspense, lazy } from 'react';
import SpinnerLoading from '@/components/layouts/PageSpinnerLoading';
//const ProductsForm = lazy(() => import('@/components/e-commerce/ProductsForm'));
import ProductsForm from '@/components/e-commerce/ProductsForm';
import path from 'path';
import fs from 'fs/promises';
export default function Create({ products }) {
  return (
    <Suspense fallback={<SpinnerLoading />}>
      <ProductsForm products={products} />
    </Suspense>
  );
}

export async function getServerSideProps() {
  try {
    const rootDir = '../ExpressPiProject/';
    const filePath = path.join(rootDir, 'products.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileData);
    return { props: { products } };
  } catch (error) {
    console.error(error);
    return { props: { products: {} } };
  }
}

// export async function getServerSideProps() {
//   const res = await fetch(
//     `${process.env.backurl}/api/admin/products/scrap/products`
//   );
//   const products = await res.json();

//   return {
//     props: { products },
//   };
// }
