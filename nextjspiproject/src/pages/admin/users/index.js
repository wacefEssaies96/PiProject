import Link from "next/link";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { deleteData, fetchData } from "@/services/mix";
import { verifyAccount } from "@/services/user";
import withAuth from "@/components/Withauth";


function Index({ users }) {

  const [list, setList] = useState(users)
  const [allRoles, setAllRoles] = useState(true)
  const [admin, setAdmin] = useState(false)
  const [client, setClient] = useState(false)
  const [doctor, setDoctor] = useState(false)

  const showRoleFilter = (filter) => {
    setAllRoles(false)
    setAdmin(false)
    setClient(false)
    if (filter == "allRoles")
      setAllRoles(true)
    if (filter == "admin")
      setAdmin(true)
    if (filter == "client")
      setClient(true)
    if (filter == "doctor")
      setDoctor(true)
  }

  const approve = async (e) => {
    e.preventDefault()
    await verifyAccount(e.target.email.value, e.target.id.value)
    await refresh()
  }

  const refresh = async () => setList(await fetchData(`${process.env.backurl}/api/users/findAll`))
  const deleteOneUser = async (id) => deleteData(`${process.env.backurl}/api/users/${id}`).then(refresh)

  return (

    <Container>
      <h1>List of Users</h1>
      <Link className="btn btn-outline-success" href={`/admin/users/create`}>Create new user</Link>
      <hr />
      <Button variant="outline-success" onClick={() => showRoleFilter("allRoles")}>
        All
      </Button>
      &nbsp;
      <Button variant="outline-success" onClick={() => showRoleFilter("admin")}>
        admin
      </Button>
      &nbsp;
      <Button variant="outline-success" onClick={() => showRoleFilter("client")}>
        user
      </Button>
      &nbsp;
      <Button variant="outline-success" onClick={() => showRoleFilter("doctor")}>
        doctors
      </Button>
      &nbsp;
      <hr />

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {list.map((user, index) => {
            if ((allRoles) || (admin && user.role == "ADMIN") || (client && user.role == "USER") || (doctor && user.role == "DOCTOR")) {
              return (
                <tr key={index}>
                  <td key={user.image}>
                    <div className="designation-profile-img">
                      {!(user.image)
                        ?
                        <img style={{ height: '10 rem', width: '10 rem' }}
                          src={`${process.env.backurl}/uploads/User/altUser.png`}
                          alt="no img altUser.png"
                        />
                        :
                        <img style={{ height: '10 rem', width: '10 rem' }}
                          src={`${process.env.backurl}/${user.image}`}
                          alt="verifiy img"
                        />
                      }
                    </div>
                  </td>
                  <td key={user.fullname}>{user.fullname}</td>
                  <td key={user.email}>{user.email}</td>
                  <td key={user.role}>{user.role}</td>
                  <td key={user.phone}>{user.phone}</td>
                  <td key={user.gender}>{user.gender}</td>
                  <td key={user._id}>
                    <Link className="btn btn-outline-secondary me-3 ms-3" href={`/admin/users/edit/${user._id}`}>Edit</Link>
                    <Button onClick={() => deleteOneUser(user._id)} variant="outline-danger">Delete</Button>
                    &nbsp;      &nbsp;
                    {user.role == "DOCTOR" &&
                      <Form onSubmit={approve} encType='multipart/form-data'>
                        <input type="hidden" name="id" defaultValue={user._id}></input>
                        <input type="hidden" name="email" defaultValue={user.email}></input>
                        <Button type="submit" disabled={user.account_Verified}>approve</Button>
                      </Form>
                    }
                  </td>
                </tr>
              )
            }
          })}

        </tbody>
      </Table>
    </Container>
  )
}

export async function getServerSideProps() {
  const data = await fetchData(`${process.env.backurl}/api/users/findAll`);
  return {
    props: {
      users: data
    }
  }
}

export default withAuth(Index)