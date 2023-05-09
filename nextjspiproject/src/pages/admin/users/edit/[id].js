import withAuth from '@/components/Withauth';
import nextCookie from 'next-cookies'
import NotFound from '@/pages/404';
import { fetchData } from '@/services/mix';
import { useRouter } from 'next/router';
import { Suspense, lazy } from 'react';

const UsersForm = lazy(() => import('@/components/users/UsersForm'));

function EditUser({ cu , u }) {
  const router = useRouter();
  
  if(cu !== null && u !== null 
    // && cu.role == "ADMIN" 
    ){
      return (
          <Suspense>
            <UsersForm user={u} operationMode={"Modify User"}></UsersForm>
          </Suspense>
      );
  }
  else{
    return (
        <NotFound/>
    );
  }
}

export async function getServerSideProps(context) {
  const { user } = nextCookie(context)

  if(
    user 
    && 
    context.query.id
    ){

    const idu = user._id
    const res = await fetch(`${process.env.backurl}/api/users/findOne/${idu}`)
    const cu = await res.json()

    const data = await fetchData(
      `${process.env.backurl}/api/users/findOne/${context.query.id}`
    );
    return {
      props: {
        cu:cu,
        u: data,
      },
    };

  }
  return {
    props: {
      cu:null,
      u: null,
    },
  };
}

export default withAuth(EditUser);
