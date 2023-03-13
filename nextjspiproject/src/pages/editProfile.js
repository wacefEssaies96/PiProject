import Head from 'next/head'
import Register from '../components/RegisterComponent'
import nextCookie from 'next-cookies'

export default function EditProfilePage(ctx) {

    const {user} = nextCookie(ctx)

  return (
    <div className='container'>
        <Head>
            <title>Edit Profile Form | User</title>
        </Head>
        <Register operation={'Update'} user={user}/>
    </div>
  )
}