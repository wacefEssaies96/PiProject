import Head from "next/head";
import Link from "next/link";
import { Form, Button, Card } from "react-bootstrap";
import { BiBlock, BiCheck } from 'react-icons/bi'
import axios from "axios"
import { useEffect, useState } from "react";
import Success from "@/components/layouts/SuccessMsg";

const StartNowFormPage = () => {

    const [userImage, setUserImage] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [validated, setValidated] = useState(false)
    const [res, setRes] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget

        if (form.checkValidity() === true) {
            setValidated(true)
            const formData = new FormData()
            formData.append('userImage', e.target.userImage.files[0])
            const response = await axios.post(`${process.env.backurl}/api/get-your-morphology/getYourMorphologyType`, formData)
            if (!showAlert) {
                setRes(response.data)
                setShowAlert(true)
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000);
    }, [showAlert])

    const handleUserImage = (e) => {
        setUserImage(e.target.files[0])
    }

    return (
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Head>
                <title>Sport Start Now | Form Page</title>
                <meta name='keywords' content='Sports' />
            </Head>
            <div id="form-sport" className="inner-page-banner">
                <div className="container">
                    <div className="inner_intro text-center">
                        <h2 style={{ color: "white" }}>Please fill out the form below to start your sport training program</h2>
                    </div>
                </div>
                <div className="container d-flex justify-content-center">
                    {showAlert && (<Success message="Your image is sent successfully, please wait for the result..."></Success>)}
                    <Form encType="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmit} style={{ padding: "5%" }}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="floatingInput" style={{ fontWeight: "bold", color: "#d93" }}>Your Full Body Picture</Form.Label>
                            <Form.Control onChange={handleUserImage} style={{ width: "100%" }} name="userImage" type="file" className="form-control" id="floatingInput" placeholder="Full Body Picture" required />
                            <Form.Control.Feedback type="valid">
                                You did it!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>
                                Please enter your full body picture !
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Submit <BiCheck></BiCheck>
                        </Button>
                        <Link href="/sub-sport-types" className="btn btn-light">
                            Cancel <BiBlock></BiBlock>
                        </Link>
                    </Form>
                    {res != '' &&
                        <Card style={{ width: '40%', height:"70%", marginTop:"5%" }}>
                            <Card.Body>
                                <Card.Title>Your Shoulder width : {res} cm</Card.Title>
                                <Card.Title>Your Waist  width : {res} cm</Card.Title>
                                <Card.Title>Your Hips width : {res} cm</Card.Title>
                            </Card.Body>
                            <Button className="btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button">See you body shape type</Button>
                        </Card>
                    }
                </div>
            </div>
        </div >
    );
}

export default StartNowFormPage;