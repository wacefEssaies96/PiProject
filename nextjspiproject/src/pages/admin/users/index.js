import Link from "next/link";
import { Container, Table, Button, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { deleteData, fetchData } from "@/services/mix";
import { verifyAccount } from "@/services/user";
import withAuth from "@/components/Withauth";

function Index({ users }) {

  const [list, setList] = useState(users)
  const [filteredUser, setFilteredUser] = useState();
  const [showfilteredUser, setShowfilteredUser] = useState(false);
  const [typefilterUser, setTypefilterUser] = useState();
  const [search, setSearch] = useState("");

  const filterListUser = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearch(searchQuery)
    let filterColumn ="fullname";
    if(typefilterUser!=undefined){
      filterColumn =typefilterUser;
    }
    
    const filteredUserList = list.filter((item) =>
      item[filterColumn] && item[filterColumn].toString().toLowerCase().includes(searchQuery)
    );
    if(searchQuery!=""){
      setFilteredUser(filteredUserList);
      setShowfilteredUser(true)
    }else{
      setShowfilteredUser(false)
    }
  }

  const approve = async (e) => {
    e.preventDefault()
    await verifyAccount(e.target.email.value, e.target.id.value)
    await refresh()
  }

  const deleteOneUser = async (id) => confirmDelete(`${process.env.backurl}/api/users/${id}`,users).then(refresh)

  const renderUser = (user, index) =>{
    
    return (

      <tr key={index}>
      <td key={user.image}>
        <div className="designation-profile-img">
          
          { 
          user.image == undefined 
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
        <Row>
          <div className=" col-12 col-lg-3">
            <Link className="btn btn-outline-secondary me-3 ms-3" href={`/admin/users/edit/${user._id}`}>Edit</Link>
          </div>
          <div className=" col-12 col-lg-3">
          <Button onClick={() => deleteOneUser(user._id)}  variant="outline-danger">Delete</Button>
          </div>
          <div className=" col-12 col-lg-3">
            {user.role == "DOCTOR" &&
            <Form onSubmit={approve} encType='multipart/form-data'>
              <input type="hidden" name="id" defaultValue={user._id}></input>
              <input type="hidden" name="email" defaultValue={user.email}></input>
              <Button   type="submit" disabled={user.account_Verified}>approve</Button>
            </Form>
          }
          </div>
        </Row>
      </td>
    </tr>
    )
  }

  return (
    <Container>
      <div className=" wd-section-heading-wrapper text-center">
          <div className="wd-service-heading wd-section-heading">
              <span className="heading-subtitle">List of Users</span>
              <p></p>
          </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="sidebar">
            <Row >
              <div className="col-12 col-lg-4">
                <div id="search-1" className="widget widget_search"><h4 className="widget-title txtCenter">Add New User</h4>
                  <div
                    className=" txtCenter greenBtn centerMydiv" >
                    <a href={`/admin/users/create`}>Create new user</a>
                  </div>
                </div>          
              </div>
              <div  className="widget widget_search col-12 col-lg-8"><h4 className="widget-title txtCenter"> Filter List </h4>
                <Row >
                  <div className=" txtCenter  centerMydiv  col-12 col-lg-6 " >
                    Search type :
                    <br/>
                    <select 
                        className="greenBtn"   
                        onChange={(event) =>{
                            setTypefilterUser(event.target.value);
                            setSearch("")
                            setShowfilteredUser(false)
                        }
                        }
                        >
                        <option value="fullname">Full Name </option>
                        <option value="email"> Email </option>
                        <option value="role"> Role </option>
                        <option value="phone"> Phone </option>
                        <option value="gender"> Gender </option>
                      </select>
                  </div>
                  <div className=" txtCenter  centerMydiv  col-12 col-lg-6 " >
                      Search value :
                      <br/>
                      <input 
                      className="greenBtn"   
                      onChange={filterListUser} placeholder="search" value={search} type="text"/>
                  </div>
                </Row>
              </div>
            </Row>
          </div>

        </div>
      </div>
      <Table striped bordered hover size="sm" className="txtCenter">
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
          {showfilteredUser ?
              filteredUser && filteredUser.map
              ((user, index)=> {
                  return (renderUser(user, index))
              })
              :
              list && list.map 
              ((user, index)=> {
                  return (renderUser(user, index))
              })
          } 
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