import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { BiPlus,BiEdit, BiTrashAlt } from 'react-icons/bi'
import Link from 'next/link'
import { deleteSportSubType, fetchSubTypeData } from 'SportsSharedComponents/SportServices/SportSubTypeServices'
import { useEffect, useState } from 'react'
import Success from 'SportsSharedComponents/SuccessMsg'

export default function SportSubTypesAdminHomePage({sportSubTypes}) {

  const [listSportSubTypes, setListSportSubTypes] = useState(sportSubTypes)
  const [showAlert, setShowAlert] = useState(false)

  const deleteSubType = async (sportSubTypeId) => {
    deleteSportSubType(sportSubTypeId)
    const l = await fetchSubTypeData(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
    setListSportSubTypes(l)
    if (!showAlert) {
      setShowAlert(true)
    }
  }

  useEffect(()=> {
    setTimeout(() => {
        setShowAlert(false)
        }, 2000);
  }, [showAlert])

  return (
    <div className='container'>
      <Head>
        <title>Sport SubTypes List | AdminHomePage</title>
        <meta name='keywords' content='Sports' />
      </Head>
      <h1 className={styles.title}>Sport SubTypes Admin Home Page</h1>

      <div className="container mx-auto">
        <Link href="/Back-Office-SubType/SubTypeFormPage" className="btn btn-outline-success">
          Add Sport SubType <BiPlus></BiPlus>
        </Link><br/><br/>
        <table className="table table-hover table-bordered border-sucess">
          <thead>
            <tr className='text-center'>
              <th><span>Title</span></th>
              <th><span>DemoVideo</span></th>
              <th><span>Advantages</span></th>
              <th><span>Limits</span></th>
              <th><span>Slug</span></th>
              <th><span>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {listSportSubTypes.map(subType=> {
              return (
                <tr>
                <td key={subType.title}>{subType.title}</td>
                <td key={subType.demoVideo}>{subType.demoVideo}</td>
                <td key={subType.advantages}>{subType.advantages}</td>
                <td key={subType.limits}>{subType.limits}</td>
                <td key={subType.slug}>{subType.slug}</td>
                <td key={subType._id} className='px-16 py-2 flex justify-content-center'>
                  <Link href={`/Back-Office-SubType/UpdateSportSubType/${subType._id}`}>
                    <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                  </Link>
                  <button className="btn" type="button" onClick={() => deleteSubType(subType._id)}>
                    <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                  </button>
                </td>
            </tr>
              )
            })}
          </tbody>
        </table>
        {showAlert && (<Success message={"Sport SubType Deleted Successfully !"}></Success>)}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await fetchSubTypeData(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)

  return {
    props : {sportSubTypes : data}
  }
}