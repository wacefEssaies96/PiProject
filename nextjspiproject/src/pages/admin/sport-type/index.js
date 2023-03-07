import styles from '../../../styles/Home.module.css'
import Head from 'next/head'
import { BiPlus, BiEdit, BiTrashAlt } from 'react-icons/bi'
import Link from 'next/link'
import { getSporTypes } from '@/services/SportTypeService'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import DeleteConfirmation from '@/components/layouts/DeleteConfirmation'

export default function SportTypesAdminHomePage({ sportTypes }) {

  const [list, setList] = useState(sportTypes)
  const [title, setTitle] = useState('')
  const [id, setId] = useState(null)
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

  const submitDelete = (id) => {
    setSportTypeMessage(`The sport type '${sportTypes.find((x) => x._id === id).title}' was deleted successfully.`);
    setList(sportTypes.filter((x) => x._id !== id));
    setDisplayConfirmationModal(false);
  };

  const handleChange = async (e) => {
      setTitle(e.target.value)
      if (title.length > 0) {
          const result = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${title}`)
          // .then((res)=>{return res.json()})
          // .then((res) => {
          //   console.log(res)
          //   for (var i = 0; i < res.length; i++) {
          //     list.push(res.data[i])
          //   }
          //   setList(list)
          // })

          const data = [await result.json()]
          list.splice()
          const newList = []
          for (var i = 0; i < data.length; i++) {
              await newList.push(data[i])
            }
          await  setList(newList)
          // return data
      }
  }

  const handleClick = async e => {
      e.preventDefault()
      // console.log(list)
      // const res = await handleChange(e)
      // const listSearched = list.filter(s=>s in res)
      // setList(listSearched)
      // console.log(list)
  }

  return (
    <div>
      <Head>
        <title>Sport Types List | SportTypesAdminHomePage</title>
        <meta name='keywords' content='Sports' />
      </Head>
      <h1 className={styles.title}>Sport Types Admin Home Page</h1>

      <Link href={"/admin/sport-type/create"} className="btn btn-outline-success">
        Add Sport Type <BiPlus></BiPlus>
      </Link>

      <form className="d-flex float-end" role="search">
        <input onChange={handleChange} value={title} className="form-control mx-5" style={{ width: "250px" }} type="search" placeholder="Search for sport type by Title" aria-label="Search" />
        <button type='button' className='btn btn-warning' onClick={handleClick}>Search</button>
      </form><br /><br />

      <div className="container mx-auto">
      {sportTypeMessage && <Alert variant="success">{sportTypeMessage}</Alert>}
        <Table striped bordered hover size="sm">
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
                    <button className="btn" onClick={() => showDeleteModal(sportType._id)} type="button">
                      <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                    </button>
                  </td>
                </tr>
              )})}
          </tbody>
        </Table>
      </div>
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
    </div>
  )
}

export async function getServerSideProps() {
  const data = await getSporTypes()

  return {
    props: { sportTypes: data }
  }
}