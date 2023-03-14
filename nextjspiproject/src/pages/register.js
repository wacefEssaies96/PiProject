import Head from 'next/head'
import Register from '../components/registerComponent'

function RegistrationPage() {
  return (
    <div className='container'>
        <Head>
            <title>Register Form | User</title>
        </Head>
        <Register operation={'Add'}/>
    </div>
  )
}
export default RegistrationPage;
