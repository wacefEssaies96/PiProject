import styles from '../../../styles/Home.module.css'
import Head from 'next/head'
import { BiPlus, BiEdit, BiTrashAlt } from 'react-icons/bi'
import Link from 'next/link'
import { getSporTypes } from '@/services/SportTypeService'
import { useEffect, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import CustomModal from '@/components/layouts/CustomModal'
import { deleteSportType } from '@/services/SportTypeService'

export default function SportTypesAdminHomePage({ sportTypes }) {

  const [list, setList] = useState(sportTypes)
  const [id, setId] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [sportTypeMessage, setSportTypeMessage] = useState(null)

  const showDeleteModal = (id) => {
    setId(id)
    setDeleteMessage(`Are you sure you want to delete the sport type : '${sportTypes.find((x) => x._id === id).title}'?`)
    setDisplayConfirmationModal(true)
  }

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }

  const submitDelete = async (id) => {
    await deleteSportType(id)
    const listAfterDelete = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
    setSportTypeMessage(`The sport type '${sportTypes.find((x) => x._id === id).title}' was deleted successfully.`)
    const resList = await listAfterDelete.json()
    setList(resList)
    setDisplayConfirmationModal(false)
    setShowAlert(true)
  }

  const searchTitleDynamic = async (title) => {
    return await sportTypes.filter((x) => {
      let t = x.title.toLowerCase().includes(title.toLowerCase())
      if (t) {
        return x
      }
    })
  }

  const newList = async (e) => {
    return await searchTitleDynamic(e.target.value)
  }

  const handleChange = async (e) => {
    setList(await newList(e))
  }

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false)
    }, 3000);
  }, [showAlert])

  return (
    <div>
      <Head>
        <title>Sport Types List | SportTypesAdminHomePage</title>
        <meta name='keywords' content='Sports' />
      </Head>
      <h1 className={styles.title}>Sport Types Admin Home Page</h1>

      <div className="container mx-auto">
        <Link href={"/admin/sport-type/create"} className="btn btn-outline-success">
          Add Sport Type <BiPlus></BiPlus>
        </Link><br /><br />

        <form className="d-flex float-end" role="search">
          <input onChange={handleChange} type="search" className="form-control mx-5" style={{ width: "250px" }} placeholder="Search for sport type by Title" aria-label="Search" />
        </form><br /><br />

        {showAlert && <Alert variant="success">{sportTypeMessage}</Alert>}
        <Table striped bordered hover size="sm">
          <thead>
            <tr className='text-center'>
              <th><span>Title</span></th>
              <th width="50%"><span>Advantages</span></th>
              <th><span>Sub Types</span></th>
              <th><span>Actions</span></th>
            </tr>
          </thead>
          {list && <tbody>
            {list.map((sportType, index) => {
              const arr1 = sportType.advantages.slice(0, sportType.advantages.length / 2)
              const arr2 = sportType.advantages.slice(sportType.advantages.length / 2)
              return (
                <tr key={sportType._id}>
                  <td style={{textAlign: "center"}} key={sportType.title}>{sportType.title}</td>
                  <td key={sportType.advantages}>{sportType.advantages &&
                    arr1.map((a, i) =>
                      <div key={i}>
                        <h5>{arr1[i]}</h5>
                        <p>{arr2[i]}</p>
                      </div>
                    )}
                  </td>
                  <td key={index}>
                    {sportType.sportSubType && sportType.sportSubType.map((sub, i) => {
                      return (
                        sub && <p key={i}>{sub.title}</p>
                      )
                    })}
                  </td>
                  <td style={{textAlign: "center"}} key={sportType._id} className='px-16 py-2 flex justify-content-center'>
                    <Link href={`/admin/sport-type/edit/${sportType._id}`}>
                      <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                    </Link>
                    <button className="btn" onClick={() => showDeleteModal(sportType._id)} type="button">
                      <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>}
        </Table>
      </div>
      <CustomModal showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
    </div>
  )
}

export async function getServerSideProps() {
  const data = await getSporTypes()

  return {
    props: { sportTypes: data }
  }
}