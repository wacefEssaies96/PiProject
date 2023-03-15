// import Login from '@/components/UserTemplate/Login';
import PageSpinnerLoading from '@/components/layouts/PageSpinnerLoading';
import { lazy, Suspense } from 'react';
const Login = lazy( () => import('@/components/UserTemplate/Login'));

export default function login() {

  return (
    <Suspense fallback={<PageSpinnerLoading/>}>
      <Login />
    </Suspense>
  )
}

