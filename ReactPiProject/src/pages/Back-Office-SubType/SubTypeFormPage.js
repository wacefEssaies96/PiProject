import Head from 'next/head'
import SportSubTypesForm from '@/SubTypes/SubTypeForm'

export default function SportSubTypesAdminHomePage({sportSubTypes}) {

  return (
    <div className='container'>
        <Head>
            <title>Sport SubTypes Form | Admin Page</title>
            <meta name='keywords' content='Sports' />
        </Head>
        <SportSubTypesForm/>
    </div>
  )
}