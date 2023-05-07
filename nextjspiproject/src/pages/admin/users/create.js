import withAuth from '@/components/Withauth';
import { Suspense,lazy } from 'react';

const UsersForm = lazy(() => import('@/components/users/UsersForm'));

function Create() {
  return (
    <Suspense>
      <UsersForm operationMode={"Create User"}></UsersForm>
    </Suspense>
  );
}

export default withAuth(Create);
