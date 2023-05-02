import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AjoutForm from './AjoutForm';
import Link from "next/link";
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { useRouter } from 'next/router';
import Map from "./Map";
// import MapModal from "./mapmodel";
import dynamic from 'next/dynamic';



      
    function ClinicDocs(){
        
    const [position, setPosition] = useState([0,0]);

    

  
  const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
    ssr: false,
  });

  const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
    ssr: false,
  });

  const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
    ssr: false,
  });
  const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
  });

    const [clinics, setClinics] = useState([]);
    const [add, setAdd] = useState("tunis");
    const [currentPage, setCurrentPage] = useState(1);
    const [clinicsPerPage, setClinicsPerPage] = useState(5);
    const router = useRouter();
    const [showMap, setShowMap] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleClick = (Name) => {
        setSelectedAddress(Name);
        setShowModal(true);
      };
    
      const handleClose = () => {
        setShowModal(false);
        setSelectedAddress('');
      };

    
    useEffect(()=>{
        fetch(`${process.env.backurl}/api/clinic/getAllClinics`)
        .then((response) => response.json())
        .then((data) => {
            setClinics(data);
        });
    }, []);
  
 
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

                    <td>
    {clinic.Adress}

</td>
                                      
                                <td key={clinic.phone_number}>{clinic.phone_number}</td>
                                <td>
                                <button
                                        className="btn border border-warning   btn-sm" 
                                        onClick={() => handleClick(clinic.Name)}
                                    >
                                       show map

                                    </button>
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
            {showModal && <MapModal Name={selectedAddress} onClose={() => setShowModal(false)} />}

        </div>
    );
}
    
export default ClinicDocs;