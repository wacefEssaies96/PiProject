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

export default function EventCalendarSportAdminHomePage({ events }) {

  const [listEvents, setListEvents] = useState(events)
  const [users, setUsers] = useState([])

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

  return (
    <div className='container'>
      <Head>
        <title>Event List | AdminHomePage</title>
        <meta name='keywords' content='Sports' />
      </Head>
      <h1 className={styles.title}>Events Admin Home Page</h1>

      <div className="container mx-auto">
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
                </tr>
              )
              i++
            })}
          </tbody>
        </Table>
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