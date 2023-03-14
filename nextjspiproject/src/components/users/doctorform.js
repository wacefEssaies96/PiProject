import { registerDoctor } from '@/services/registerdoctor'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export default function DoctorsForm(props) {
    const router = useRouter()
    const [operationMode, setOperationMode] = useState('Create')
    const [doctor, setDoctor] = useState({
        fullname: "",
        email: "",
        role: "",
        gender: "",
        phone: 0,
        address: "",
        speciality: "",
    })
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setValidated(true);
        await registerDoctor(event, operationMode)
        if (form.checkValidity() === true) {
            router.push('/')
        }
    }
    useEffect(() => {
        if (props.doctor !== undefined) {
            setDoctor(props.doctor)
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
                        <h1>Register a doctor </h1>
                        <div className="breadcrumb">
                            <ul className="pagination-inner">
                                <li className="breadcrumb-item">
                                    <Link href="/">Home</Link>
                                </li>
                                {operationMode === 'Add' ?
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Register
                                    </li> :
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Edit Profile
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
                                    <div className="register_form_heading">
                                        <p className="sub_title">
                                            Already have an account?
                                            <Link className="color-litegreen" href="/login">
                                                Login here!
                                            </Link>
                                        </p>
                                    </div>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-horizontal registraion-form" encType='multipart/form-data'>
                                        {operationMode === 'Add' ? <h2>Sign up</h2> : <h2>Edit Profile</h2>}
                                        <Form.Control defaultValue={doctor._id} name="id" type="hidden"></Form.Control>
                                        <Form.Group className="mb-3">
                                            <Form.Label>FullName</Form.Label>
                                            <Form.Control id="vb_name" defaultValue={doctor.fullname} name="fullname" type="text" placeholder="Full Name" required minLength={4} maxLength={15} />
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter your fullname, fullname length must be at least 4 caracteres and at most 15 caracters'}
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                name="image"
                                                required
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose an image of type : png, jpg, jpeg.
                                            </Form.Control.Feedback>
                                            {doctor.image && <img style={{ height: '15rem' }} src={`${process.env.backurl}/${doctor.image}`} />}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control defaultValue={doctor.email} name="email" type="email" placeholder="name@example.com" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter your email address, Email must have this form'}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name="password" type="password" placeholder="Password" required minLength={8} />
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter your password, password minLength is 8'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control defaultValue={doctor.phone} name="phone" type="number" placeholder="Phone Number" required minLength={8} />
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter your phone number'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control defaultValue={doctor.address} name="address" type="text" placeholder="Address" required />
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {'Please enter your address'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Gender</Form.Label>
                                            <div className="mb-3">
                                                <Form.Select className="form-control" value={doctor.gender} name="gender" aria-label="Default select example" required>
                                                    <option value="">Select Gender</option>
                                                    <option value="Man">Man</option>
                                                    <option value="Women">Women</option>
                                                </Form.Select>
                                            </div>
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                Please select your gender
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>speciality</Form.Label>
                                            <div className="mb-3">
                                                <Form.Select className="form-control" value={doctor.speciality} name="speciality" aria-label="Default select example" required>
                                                    <option value="">Select your speciality </option>
                                                    <option value="Family medicine">Family medicine</option>
                                                    <option value="Internal Medicine">Internal Medicine</option>
                                                    <option value="Pediatrician">Pediatrician</option>
                                                    <option value="Obstetricians/gynecolo">Obstetricians/gynecolo</option>
                                                    <option value="gist (OBGYNs)">gist (OBGYNs)</option>
                                                    <option value="Cardiologist">Cardiologist</option>
                                                    <option value="Oncologist">Oncologist</option>
                                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                                    <option value="Pulmonologist">Pulmonologist</option>
                                                    <option value="Infectious disease">Infectious disease</option>
                                                    <option value="Nephrologist">Nephrologist</option>
                                                    <option value="Endocrinologist">Endocrinologist</option>
                                                    <option value="Ophthalmologist">Ophthalmologist</option>
                                                    <option value="Otolaryngologist">Otolaryngologist</option>
                                                    <option value="Dermatologist">Dermatologist</option>
                                                    <option value="Psychiatrist">Psychiatrist</option>
                                                    <option value="Neurologist">Neurologist</option>
                                                    <option value="Radiologist">Radiologist</option>
                                                    <option value="Anesthesiologist">Anesthesiologist</option>
                                                    <option value="Surgeon">Surgeon</option>
                                                    <option value="Physician executive">Physician executive</option>
                                                </Form.Select>
                                            </div>
                                            <Form.Control.Feedback type="valid">
                                                You did it!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                Please select a speciality
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