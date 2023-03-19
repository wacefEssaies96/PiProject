import Head from 'next/head'
import Register from '@/components/users/RegisterForm'
import nextCookie from 'next-cookies'
import withAuth from '@/components/Withauth'

function EditProfilePage({ user }) {
  return (
    <div className='container'>
      <Head>
        <title>Edit Profile Form | User</title>
      </Head>
      <Register operation={'Update'} user={user} />
    </div>
  )
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
        _id: '',
        fullname: "",
        email: "",
        role: "",
        gender: "",
        phone: 0,
        address: "",
        speciality: "",
      }
    }
  }
}

export default withAuth(EditProfilePage)