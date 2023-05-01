import Head from 'next/head'
import { useState } from 'react'
import { fetchSubTypeData } from '@/services/SportSubTypeServices'
import styles from '../../../styles/Home.module.css'
import { Table } from 'react-bootstrap'

export default function RatesAdminHomePage({ rates }) {

    const [listRates, setListRates] = useState(rates)

    return (
        <div className='container'>
            <Head>
                <title>Sport Rates List | AdminHomePage</title>
                <meta name='keywords' content='Sports' />
            </Head>
            <h1 className={styles.title}>Sport Rates Admin Home Page</h1>

            <div className="container mx-auto">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr className='text-center'>
                            <th><span>Sport SubType Title</span></th>
                            <th><span>User Email</span></th>
                            <th><span>Rate</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.length > 0 && rates.map(rate => {
                            return (
                                <tr>
                                    <td style={{ textAlign: "center" }} key={rate.sportSubType.title}>{rate.sportSubType.title}</td>
                                    <td style={{ textAlign: "center" }} key={rate.user.email}>{rate.user.email}</td>
                                    <td style={{ textAlign: "center" }} key={rate.rating}>{rate.rating}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const data = await fetchSubTypeData(`${process.env.backurl}/api/sportsRating/getAllRatings`)

    return {
        props: { rates: data }
    }
}