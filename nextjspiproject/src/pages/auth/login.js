import React from 'react'
import { Cookies } from 'react-cookie';

import axios from 'axios'
import { loginService } from '@/services/auth'
import { useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import CustomModal from '@/components/layouts/CustomModal'
// import ReCAPTCHA from "react-google-recaptcha";
import { AiFillGoogleCircle, AiFillLinkedin } from 'react-icons/ai'
import VerifySms from '@/components/VerifySms'
import withAuth from '@/components/Withauth'

function Login() {
  
  const cookies = new Cookies()

  const [validInput, setValidInput] = useState(false)
  const [show, setShow] = useState(false)
  // const [captchaToken, setCaptchaToken] = useState(false);
  const [showSmsVerify, setShowSmsVerify] = useState(false)
  const [code, setCode] = useState(0)
  const [user, setUser] = useState({})
  // const [token, setToken] = useState('')



  const [login, setLogin] = useState({
    token: "",
    error: "",
    email: "",
    password: "",
  })

  // const onCaptchaChange = (token) => {
  //   setCaptchaToken(token);
  // };
  // const [auth, setAuth] = useState({
  //   token: cookies.get('token') || null,
  //   error: '',
  //   email: null,
  //   password: null,
  // })

  const onLoginClick = async (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    setValidInput(true);

    if (form.checkValidity() === true) {

      setLogin({...login,"email": e.target.email.value,"password": e.target.password.value})
      var email = login.email;
      var password = login.password;

      try {
        // const { email, password } = cookies.get('user')
        //auth
        console.log(" email : " + login.email + " password : " + login.password)
        const url = `${process.env.backurl}/api/auth/login`
        const response = await axios.post(url, {
          email,
          password,
        })
        const token = response.data.token
        const user = response.data.user[0]
        setUser(response.data.user[0])
        // setToken(response.data.token)
        setCode(response.data.code)
        if (user.two_factor === true) {
          setShowSmsVerify(true)
        }
        else {
          await loginService({ token, user })
          // setAuth({
          //   token,
          //   error: null,
          // })
          if (user['role'] == "ADMIN") {
            window.location = '/admin/users'
          }
          else if (user['role'] == "USER") {
            window.location = '/'
          }
          else if (user['role'] == "DOCTOR") {
            window.location = '/user/doctor'
          }
          else {
            window.location = '/'
          }
        }
      } catch (error) {
        console.error(
          'You have an error in your code or there are Network issues.',
          error,
        )
        // setAuth({ error: error.message })
      } 
    }


    
  }

  const googleAuth = () => {
    window.open(
      `${process.env.backurl}/auth/google`,
      "_self"
    );
  };
  const linkedInAuth = () => {
    window.open(
      `${process.env.backurl}/auth/linkedin`,
      "_self"
    );
  };

  const [displayResetPwdModal, setDisplayResetPwdModal] = useState(false)
  const [resetPwdMsg, setResetPwdMsg] = useState(null)

  const showResetPwdModal = async () => {
    setResetPwdMsg('To reset your password, please enter your email address here')
    setDisplayResetPwdModal(true)
  }

  const hideResetPwdModal = () => {
    setDisplayResetPwdModal(false)
  }

  const SUBMIT = () => {
    console.log('alert to do')
  }
  


  return (
    <>
      <div className="inner-page-banner">
        <div className="container">
          <div className="inner_intro text-center">
            <h1>
              Login
            </h1>
            <div className="breadcrumb">
              <ul className="pagination-inner"><li className="breadcrumb-item"><a href="/">Home</a></li><li className="breadcrumb-item active" aria-current="page">Login</li></ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row no-gutter">
          <div className="col-md-10 ">
            <div className="login py-5">
              <div className="row">
                { !cookies.get('token')
                 && (
                  <div className="offset-lg-3 col-lg-6  mx-auto d-block login-page">
                    <Alert>
                        Need a Health SpotLight account?
                        <br/>
                        <a className="color-litegreen"href="/user/doctor-or-user"> Signup here!</a>
                    </Alert>
      
                    {
                      !showSmsVerify ? <>
                        {show && <Alert variant="success" onClose={() => setShow(false)} dismissible>
                          <Alert.Heading>An email is sent to you with an access link, please check your inbox!</Alert.Heading>
                        </Alert>
                        }
                        <Form id="login" noValidate validated={validInput} onSubmit={onLoginClick}>
                          <Form.Group className="form-label-group">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control defaultValue={login.email} placeholder="user@esprit.tn" className="form-control" type="text" id="email" name="email" required isInvalid={validInput}></Form.Control>
                            <Form.Control.Feedback type="invalid">
                              Please enter a correct email
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="form-label-group">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control defaultValue={login.password} className="form-control" type="password" id="password" name="password" required isInvalid={validInput}></Form.Control>
                            <Form.Control.Feedback type="invalid">
                              Please enter a correct password
                            </Form.Control.Feedback>
                          </Form.Group>
                          {/* <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={onCaptchaChange}
                          /> */}

                          <div className="d-flex justify-content-center">
                            <Button id="btn-disable-login"
                              className="btn wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button btn-light" style={{ borderRadius: "8000px", margin: "15px" }}
                              type="submit" value="Login"
                              name="submit" 
                              // disabled={!captchaToken}
                              >Sign In</Button>
                            <Button
                              className="btn wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" style={{ borderRadius: "8000px", margin: "15px" }}
                              value="Login google" onClick={googleAuth} ><AiFillGoogleCircle size={20}></AiFillGoogleCircle>Google</Button>
                            <Button
                              className="btn wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" style={{ borderRadius: "8000px", margin: "15px" }}
                              value="Login linkedIn" onClick={linkedInAuth} ><AiFillLinkedin size={20}></AiFillLinkedin>LinkedIn</Button>
                          </div>
                        </Form>
                        {/* <p>{auth.error && `Error: ${auth.error}`}</p> */}
                        {/* <p style={{color : "red"}}>{auth.error && `Error: Please verify your credentials !`}</p> */}
                        <div className="d-flex justify-content-center">
                          <p>Forgotten password ?
                            <Button className='btn wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button' style={{ borderRadius: "8000px", margin: "15px" }} onClick={showResetPwdModal}>
                              Reset it
                            </Button>
                          </p>
                        </div>
                      </>
                        : <>
                          <VerifySms code={code} token={token} user={user}></VerifySms>
                        </>
                    }
                  </div >
                )}
                <CustomModal alertEmail={() => setShow(true)} showModal={displayResetPwdModal} confirmModal={SUBMIT} hideModal={hideResetPwdModal} id={null} message={resetPwdMsg} />
              </div >
            </div >
          </div >
        </div >
      </div >
    </>
  )
}

export default withAuth(Login)
