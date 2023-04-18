import { Suspense, lazy } from 'react';
import SpinnerLoading from '@/components/layouts/PageSpinnerLoading';
//const ProductsForm = lazy(() => import('@/components/e-commerce/ProductsForm'));
import ProductsForm from '@/components/e-commerce/ProductsForm';

export default function Create() {
  return (
    <Suspense fallback={<SpinnerLoading />}>
      <ProductsForm></ProductsForm>
    </Suspense>
  );
}
