import Head from 'next/head'
import Register from '@/components/users/RegisterForm'
import nextCookie from 'next-cookies'
import withAuth from '@/components/Withauth'
import UsersForm from '@/components/users/UsersForm';



function EditProfilePage({ user }) {
  return (
    
      <UsersForm user={user} operationMode={"Profile User"}></UsersForm>
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

export default withAuth(EditProfilePage)