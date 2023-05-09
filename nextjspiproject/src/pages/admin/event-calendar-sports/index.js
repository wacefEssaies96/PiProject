import Head from 'next/head'
import { BiPlus, BiEdit, BiTrashAlt } from 'react-icons/bi'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../../../styles/Home.module.css'
import { Table } from 'react-bootstrap'
import CustomModal from '@/components/layouts/CustomModal'
import { toast } from 'react-toastify';
import { deleteEvent } from '@/services/eventCalendarService'
import { fetchSubTypeData } from '@/services/SportSubTypeServices'
import { useRouter } from 'next/router'
import { event } from 'jquery'

export default function EventCalendarSportAdminHomePage({ events }) {

  const [listEvents, setListEvents] = useState(events)
  const [id, setId] = useState(null)
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [users, setUsers] = useState([])
  const router = useRouter();

  const getAllUsers = async () => {
    const res = await fetch(`${process.env.backurl}/api/users/findAll`)
    const data = await res.json()
    return data
  }

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        let table = []
        let table2 = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].SportEvents.length > 0) {
            for (let j = 0; j < listEvents.length; j++) {
              for (let k = 0; k < data[i].SportEvents.length; k++) {
                if (data[i].SportEvents[k]._id === listEvents[j]._id) {
                  if (!table2.includes(data[i])) {
                    table2.push(data[i])
                  }
                }
              }
            }
          }
        }
        let index = 0
        while (index < table2.length) {
          if (!table.includes(table2[index])) {
            table.push(table2[index])
            index += 1
          }
        }
        setUsers(table)
      })

  }, [])

  const searchSummary = async (id) => {
    return await events.find((x) => x._id === id).summary
  }

  const showDeleteModal = async (id) => {
    setId(id)
    setDeleteMessage(`Are you sure you want to delete the event : '${await searchSummary(id)}'?`)
    setDisplayConfirmationModal(true)
  }

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }

  const submitDelete = async (id) => {
    await deleteEvent(id)
    const listAfterDelete = await fetch(`${process.env.backurl}/api/eventCalendarSport/getAllEvents`)
    toast.success(`The event '${events.find((x) => x._id === id).summary}' was deleted successfully!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    const resList = await listAfterDelete.json()
    setListEvents(resList)
    setDisplayConfirmationModal(false)
  }

  return (
    <div className='container'>
      <Head>
        <title>Event List | AdminHomePage</title>
        <meta name='keywords' content='Sports' />
      </Head>
      <h1 className={styles.title}>Events Admin Home Page</h1>

      <div className="container mx-auto">
        {/* <Link href="/admin/event-calendar-sports/create" className="btn btn-outline-success">
          Add an Event <BiPlus></BiPlus>
        </Link><br /><br /> */}

        <Table striped bordered hover size="sm">
          <thead>
            <tr className='text-center'>
              <th><span>Summary</span></th>
              <th><span>description</span></th>
              <th><span>Start Date Time</span></th>
              <th><span>Start Time Zone</span></th>
              <th><span>End Date Time</span></th>
              <th><span>End Time Zone</span></th>
              <th><span>User Email</span></th>
              {/* <th><span>Actions</span></th> */}
            </tr>
          </thead>
          <tbody>
            {listEvents.length > 0 && listEvents.map(event => {
              let i = 0
              return (
                <tr>
                  <td style={{ textAlign: "center" }} key={event.summary}>{event.summary}</td>
                  <td key={event.description}>{event.description}</td>
                  <td key={event.start.dateTime}>{event.start.dateTime}</td>
                  <td key={event.start.timeZone}>{event.start.timeZone}</td>
                  <td key={event.end.dateTime}>{event.end.dateTime}</td>
                  <td key={event.end.timeZone}>{event.end.timeZone}</td>
                  {users.length > 0 && <td key={i}>{users[i].email}</td>}
                  {/* <td style={{ textAlign: "center" }} key={event._id} className='px-16 py-2 flex justify-content-center'>
                    <Link href={`/admin/event-calendar-sports/edit/${event._id}`} onClick={() => {
                      router.push({
                        pathname: `/admin/event-calendar-sports/edit/${event._id}`,
                        query: { userEmail: users[i].email },
                      });
                    }}>
                      <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                    </Link>
                    <button className="btn" type="button" onClick={() => showDeleteModal(event._id)}>
                      <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                    </button>
                  </td> */}
                </tr>
              )
              i++
            })}
          </tbody>
        </Table>
        <CustomModal showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await fetchSubTypeData(`${process.env.backurl}/api/eventCalendarSport/getAllEvents`)

  return {
    props: { events: data }
  }
}