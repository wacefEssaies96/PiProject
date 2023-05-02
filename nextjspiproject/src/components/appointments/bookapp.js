import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from "next/link";
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { useRouter } from 'next/router';
import axios from "axios";
import { Alert } from 'react-bootstrap';
// import sgMail from '@sendgrid/mail';
// import { cp } from 'fs';



    function Book({user,appointment}){

    const [appointments, setAppointments] = useState([]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage, setAppointmentsPerPage] = useState(5);
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [reserved, setReserved]= useState(false);

//    let  API_KEY = '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'
//    sgMail.setApiKey(API_KEY);

    const handleClick = () => {
        setShowForm(true);
      }

    useEffect(()=>{
        fetch(`${process.env.backurl}/api/app/NotReserfindapp`)
        .then((response) => response.json())
        .then((data) => {
            setAppointments(data);
        });
    }, []);


    
     
  function extractDate(createAt) {
    const date = new Date(createAt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const dateString = `${monthNames[monthIndex]} ${day}, ${year}`;
    return dateString;
  }
      
    
    const handleBookAppointment = async (app) => {
        try {
          const response = await axios.get(`${process.env.backurl}/api/app/resapp/${app._id}`);
          const message=`your appointment has been booked successfully on ${extractDate(app.Date)} at ${app.Hour} with doctor ${app.fullname} Speciality ( ${app.speciality} )`
          const email= user.email

          var data = {
            message : message,
            email : email
          }
          console.log("response1  avant ")

          const response1 = await axios.post(`${process.env.backurl}/api/app/sendMailAppointment`,data);

          console.log("response1 "+response1)
          setReserved(true);
          
          console.log('Sending email to:', email);

           console.log('email sent successfully')

            window.location.reload()
          } catch (error) {
            console.log(error);
          }
          }
          
          const indexOfLastAppointment = currentPage * appointmentsPerPage;
          const indexOfFirstAppointment = indexOfLastAppointment -appointmentsPerPage;
          var currentAppointments=-1;
          
          if(appointments.length>0)
            currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
            
    
   
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
         {reserved && (
                <Alert variant="success" onClose={() => setReserved(false)} dismissible>
                    <Alert.Heading>Appointment Booked Successfully!</Alert.Heading>
                    <p>
                        You have successfully booked an appointment.
                    </p>
                </Alert> )}
            <div className="wishlist-title ">
                <h2>List of Appointments</h2>
               							
            </div>
            
       
  


            <div className="table-responsive">
                
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Hour</th>
                            <th>Duration</th>
                            <th>FullName</th>
                            <th>Speciality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAppointments.length>0 && currentAppointments.map(app => (
                            <tr >
                                <td key={app.Date}>{extractDate(app.Date)}</td>
                                <td key={app.Hour}>{app.Hour}</td>
                                <td key={app.Duration}>{app.Duration}</td>
                                <td key={app.fullname}>{app.fullname}</td>

                                <td key={app.speciality}>{app.speciality}</td>
                                <td><button className="btn btn-warning" onClick={()=>handleBookAppointment(app)}>Book</button> </td>
                              
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

export default Book;
