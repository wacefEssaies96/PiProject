import { registerUser } from '@/services/registerService'
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

    return (
        <div className="container">
            {showAlert && (<Success message={'Welcome to our Health SpotLight App!'}></Success>)}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {operationMode==='Add' ? <h2>Sign up</h2> : <h2>Edit Profile</h2>}
                <Form.Control defaultValue={props.user._id} name="id" type="hidden"></Form.Control>
                <Form.Group className="mb-3">
                    <Form.Label>FullName</Form.Label>
                    <Form.Control defaultValue={props.user.fullname} name="fullName" type="text" placeholder="FullName" required minLength={4} maxLength={15} />
                    <Form.Control.Feedback type='invalid'>
                        {'Please enter your fullname, fullname length must be at least 4 caracteres and at most 15 caracters'}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control defaultValue={props.user.email} name="email" type="email" placeholder="name@example.com" required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-z]{2,8}' />
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
                    <Form.Control defaultValue={props.user.phone} name="phone" type="number" placeholder="Phone Number" required minLength={8} />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        {'Please enter your phone number'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Height</Form.Label>
                    <Form.Control defaultValue={props.user.height} name="height" type="number" placeholder="Height en cm" required />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        {'Please enter your height'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control defaultValue={props.user.weight} name="weight" type="number" placeholder="Weight en Kg" required />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        {'Please enter your weight'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control defaultValue={props.user.address} name="address" type="text" placeholder="Address" required />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        {'Please enter your address'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Disease</Form.Label>
                    <Form.Control defaultValue={props.user.disease} name="disease" type="text" placeholder="Disease" required />
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
                        <Form.Select defaultValue={props.user.gender} name="gender" aria-label="Default select example" required>
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
                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </div>
    )
}