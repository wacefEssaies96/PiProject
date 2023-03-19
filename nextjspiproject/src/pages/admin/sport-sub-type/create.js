import SportSubTypesForm from '@/components/sub-sport-types/SubTypeForm'
import Head from 'next/head'

export default function SportSubTypesAdminHomePage() {

  return (
    <div className='container'>
        <Head>
            <title>Sport SubTypes Form | Admin Page</title>
            <meta name='keywords' content='Sports' />
        </Head>
        <SportSubTypesForm operation={'Add'}/>
    </div>
  )
}