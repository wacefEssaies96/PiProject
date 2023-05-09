import Link from "next/link";
import { Container, Table, Button, Form, Row } from "react-bootstrap";
import {  BiEdit, BiTrashAlt } from 'react-icons/bi'
import { useState } from "react";
import { deleteData, fetchData } from "@/services/mix";
import { verifyAccount } from "@/services/user";
import withAuth from "@/components/Withauth";
import DeleteModal from "@/components/layouts/DeleteModal";

function Index({ users }) {

  

  const [list, setList] = useState(users)
  const [filteredUser, setFilteredUser] = useState();
  const [showfilteredUser, setShowfilteredUser] = useState(false);
  const [typefilterUser, setTypefilterUser] = useState();
  const [search, setSearch] = useState("");

  const [id, setId] = useState(null)
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(null)
  
  const showDeleteModal = (id) => {
    setId(id)
    setDeleteMessage(`Are you sure you want to delete the user : '${users.find((x) => x._id === id).email}'?`)
    setDisplayConfirmationModal(true)
  }
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }

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
    e.preventDefault();
    await verifyAccount(e.target.email.value, e.target.id.value);
    await refresh();
  };
  const refresh = async () => setList(await fetchData(`${process.env.backurl}/api/users/findAll`));

  const deleteOneUser = async (id) => deleteData(`${process.env.backurl}/api/users/${id}`,users)
  .then(setDisplayConfirmationModal(false),refresh())

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
            <Link className="btn btn-outline-secondary me-3 ms-3" href={`/admin/users/edit/${user._id}`}>
              <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
            </Link>
          </div>
          <div className=" col-12 col-lg-3">
          <Button onClick={() => showDeleteModal(user._id)}  variant="outline-danger">
            <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
          </Button>
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

  
  const [Page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const indexOfLastpage = Page * itemPerPage;
  const indexOfFirstpage = indexOfLastpage -itemPerPage;
  const pageNumbers = [];
  var currentlist = Array.isArray(list) ? list.slice(indexOfFirstpage, indexOfLastpage) : [];

  if(showfilteredUser){
    for (let i = 1; i <= Math.ceil(filteredUser.length / itemPerPage); i++) {
        pageNumbers.push(i);
    }
    currentlist = filteredUser.slice(indexOfFirstpage, indexOfLastpage)
  }else{
    for (let i = 1; i <= Math.ceil(list.length / itemPerPage); i++) {
        pageNumbers.push(i);
    }
    currentlist = list.slice(indexOfFirstpage, indexOfLastpage)
  }

  const renderPageNumbers = pageNumbers.slice(Page-1,Page).map(number => {
      return (
          <li
              key={number}
              id={number}

              className={Page === number ? "page-item color-picker " : "page-item"}
              onClick={() => setPage(number)}
          >
            {Page === number
            ?
            <a className="page-number current " style={{backgroundColor : "#016837",color: "white" }} >{number}  / {pageNumbers.length}</a>
            :
              <a className="page-number " >{number} / {pageNumbers.length}</a>
            }
          </li>
      );
  });
  const changepage = async (nbr) =>{
    var newnbr = Page+nbr;
    if(pageNumbers.includes(newnbr)){
      setPage(newnbr)
    }
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
          {currentlist && currentlist.map 
              ((user, index)=> {
                  return (renderUser(user, index))
              })
          }
          {/* {showfilteredUser ?
              filteredUser && filteredUser.map
              ((user, index)=> {
                  return (renderUser(user, index))
              })
              :
              // list && list.map 
              currentlist && currentlist.map 
              ((user, index)=> {
                  return (renderUser(user, index))
              })
          }  */}
        </tbody>
      </Table>

      <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center ">
		          <div className="nav-links">
                {Page != pageNumbers[0] &&
                  <a class="prev page-numbers "  onClick={()=>changepage(-1)}>&laquo;</a>
                }
                {renderPageNumbers}
                {Page != pageNumbers[pageNumbers.length-1] &&
                  <a className="next page-numbers" onClick={()=>changepage(1)} >&raquo;</a>
                }
              </div>
          </ul>
      </nav>
      <DeleteModal showModal={displayConfirmationModal} confirmModal={deleteOneUser} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />

    </Container>
  );
}

export async function getServerSideProps() {
  const data = await fetchData(`${process.env.backurl}/api/users/findAll`);
  
  return {
    props: {
      users: data,
    },
  };
}

export default withAuth(Index);
