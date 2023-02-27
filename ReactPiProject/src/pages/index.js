import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {BiPlus} from 'react-icons/bi'
import SportTypesTable from 'SportsSharedComponents/SportsTypesTable'
import SportTypesForm from 'SportsSharedComponents/SportTypesForm'

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Sport Types List | Home</title>
        <meta name='keywords' content='Sports'/>
      </Head>
      <h1 className={styles.title}>Sports Home Page</h1>
      <Link href="/SportTypes/addNewSportType" legacyBehavior>
        <button type="button" className="btn btn-outline-success">
          Add Sport Type <BiPlus></BiPlus>
          </button>
      </Link>

      <div className="container mx-auto py-5">
        <SportTypesForm></SportTypesForm>
      </div>

      <div className="container mx-auto">
        <SportTypesTable></SportTypesTable>
      </div>
    </div>
  )
}
