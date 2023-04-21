import Head from "next/head";
import Link from "next/link";
import { Form, Button, Card, Placeholder, Row, Col, Toast } from "react-bootstrap";
import { BiBlock, BiCheck } from 'react-icons/bi'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import nextCookie from 'next-cookies'

const StartNowFormPage = (ctx) => {

    const [userImage, setUserImage] = useState('')
    const [validated, setValidated] = useState(false)
    const [res, setRes] = useState('')
    const [showA, setShowA] = useState(true);
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const {user} = nextCookie(ctx)

    useEffect(() => {
        // Get user ID from cookie
        const userIdFromCookie = user._id;
        setUserId(userIdFromCookie);
      }, []);

    const toggleShowA = () => setShowA(!showA);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget

        if (form.checkValidity() === true) {
            setValidated(true)
            const formData = new FormData()
            formData.append('userImage', e.target.userImage.files[0])
            const response = await axios.post(`${process.env.backurl}/api/get-your-morphology/getYourMorphologyType`, formData)
            setRes(response.data)
        }
    }

    const handleUserImage = (e) => {
        setUserImage(e.target.files[0])
    }

    const handleClick = () => {
        // Pass data as query parameters in the URL
        router.push({
          pathname: `/sports/body-shape-result/${userId}`,
          query: { shouldersWidth: res.shoulderWidth, hipsWidth: res.hipsWidth },
        });
      };

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
                        <Card style={{ width: '40%', height: "70%", marginTop: "5%" }}>
                            <Card.Body>
                                <Card.Title>RESULT</Card.Title>
                                <Card.Text>Your Shoulder width : {res.shoulderWidth} cm</Card.Text>
                                <Card.Text>Your Hips width : {res.hipsWidth} cm</Card.Text>
                            </Card.Body>
                            <Button className="btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" onClick={handleClick}><Link href={`/sports/body-shape-result/${userId}`}>See you body shape type</Link></Button>
                        </Card>}
                    {validated || res === '' &&
                        <Card style={{ width: '40%', height: "70%", marginTop: "5%" }}>
                            <Card.Body>
                                <Row>
                                    <Col md={10} className="mb-2">
                                        <Toast show={showA} onClose={toggleShowA}>
                                            <Toast.Header>
                                                <img
                                                    src="holder.js/20x20?text=%20"
                                                    className="rounded me-2"
                                                    alt=""
                                                />
                                                <strong className="me-auto">Information</strong>
                                                <small>Now</small>
                                            </Toast.Header>
                                            <Toast.Body>Please Enter your image to see the result !</Toast.Body>
                                        </Toast>
                                    </Col>
                                </Row>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={6} /> <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder.Button bg="light" className="btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" xs={10} />
                            </Card.Body>
                        </Card>
                    }
                </div>
            </div>
        </div >
    );
}

export default StartNowFormPage;