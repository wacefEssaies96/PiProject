import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export default function register() {

    const [registerData, setRegisterData] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (field, value) => {
        setRegisterData({
            ...registerData,
            [field]: value
        })

        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }

    const validateForm = () => {
        const { fullName, email, password, phone, height, weight, address, disease, gender } = registerData
        const newErrors = {}

        if (!fullName || fullName === '') { newErrors.fullName = 'Please enter your fullName' }
        else if (fullName.length < 4 || fullName.length > 15) { newErrors.fullName = 'FullName must be between 4 and 15 caracters' }
        if (!email || email === '') newErrors.email = 'Please enter your email'
        if (!password || password === '') newErrors.password = 'Please enter your password'
        if (!phone || phone === '') newErrors.phone = 'Please enter your phone'
        if (!height || height === '') newErrors.height = 'Please enter your height'
        if (!weight || weight === '') newErrors.weight = 'Please enter your weight'
        if (!address || address === '') newErrors.address = 'Please enter your address'
        if (!disease || disease === '') newErrors.disease = 'Please enter your disease'
        if (!gender || gender === '') newErrors.gender = 'Please check your gender'

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            console.log('form not valid !')
        } else {
            console.log('user registered')
        }
        console.log(registerData)
        console.log(formErrors)
    }

    return (
        <div className="container">
            <Form>
                <h2>Sign up</h2>
                <Form.Group className="mb-3" controlId='fullName'>
                    <Form.Label>FullName</Form.Label>
                    <Form.Control type="text" placeholder="FullName" onChange={(e) => handleChange('fullName', e.target.value)} isInvalid={!!errors.fullName} required minLength={4} maxLength={15} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.fullName}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                    You did it!
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => handleChange('email', e.target.value)} isInvalid={errors.email} required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-z]{2,8}' />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => handleChange('password', e.target.value)} isInvalid={errors.password} required minLength={8} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId='phone'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" placeholder="Phone Number" onChange={(e) => handleChange('phone', e.target.value)} isInvalid={errors.phone} required minLength={8} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId='height'>
                    <Form.Label>Height</Form.Label>
                    <Form.Control type="number" placeholder="Height en cm" onChange={(e) => handleChange('height', e.target.value)} isInvalid={errors.height} required />
                    <Form.Control.Feedback type='invalid'>
                        {errors.height}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId='weight'>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="number" placeholder="Weight en Kg" onChange={(e) => handleChange('weight', e.target.value)} isInvalid={errors.weight} required />
                    <Form.Control.Feedback type='invalid'>
                        {errors.weight}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" onChange={(e) => handleChange('address', e.target.value)} isInvalid={errors.address} required />
                    <Form.Control.Feedback type='invalid'>
                        {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId='disease'>
                    <Form.Label>Disease</Form.Label>
                    <Form.Control type="text" placeholder="Disease" onChange={(e) => handleChange('disease', e.target.value)} isInvalid={errors.disease} required />
                    <Form.Control.Feedback type='invalid'>
                        {errors.disease}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId='Gender'>
                    <Form.Label>Gender</Form.Label>
                    <div className="mb-3">
                        <Form.Check>
                            <Form.Check.Input type="radio" onChange={(e) => handleChange('gender', e.target.value)} isInvalid={errors.gender} required/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.gender}
                            </Form.Control.Feedback>
                            <Form.Check.Label>Male</Form.Check.Label>
                        </Form.Check>
                        <Form.Check>
                            <Form.Check.Input type="radio" onChange={(e) => handleChange('gender', e.target.value)} isInvalid={errors.gender} required/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.gender}
                            </Form.Control.Feedback>
                            <Form.Check.Label>Female</Form.Check.Label>
                        </Form.Check>
                    </div>
                </Form.Group>
                <Button variant="success" type="submit" onClick={handleSubmit}>Register</Button>
            </Form>
        </div>
    )
}
