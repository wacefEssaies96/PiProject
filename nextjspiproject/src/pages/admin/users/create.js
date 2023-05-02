import withAuth from '@/components/Withauth';
import { lazy } from 'react';

const UsersForm = lazy(() => import('@/components/users/UsersForm'));

function Create() {
  return <UsersForm></UsersForm>;
}

export default withAuth(Create);
