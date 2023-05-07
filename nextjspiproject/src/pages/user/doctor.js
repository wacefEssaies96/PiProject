import withAuth from '@/components/Withauth';
import { fetchData } from '@/services/mix';
import { Suspense, lazy } from 'react';
import nextCookie from 'next-cookies'


const UsersForm = lazy(() => import('@/components/users/UsersForm'));

function Doctor({ user }) {
  return (
    <Suspense>
      <UsersForm user={user} operationMode={"Profile Doctor"}></UsersForm>
    </Suspense>
  );
}

export async function getServerSideProps(ctx) {
  const { user } = nextCookie(ctx)
  if (user) {
    const id = user._id
    const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
    const u = await res.json()
    return {
      props: {
        user: u
      }
    }
  }
  return {
    props: {
      user: {
        id:"",
        image: "",
        fullname: "",
        email: "",
        role: "",
        phone: "",
        dateOfBirth: "",
        height: "",
        weight: "",
        gender: "",
        address: "",
        disease: "",
        speciality: "",
      }
    },
  };
}

export default withAuth(Doctor);
