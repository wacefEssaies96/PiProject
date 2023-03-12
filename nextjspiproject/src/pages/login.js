import { Cookies } from 'react-cookie'
import axios from 'axios'
import { loginService } from '../services/auth'
import { useRouter } from "next/router";
import { useState } from "react"
import { Button, Container, Form, Stack } from "react-bootstrap"
import Link from 'next/link';

export default function login(props) {

  const router = useRouter()

  const cookies = new Cookies()

  const [validInput, setValidInput] = useState(false)

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
      const mode = 'local'
      // console.log(" in login "+token+" user : "+user.id+" user email : "+user.email)
      await loginService({ token, user, mode })
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

    if (form.checkValidity() === true) {
      setValidInput(true)
      console.log('form valid')
    }
 

  return (
    <Container>
      <h3>Login</h3>
      {!auth.token && (
        <Form onSubmit={onLoginClick}>
          <Stack gap={4}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control defaultValue={auth.email} placeholder="user@esprit.tn" type="text" id="email" name="email" required isInvalid={validInput}></Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a correct email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control defaultValue={auth.password} type="password" id="password" name="password" required isInvalid={validInput}></Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </Form.Group>
          </Stack>
          <Button variant="success" type="submit">Login</Button>
          <p>{auth.error && `Error: ${auth.error}`}</p>
          <p className='text-right'>Forgotten password ? <Link href={"/forgottenPassword"}>Reset it</Link></p>
        </Form>
      )}
      {auth.token && <p>Token: {auth.token}</p>}
    </Container>
  )
}

