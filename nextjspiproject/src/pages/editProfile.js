import Head from 'next/head'
import Register from '../components/RegisterComponent'
import nextCookie from 'next-cookies'
import { useEffect } from 'react'

export default function EditProfilePage({ user }) {

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
  return {
    props: {
      user: user
    }
  }
}