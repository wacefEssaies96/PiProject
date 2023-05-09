import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from "next/link";
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { useRouter } from 'next/router';
import axios from "axios";






      
function Appointments({user,appointment}) {
        
    const [appointments, setAppointments] = useState(appointment);
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage, setAppointmentsPerPage] = useState(5);
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState(null);
    
  function extractDate(createAt) {
    const date = new Date(createAt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const dateString = `${monthNames[monthIndex]} ${day}, ${year}`;
    return dateString;
  }
   
  

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            fetch(`${process.env.backurl}/api/app/delapp/${id}`,{
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setAppointments(appointments.filter((app) => app._id !== id));
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to delete appointment");
            });
            console.log(id)
        }
    };


    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment -appointmentsPerPage;
    
    const currentAppointments = Array.isArray(appointments) ? appointments.slice(indexOfFirstAppointment, indexOfLastAppointment) : [];

    
   
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(appointments.length / appointmentsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                className={currentPage === number ? "page-item color-picker" : "page-item"}
                onClick={() => setCurrentPage(number)}
            >
                <a className="page-link" href="#">{number}</a>
            </li>
        );
    });

    return(
        <div className='container'>  
            <div className="wishlist-title ">
                <h2>List of Appointments</h2>
               							
            </div>
            
            <a href="/appointments/AjoutAppointments" className=" float-end"  style={{color: '#016837'}}>Add an appointment</a>


            <div className="table-responsive">
                
                
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th>Date</th>
                            <th>Hour</th>
                            <th>Duration</th>
                            <th>State</th>
                            <th>Appointment Link</th>
                            <th>Patient mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAppointments.map(app => (
                            <tr key={app._id} >
                                <td >{extractDate(app.Date)}</td>
                                <td >{app.Hour}</td>
                                <td >{app.Duration}</td>
                                <td>
                                    {app.reserved 
                                    ?
                                    <>Reserved</>
                                    :
                                    <>
                                 <button
                                        className="btn border border-danger   btn-sm" 
                                        onClick={() => handleDelete(app._id)}
                                    >
                                        Delete
                                    </button>
                                        <Link className="btn btn-outline-secondary me-3 ms-3" href={`/appointments/edit/${app._id}`}>Edit</Link>
                                        </>
                                    }
                                </td>
                                <td>
                                    {app.reserved 
                                        ?
                                        <>
                                        <Link className="btn wd-btn-round-2" href={`/appointments/vdh?name=${app.fullname}`}>meet</Link>
                                    
                                        </>
                                            :
                                        <>Not Reserved</>
                                    }
                                  
                                </td>
                                <td> {app.user[1] && app.user[1].email }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center ">
                        {renderPageNumbers}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Appointments;
