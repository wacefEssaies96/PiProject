import { handleUpdateOrAdd } from '@/services/appointment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Cookies } from 'react-cookie'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


export default function AppointmentForm(props) {
    const [selectedDate, setSelectedDate] = useState("");
    const cookies = new Cookies()
    const router = useRouter()
    
    const [validated, setValidated] = useState(false);
    const [operationMode, setOperationMode] = useState('Create')
    const [appointments, setAppointments] = useState({
        Date: new Date(),
        Hour: "",
        Duration: "00h00min",

       
    })
    const handleDateChange = (date) => {
        // const formattedDate = `${("0" + date.getDate()).slice(-2)}/${
        //     ("0" + (date.getMonth() + 1)).slice(-2)
        //   }/${date.getFullYear()}`;
        setAppointments({
            ...appointments,
             Date: date
     });
      };
    


      const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            await handleUpdateOrAdd(event, operationMode);
           
        } else {
            event.stopPropagation();
        }
        setValidated(true);
    }
    
    // const handleDateChange = (date) => {
    //     setAppointments({
    //         ...appointments,
    //         Date: date
    //     });
    //     console.log("date " + date)
      
    // }
   

    
    useEffect(() => {
        if (props.appointments !== undefined) {
            setAppointments(props.appointments)
            setOperationMode('Update')
        }
        else {
            setOperationMode('Add')
        }
    }, [])
    return (
        <>
            <div id="inner_header" className="inner-page-banner" style={{}}>
                <div className="container">
                    <div className="inner_intro text-center">
                        {operationMode === 'Add' ? <h1>Add Appointment</h1> : <h1>Edit Appointment </h1>}
                        <div className="breadcrumb">
                            <ul className="pagination-inner">
                                <li className="breadcrumb-item">
                                    <Link href="/">Home</Link>
                                </li>
                                {operationMode === 'Add'  ?
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Add
                                    </li> : 
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Edit 
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row no-gutter">
                    <div className="col-md-12">
                        <div className="register py-5">
                            <div className="row">
                                <div className="offset-lg-3 col-lg-6  mx-auto d-block login-page">
                                 
                                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-horizontal registraion-form" encType='multipart/form-data'>
                                        {operationMode === 'Add' ? <h2>Add Appointment</h2> : <h2>Update Appointment</h2>}
                                        <Form.Control defaultValue={appointments._id} name="id" type="hidden"></Form.Control>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Date</Form.Label>
                                            
                                        
                                           <DatePicker
                                                
                                                selected={moment(appointments.Date).toDate()}  value={moment(appointments.Date).format('YYYY-MM-DD')}
                                                onChange={ (e)=>handleDateChange(e)}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Choose a date"
                                                name="Date"
                                                id="vb_name"
                                                className="form-control"
                                                required
                                            />  
                                             
                                                  {/* <DatePicker
  selected={appointments.Date}
  onChange={(date) => handleDateChange(date)}
  dateFormat="dd/mm/yyyy"
  placeholderText="Select a date" */}
{/* /> */}
                                                                {/* <Form.Control id="vb_name" defaultValue={appointments.Date} name="Date" type="text" placeholder="Date" required  /> */}
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter the Date'}
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                        
                                        <Form.Group className="mb-3">
                                            <Form.Label>Hour</Form.Label>
                                            <Form.Control
                                                       defaultValue={appointments.Hour}
                                                        name="Hour"
                                                        type="Hour"
                                                        placeholder="HH:MM"
                                                        pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" // ajout du pattern
                                                        required
                                                    />
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter the correct form !'}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Duration</Form.Label>
                                            <Form.Control  
                                                           defaultValue={appointments.Duration}
                                                            name="Duration"
                                                            type="text"
                                                            placeholder="e.g. 1h30min"
                                                            //value={appointments.Duration || "30min"}
                                                            pattern="((0|1)[0-9]|[1-9])h([3-9]|[1-5][0-9]?)min"
// ajout du pattern
                                                            required
                                                        />
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                   Please enter a duration between 00h30min and 1h30min
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                       
                                        
                                        <Button variant="success" type="submit" className="btn btn-lg btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button">Submit</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
