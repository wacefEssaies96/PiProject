import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from "next/link";
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { useRouter } from 'next/router';




      
    function Appointments({user,appointment}){
        
    const [appointments, setAppointments] = useState(appointment);
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage, setAppointmentsPerPage] = useState(5);
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const handleClick = () => {
        setShowForm(true);
      }


        const handleAdd = () => {
  
  
            // Utilisez la méthode push pour naviguer vers la page ajoutform
            router.push('/appointments/AjoutAppointments');
          };
    // useEffect(()=>{
    //     fetch(`${process.env.backurl}/api/app/findapp`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setAppointments(data);
    //     });
    // }, []);


    
    // const handleUpdate = (id) => {
    //     // const clinic = clinics.find((clinic) => clinic._id === id);
    //     // if(clinic){
            
    //     // }
    //     // const name = prompt(`Enter new clinic name (current: ${clinic.Name}):`);
    //     // const address = prompt(`Enter new clinic address (current: ${clinic.Adress}):`);
    //     // const phone = prompt(`Enter new clinic phone number (current: ${clinic.phone_number}):`);
    
    //     // fetch(`${process.env.backurl}/api/clinic/update/${id}`, {
    //     //     method: "PUT",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //     },
    //     //     body: JSON.stringify({
    //     //         Name: name || clinic.Name,
    //     //         Adress: address || clinic.Adress,
    //     //         phone_number: phone || clinic.phone_number,
    //     //     }),
    //     // })
    //     //     .then((response) => response.json())
    //     //     .then((data) => {
    //     //         const index = clinics.findIndex((clinic) => clinic._id === id);
    //     //         const updatedClinics = [...clinics];
    //     //         updatedClinics[index] = data;
    //     //         setClinics(updatedClinics);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error(error);
    //     //         alert("Failed to update clinic");
    //     //     });


    //     router.push(`/clinic/edit/${id}`);
    // };
    
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
    // const currentAppointments=1;
    
    const currentAppointments = appointments && appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    
   
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
            
            <a href="/appointments/AjoutAppointments" class=" float-end"  style={{color: '#016837'}}>Add an appointment</a>
            {/* <div className='container'>
            <div>{user.speciality}</div>
            <div>{user.fullname}</div>
            <div><img style={{ height: '2rem', width: '2rem' }}
                                          src={`${process.env.backurl}/${user.image}`}
                                          onError={(e) => { e.target.src = `${process.env.backurl}/uploads/User/altUser.png` }}
                                          alt="verifiy img"
                                       /></div>
 
  </div> */}


            <div className="table-responsive">
                
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Hour</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAppointments.map(app => (
                            <tr >
                                <td key={app.Date}>{app.Date}</td>
                                <td key={app.Hour}>{app.Hour}</td>
                                <td key={app.Duration}>{app.Duration}</td>
                                <td>
                                 <button
                                        className="btn border border-danger   btn-sm" 
                                        onClick={() => handleDelete(app._id)}
                                    >
                                        Delete
                                    </button>
                                    
                                    </td>
                                    <td>
                                    {/* <button className="btn btn-primary" onClick={handleAdd}>Add Clinic</button> */}
                                     {/* <NavLink to="/ajout-form" activeClassName="active">
                                     <button onClick={handleClick}>Ajouter</button>
                                       {showForm && <AjoutForm />}
                                     </NavLink> 
                                       */}
                                        <Link className="btn btn-outline-secondary me-3 ms-3" href={`/appointments/edit/${app._id}`}>Edit</Link>
                                        
                                    </td>
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
