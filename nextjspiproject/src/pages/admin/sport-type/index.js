import styles from '../../../styles/Home.module.css'
import Head from 'next/head'
import { BiPlus, BiEdit, BiTrashAlt } from 'react-icons/bi'
import Link from 'next/link'
import { deleteSportType, getSporTypes } from '@/services/SportTypeService'
import { useState } from 'react'

export default function SportTypesAdminHomePage({ sportTypes }) {

  const [list, setList] = useState(sportTypes)

  const getList = async (id) => {
    await deleteSportType(id)
    setList(await getSporTypes())
  }

  return (
    <div className='container'>
      <Head>
        <title>Sport Types List | SportTypesAdminHomePage</title>
        <meta name='keywords' content='Sports' />
      </Head>
      <h1 className={styles.title}>Sport Types Admin Home Page</h1>

      <Link href={"/admin/sport-type/create"} className="btn btn-outline-success">
        Add Sport Type <BiPlus></BiPlus>
      </Link>

      <div className="container mx-auto">
        <table className="table table-hover table-bordered border-sucess">
          <thead>
            <tr className='text-center'>
              <th><span>Title</span></th>
              <th><span>Sub Types</span></th>
              <th><span>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {list.map((sportType, index) => {
              return (
                <tr key={sportType._id}>
                  <td key={sportType.title}>{sportType.title}</td>
                  <td key={index}>
                    {sportType.sportSubType.map((sportSubType, i) => {
                      return (
                        <p key={i}>{sportSubType.title}</p>
                      )
                    })}
                  </td>
                  <td key={sportType._id} className='px-16 py-2 flex justify-content-center'>
                    <Link href={`/admin/sport-type/edit/${sportType._id}`}>
                      <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                    </Link>
                    <button className="btn" onClick={() => getList(sportType._id)} type="button">
                      <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  // const res = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
  const data = await getSporTypes()

  return {
    props: { sportTypes: data }
  }
}