import Link from "next/link";
import { Container, Table, Button } from "react-bootstrap";
import { useState } from "react";
import { fetchData } from "@/services/mix";


export default function Index({ users }) {

  const [list, setList] = useState(users)
  const [admin, setAdmin] = useState(true)
  const [client, setClient] = useState(false)
  
  const showRoleFilter = (filter) =>{
    setAdmin(false)
    setClient(false)
    if(filter == "admin")
        setAdmin(true)
    if(filter == "client")
        setClient(true)
  }

  return (
    <Container>
      <h1>List of Users</h1>
      <Link className="btn btn-outline-success" href={`/users/admin/create`}>Create new user</Link>
        <hr/>
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
            if((admin && user.role == "ADMIN") || (client && user.role == "USER")){
                return (
                  <tr key={index}>
                    <td key={user.email}>{user.email}</td>
                    <td key={user.role}>{user.role}</td>
                    <td key={user.height}>{user.height}</td>
                    <td key={user.weight}>{user.weight}</td>
                    <td key={user.gender}>{user.gender}</td>
                    <td key={user._id}>
                      <Link className="btn btn-outline-secondary me-3 ms-3" href={`/users/admin/edit/${user._id}`}>Edit</Link>
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