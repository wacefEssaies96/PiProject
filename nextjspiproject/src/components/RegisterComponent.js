import { registerUser } from '@/services/registerService'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Success from './layouts/SuccessMsg'

export default function Register(props) {

    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: 0,
        height: 0,
        weight: 0,
        address: '',
        disease: '',
        gender: ''
    })
    const [operationMode, setOperationMode] = useState('Add')
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()
    const [validated, setValidated] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        await registerUser(e, operationMode)
        if (form.checkValidity() === true) {
            router.push("/")
        }
    }

    useEffect(() => {
        if (props.user !== undefined) {
            setRegisterData(props.user)
            setOperationMode('Update')
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000);
    }, [showAlert])

    return (<>
        {showAlert && (<Success message={'Welcome to our Health SpotLight App!'}></Success>)}
        <div id="inner_header" className="inner-page-banner" style={{}}>
            <div className="container">
                <div className="inner_intro text-center">
                    <h1>Register </h1>
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
                                <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-horizontal registraion-form">
                                    {operationMode === 'Add' ? <h2>Sign up</h2> : <h2>Edit Profile</h2>}
                                    <Form.Control defaultValue={registerData._id} name="id" type="hidden"></Form.Control>
                                    <Form.Group className="mb-3">
                                        <Form.Label>FullName</Form.Label>
                                        <Form.Control id="vb_name" defaultValue={registerData.fullname} name="fullName" type="text" placeholder="FullName" required minLength={4} maxLength={15} />
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your fullname, fullname length must be at least 4 caracteres and at most 15 caracters'}
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control defaultValue={registerData.email} name="email" type="email" placeholder="name@example.com" required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-z]{2,8}' />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your email address'}
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
                                        <Form.Control defaultValue={registerData.phone} name="phone" type="number" placeholder="Phone Number" required minLength={8} />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your phone number'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Height</Form.Label>
                                        <Form.Control defaultValue={registerData.height} name="height" type="number" placeholder="Height en cm" required />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your height'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control defaultValue={registerData.weight} name="weight" type="number" placeholder="Weight en Kg" required />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your weight'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control defaultValue={registerData.address} name="address" type="text" placeholder="Address" required />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your address'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Disease</Form.Label>
                                        <Form.Control defaultValue={registerData.disease} name="disease" type="text" placeholder="Disease" required />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your disease'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <div className="mb-3">
                                            <Form.Select className="form-control" defaultValue={registerData.gender} name="gender" aria-label="Default select example" required>
                                                <option value="">Select your gender</option>
                                                <option value="1">Female</option>
                                                <option value="2">Male</option>
                                            </Form.Select>
                                        </div>
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            Please select your gender
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