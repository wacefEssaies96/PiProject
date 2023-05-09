import { handleUpdateOrAdd } from '@/services/clinic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Cookies } from 'react-cookie'

export default function AjoutForm(props) {
    const cookies = new Cookies()
    const router = useRouter()
    const [operationMode, setOperationMode] = useState('Create')
    const [clinics, setClinics] = useState({
        Name: "",
        Adress: "",
        phone_number: "",
       
    })
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {

        await handleUpdateOrAdd (event, operationMode)
        } else{
            event.stopPropagation(); 
        }
    

        setValidated(true);

       
    }
    
    useEffect(() => {
        if (props.clinics !== undefined) {
            setClinics(props.clinics)
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
                        {operationMode === 'Add' ? <h1>Add a clinic</h1> : <h1>Edit a clinic </h1>}
                        <div className="breadcrumb">
                            <ul className="pagination-inner">
                                <li className="breadcrumb-item">
                                    <Link href="/">Home</Link>
                                </li>
                                {operationMode === 'Add' ?
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
                                        {operationMode === 'Add' ? <h2>Add a clinic</h2> : <h2>Update a clinic</h2>}
                                        <Form.Control defaultValue={clinics._id} name="id" type="hidden"></Form.Control>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control id="vb_name" defaultValue={clinics.Name} name="Name" type="text" placeholder="Name" required  />
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter the name of the clinic'}
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                        
                                        <Form.Group className="mb-3">
                                            <Form.Label>Adress</Form.Label>
                                            <Form.Control defaultValue={clinics.Adress} name="Adress" type="address" placeholder="Adress" required  />
                                            
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter the correct address !'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                            <Form.Group className="mb-3">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control defaultValue={"+216 "} name="phone_number" type="phone" placeholder="Phone" required  />
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter a valid phone number starting with +216 and 8 digits'}
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