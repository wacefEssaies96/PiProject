import Link from "next/link";
import { Container, Table, Button } from "react-bootstrap";
import { useState } from "react";
import { deleteData,fetchData } from "@/services/mix";


export default function Index({ users }) {

  const [list, setList] = useState(users)
  const [allRoles, setAllRoles] = useState(true)
  const [admin, setAdmin] = useState(false)
  const [client, setClient] = useState(false)
  
  const showRoleFilter = (filter) =>{
    setAllRoles(false)
    setAdmin(false)
    setClient(false)
    if(filter == "allRoles")
      setAllRoles(true)
    if(filter == "admin")
        setAdmin(true)
    if(filter == "client")
        setClient(true)
  }

  const refresh = async () => setList(await fetchData(`${process.env.backurl}/api/users/findAll`))
  const deleteOneUser = async (id) => deleteData(`${process.env.backurl}/api/users/${id}`).then(refresh)

  return (
    <Container>
      <h1>List of Users</h1>
      <Link className="btn btn-outline-success" href={`/users/admin/create`}>Create new user</Link>
        <hr/>
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
      <hr/>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {list.map((user, index) => {
            if((allRoles) || (admin && user.role == "ADMIN") || (client && user.role == "USER")){
                return (
                  <tr key={index}>
                    <td key={user.email}>{user.email}</td>
                    <td key={user.role}>{user.role}</td>
                    <td key={user.height}>{user.height}</td>
                    <td key={user.weight}>{user.weight}</td>
                    <td key={user.gender}>{user.gender}</td>
                    <td key={user._id}>
                      <Link className="btn btn-outline-secondary me-3 ms-3" href={`/users/admin/edit/${user._id}`}>Edit</Link>
                      <Button onClick={() => deleteOneUser(user._id)} variant="outline-danger">Delete</Button>
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