import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { BiPlus,BiEdit, BiTrashAlt } from 'react-icons/bi'
import { useState } from 'react'
import AddSportTypesForm from 'SportsSharedComponents/AddSportType'
import UpdateSportTypesForm from 'SportsSharedComponents/UpdateSportType'
import Link from 'next/link'

export default function SportTypesAdminHomePage({sportTypes}) {

  const [visible, setVisible] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  // const [sportList, setSportList] = useState(sportTypes)

  const handler = ()=>{
    setVisible(visible ? false: true)
  }

  function updateSportTypeForm() {
    setUpdateForm(updateForm ? false : true)
  }

  const deleteSportType = async sportTypeId => {
    const res = await fetch(`${process.env.backurl}/api/sportTypes/${sportTypeId}`, {
      method : 'DELETE'
    })
    const data = await res.json()

    const l = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
    setSportList(l)

    console.log(data)
  }

  return (
    <div className='container'>
      <Head>
        <title>Sport Types List | SportTypesAdminHomePage</title>
        <meta name='keywords' content='Sports' />
      </Head>
      <h1 className={styles.title}>Sport Types Admin Home Page</h1>

      {!updateForm ? <button onClick={handler} type="button" className="btn btn-outline-success">
        Add Sport Type <BiPlus></BiPlus>
      </button> : <></> }

      <div className="container mx-auto py-5">
        {visible ? <AddSportTypesForm/>: <></>}
        {updateForm ? <UpdateSportTypesForm/>: <></>}
      </div>

      <div className="container mx-auto">
        <table className="table table-hover table-bordered border-sucess">
          <thead>
            <tr className='text-center'>
              <th><span>Title</span></th>
              <th><span>Sub Types</span></th>
              <th><span>Slug</span></th>
              <th><span>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {sportTypes.map(sportType=> {
              return (
                <tr>
                <td key={sportType.title}>{sportType.title}</td>
                <td key={sportType.title}>
                {sportType.sportSubType.map(sportSubType=>{
                  return (
                    <p>{sportSubType.title}</p>
                  )
                })}
                </td>
                <td key={sportType.slug}>{sportType.slug}</td>
                <td key={sportType._id} className='px-16 py-2 flex justify-content-center'>
                  <button className="btn" onClick={updateSportTypeForm} type="button">
                    <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                  </button>
                  {/* <Link className="btn" href={`/Back-Office/UpdateSportType/${sportType._id}`}> */}
                  <button className="btn" onClick={() => deleteSportType(sportType._id)} type="button">
                    <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                  </button>
                  {/* </Link> */}
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
  const res = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
  const data = await res.json()

  return {
    props : {sportTypes : data}
  }
}