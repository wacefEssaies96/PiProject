import { Cookies } from 'react-cookie'
import axios from 'axios'
import { loginService } from '../services/auth'
import { useRouter } from "next/router";
import { useState } from "react"
import { Button, Container, Form, Stack } from "react-bootstrap"

export default function login(props) {

    const router = useRouter()
    
    const cookies = new Cookies()

    const [auth, setAuth] =useState({
          token: cookies.get('token') || null,
          error: '',
          email: null,
          password: null,
        })
    const onLoginClick = async (e) => {
        /* eslint-disable no-console */
        e.preventDefault()
        auth.email = e.target.email.value
        auth.password = e.target.password.value
        try {
          const { email, password } = auth
          console.log(" email : "+email+" password : "+password)
          const url = `${process.env.backurl}/api/auth/login`
          const response = await axios.post(url, {
            email,
            password,
          })
          const token  = response.data.token
          const user = response.data.user[0]
          // console.log(" in login "+token+" user : "+user.id+" user email : "+user.email)
          await loginService({ token,user })
          setAuth({
            token,
            error: null,
          })
          if(user['role'=="ADMIN"])  {
            router.push('/admin')
          }
          else if(user['role'=="User"])  {
            router.push('/user')
          }
          else  {
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


  return (
    <Container>

      <h3>Login</h3>
        
        {!auth.token && (
            <form onSubmit={onLoginClick}>
            
                <Stack gap={4}>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control defaultValue={auth.email}  placeholder="user@esprit.tn" type="text" id="email" name="email" required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control defaultValue={auth.password}   type="password" id="password" name="password" required></Form.Control>
                    </Form.Group>
                </Stack>
                <Button variant="success" type="submit">Login</Button>
                <p>{auth.error && `Error: ${auth.error}`}</p>
            </form>
        )}

        {auth.token && <p>Token: {auth.token}</p>}
    
    </Container>
  )
}

