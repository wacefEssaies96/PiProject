import Head from 'next/head'
import { BiPlus, BiEdit, BiTrashAlt } from 'react-icons/bi'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// import Success from '@/components/layouts/SuccessMsg'
import { fetchSubTypeData } from '@/services/SportSubTypeServices'
import styles from '../../../styles/Home.module.css'
import { Alert, Table } from 'react-bootstrap'
import CustomModal from '@/components/layouts/CustomModal'

export default function SportSubTypesAdminHomePage({ sportSubTypes }) {

  const [listSportSubTypes, setListSportSubTypes] = useState(sportSubTypes)
  const [showAlert, setShowAlert] = useState(false)
  const [id, setId] = useState(null)
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [sportSubTypeMessage, setSportSubTypeMessage] = useState(null)

  const showDeleteModal = async (id) => {
    setId(id)
    setDeleteMessage(`Are you sure you want to delete the sport subtype : '${await searchTitle(id)}'?`)
    setDisplayConfirmationModal(true)
  }

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }

  const searchTitle = async (id) => {
    return await sportSubTypes.find((x) => x._id === id).title
  }

  const submitDelete = async (id) => {
    setSportSubTypeMessage(`The sport subtype '${await searchTitle(id)}' was deleted successfully.`)
    setListSportSubTypes(sportSubTypes.filter((x) => x._id !== id))
    setDisplayConfirmationModal(false)
  }

  // const deleteSubType = async (sportSubTypeId) => {
  //   deleteSportSubType(sportSubTypeId)
  //   const l = await fetchSubTypeData(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
  //   setListSportSubTypes(l)
  //   if (!showAlert) {
  //     setShowAlert(true)
  //   }
  // }

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false)
    }, 2000);
  }, [showAlert])

  const searchTitleDynamic = async (title) => {
    return await sportSubTypes.filter((x) => {
      let t = x.title.includes(title)
      if(t) {
        return x
      }
    })
  }

  const newList = async (e) => {
    return await searchTitleDynamic(e.target.value)
  }

  const handleChange = async (e) => {
    console.log(await newList(e))
    setListSportSubTypes(await newList(e))
  }

  return (
    <div className='container'>
      <Head>
        <title>Sport SubTypes List | AdminHomePage</title>
        <meta name='keywords' content='Sports' />
      </Head>
      <h1 className={styles.title}>Sport SubTypes Admin Home Page</h1>

      <div className="container mx-auto">
        <Link href="/admin/sport-sub-type/create" className="btn btn-outline-success">
          Add Sport SubType <BiPlus></BiPlus>
        </Link><br /><br />

        <form className="d-flex float-end" role="search">
          <input onChange={handleChange} className="form-control mx-5" style={{ width: "280px" }} type="search" placeholder="Search for sport subtype by Title" aria-label="Search" />
        </form><br /><br />

        {sportSubTypeMessage && <Alert variant="success">{sportSubTypeMessage}</Alert>}
        <Table striped bordered hover size="sm">
          <thead>
            <tr className='text-center'>
              <th><span>Title</span></th>
              <th><span>DemoVideo</span></th>
              <th><span>Advantages</span></th>
              <th><span>Limits</span></th>
              <th><span>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {listSportSubTypes.length>0 && listSportSubTypes.map(subType => {
              return (
                <tr>
                  <td key={subType.title}>{subType.title}</td>
                  <td key={subType.demoVideo}>{subType.demoVideo}</td>
                  <td key={subType.advantages}>{subType.advantages}</td>
                  <td key={subType.limits}>{subType.limits}</td>
                  <td key={subType._id} className='px-16 py-2 flex justify-content-center'>
                    <Link href={`/admin/sport-sub-type/edit/${subType._id}`}>
                      <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                    </Link>
                    {/* onClick={() => deleteSubType(subType._id)} */}
                    <button className="btn" type="button" onClick={() => showDeleteModal(subType._id)}>
                      <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {/* {showAlert && (<Success message={"Sport SubType Deleted Successfully !"}></Success>)} */}
        <CustomModal showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await fetchSubTypeData(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)

  return {
    props: { sportSubTypes: data }
  }
}