import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AjoutForm from './AjoutForm';
import Link from "next/link";
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { useRouter } from 'next/router';




      
    function ClinicDocs(){
        
    const [clinics, setClinics] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clinicsPerPage, setClinicsPerPage] = useState(5);
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const handleClick = () => {
        setShowForm(true);
      }


        const handleAdd = () => {
  
  
            // Utilisez la méthode push pour naviguer vers la page ajoutform
            router.push('/clinic/AjoutForm');
          };
    useEffect(()=>{
        fetch(`${process.env.backurl}/api/clinic/getAllClinics`)
        .then((response) => response.json())
        .then((data) => {
            setClinics(data);
        });
    }, []);


    
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
        if (window.confirm("Are you sure you want to delete this clinic?")) {
            fetch(`${process.env.backurl}/api/clinic/delete/${id}`,{
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setClinics(clinics.filter((clinic) => clinic._id !== id));
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to delete clinic");
            });
            console.log(id)
        }
    };
    

    const indexOfLastClinic = currentPage * clinicsPerPage;
    const indexOfFirstClinic = indexOfLastClinic - clinicsPerPage;
    const currentClinics = clinics.slice(indexOfFirstClinic, indexOfLastClinic);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(clinics.length / clinicsPerPage); i++) {
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
                <h2>List of Clinics</h2>
               							
            </div>
           {/* <a href="/clinic/AjoutForm" class=" float-end"  style={{color: '#016837'}}>Add Clinic</a> */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Clinic Name</th>
                            <th>Address</th>
                            <th>Phone number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClinics.map(clinic => (
                            <tr key={clinic._id}>
                                <td key={clinic.Name}>{clinic.Name}</td>
                                {/* <td key={clinic.Adress}>{clinic.Adress}</td> */}
                                <td key={clinic.Adress}><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.Adress)}`} target="_blank">{clinic.Adress}</a></td>

                                <td key={clinic.phone_number}>{clinic.phone_number}</td>
                                {/* <td>
                                 {/* <button
                                        className="btn border border-danger   btn-sm" 
                                        onClick={() => handleDelete(clinic._id)}
                                    >
                                        Delete
                                    </button> 
                                    
                                    </td> */}
                                    <td>
                                    {/* <button className="btn btn-primary" onClick={handleAdd}>Add Clinic</button> */}
                                     {/* <NavLink to="/ajout-form" activeClassName="active">
                                     <button onClick={handleClick}>Ajouter</button>
                                       {showForm && <AjoutForm />}
                                     </NavLink> 
                                       */}
                                        {/* <Link className="btn btn-outline-secondary me-3 ms-3" href={`/clinic/edit/${clinic._id}`}>Edit</Link> */}
                                        {/* <button className="btn btn-primary" onClick={handleUpdate(clinic._id)}>Edit Clinic</button>  */}
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

export default ClinicDocs;
