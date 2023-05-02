import Head from 'next/head'
import { useState } from 'react'
import { fetchSubTypeData } from '@/services/SportSubTypeServices'
import styles from '../../../styles/Home.module.css'
import { Table } from 'react-bootstrap'

export default function RatesAdminHomePage({ progresses }) {

    const [listProgresses, setListProgresses] = useState(progresses)

    return (
        <div className='container'>
            <Head>
                <title>Sport Progresses List | AdminHomePage</title>
                <meta name='keywords' content='Sports' />
            </Head>
            <h1 className={styles.title}>Sport Progresses Admin Home Page</h1>

            <div className="container mx-auto">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr className='text-center'>
                            <th><span>Youtube Video Id</span></th>
                            <th><span>User Email</span></th>
                            <th><span>Progress</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {progresses.length > 0 && progresses.map(progress => {
                            return (
                                <tr>
                                    <td style={{ textAlign: "center" }} key={progress.video}>{progress.video}</td>
                                    <td style={{ textAlign: "center" }} key={progress.user.email}>{progress.user.email}</td>
                                    <td style={{ textAlign: "center" }} key={progress.progress}>{progress.progress}</td>
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
    const data = await fetchSubTypeData(`${process.env.backurl}/api/sportsProgress/getAllProgresses`)

    return {
        props: { progresses: data }
    }
}