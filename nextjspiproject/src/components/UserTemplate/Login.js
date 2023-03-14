import React from 'react'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import { loginService } from '../../services/auth'
import { useRouter } from "next/router";
import { useState } from "react"
import { Alert, Button, Container, Form, Stack } from "react-bootstrap"
import DeleteConfirmation from '@/components/layouts/DeleteConfirmation'
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const router = useRouter()

  const [validInput, setValidInput] = useState(false)
  const [show, setShow] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(false);


  const cookies = new Cookies()
  
  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };
  const [auth, setAuth] = useState({
    token: cookies.get('token') || null,
    error: '',
    email: null,
    password: null,
  })
  const onLoginClick = async (e) => {
    /* eslint-disable no-console */
    e.preventDefault()

    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      setValidInput(true)
      console.log('form valid')
    }

    e.preventDefault()
    auth.email = e.target.email.value
    auth.password = e.target.password.value
    try {
      const { email, password } = auth
      console.log(" email : " + email + " password : " + password)
      const url = `${process.env.backurl}/api/auth/login`
      const response = await axios.post(url, {
        email,
        password,
      })
      const token = response.data.token
      const user = response.data.user[0]
      // console.log(" in login "+token+" user : "+user.id+" user email : "+user.email)
      await loginService({ token, user })
      setAuth({
        token,
        error: null,
      })
      if (user['role' == "ADMIN"]) {
        router.push('/admin')
      }
      else if (user['role' == "User"]) {
        router.push('/user')
      }
      else if (user['role' == "DOCTOR"]) {
        router.push('/doctor')
      }
      else {
        router.push('/')
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error,
      )
      setAuth({ error: error.message })
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
    console.log('working')
  }

  return (
    <>
      <div id="inner_header" className="inner-page-banner">
        <div className="container">
          <div className="inner_intro text-center">
            <h1>
              Login
            </h1>
            <div className="breadcrumb">
              <ul className="pagination-inner"><li className="breadcrumb-item"><a href="../index.html">Home</a></li><li className="breadcrumb-item active" aria-current="page">Login</li></ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row no-gutter">
          <div className="col-md-12">
            <div className="login py-5">
              <div className="row">
                {!auth.token && (
                  <div className="offset-lg-3 col-lg-6  mx-auto d-block login-page">
                    <div className="login-page">
                      <p className="sub_title">Need a weefly account?<a
                        className="color-litegreen"
                        href="../register/index.html"> Signup here!</a>
                      </p>
                    </div>
                    {show && <Alert variant="success" onClose={() => setShow(false)} dismissible>
                      <Alert.Heading>An email is sent to you with an access link, please check your inbox!</Alert.Heading>
                    </Alert>}
                    <Form id="login" onSubmit={onLoginClick}>
                      <Form.Group className="form-label-group">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control defaultValue={auth.email} placeholder="user@esprit.tn" className="form-control" type="text" id="email" name="email" required isInvalid={validInput}></Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Please enter a correct email
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="form-label-group">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control defaultValue={auth.password} className="form-control" type="password" id="password" name="password" required isInvalid={validInput}></Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Please enter a correct password
                        </Form.Control.Feedback>
                      </Form.Group>
                      <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onCaptchaChange}
        />
                      {/* <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                    <label className="custom-control-label"
                                           htmlFor="customCheck1">Remember Password</label>
                                </div> */}
                      {/* <input type="hidden" id="security" name="security" value="70515a4dc6" /> */}
                      {/* <input type="hidden" name="_wp_http_referer" value="/themes/wp/weefly/login/" />                                */}
                      {/* <input type="hidden" id="security" name="security" value="70515a4dc6" /> */}
                      {/* <input type="hidden" name="_wp_http_referer" value="/themes/wp/weefly/login/" />                                */}
                      <Button
                        className="btn btn-lg btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button"
                        type="submit" value="Login" disabled={!captchaToken}
                        name="submit">Sign In</Button>
                    </Form>
                    <Button
                      className="btn btn-lg btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button"
                      value="Login google" onClick={googleAuth} >Sign In with google</Button>
                    <Button
                      className="btn btn-lg btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button"
                      value="Login linkedIn" onClick={linkedInAuth} >Sign In with linkedIn</Button>
                    <p>{auth.error && `Error: ${auth.error}`}</p>
                    <div className="text-center">
                      <p className='text-right'>Forgotten password ? <Button variant='warning' onClick={showResetPwdModal}>Reset it</Button></p>
                    </div>

                  </div>


                )}

                {auth.token && <p>Login success Token: {auth.token}</p>}

                <DeleteConfirmation alertEmail={()=>setShow(true)} showModal={displayResetPwdModal} confirmModal={SUBMIT} hideModal={hideResetPwdModal} id={null} message={resetPwdMsg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login