import { submitUser } from "@/services/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Button, Container, Form, Row,Col , Stack } from "react-bootstrap"

export default function UsersForm(props) {
  const router = useRouter()

  const [operationMode, setOperationMode] = useState('Create')
  const [user, setUser] = useState({
    image : "",
    fullname : "",
    email : "",
    role: "",
    phone: "",
    speciality: "",
  })
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    await submitUser(event, operationMode)

    if (form.checkValidity() === true) {
      router.push('/users')
    }
  }

  const getRole = async (event) => {
    console.log(event.target.value)
    setUser({ ...props.user,'role': event.target.value })
  }

  useEffect(() => {

    if (props.user !== undefined) {
      setUser(props.user)
      setOperationMode('Modify')
    }
  }, [])

  return (
    <Container className="py-5">
      <h3>{operationMode} User </h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit} encType='multipart/form-data'>
        <Stack gap={4}>
          <input type="hidden" name="id" defaultValue={user._id}></input>
          
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="fullName"> Full Name </Form.Label>
                <Form.Control defaultValue={user.fullname} placeholder="Full Name" type="text" name="fullname" required minLength={4} maxLength={20}  />
                <Form.Control.Feedback type='invalid'>
                  {'Please enter your fullname, length must be between 4  and 20 caracters'}
              </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="email"> Email </Form.Label>
                <Form.Control defaultValue={user.email} placeholder="Email" type="email" name="email" required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-z]{2,8}' />
                <Form.Control.Feedback type='invalid'>
                  {'Please enter your email address'}
              </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor="role"> Role </Form.Label>
                <Form.Select required value={user.role} name="role" onChange={getRole} >
                  <option value="">Select ROLE</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DOCTOR">Doctor</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="phone"> Phone </Form.Label>
                <Form.Control defaultValue={user.phone} placeholder="12345678"  type="text" pattern="^[0-9]{8}$" id="phone" name="phone" required  />
                <Form.Control.Feedback type='invalid'>
                    {'Please enter your phone with 8 number'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image"
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {'Please choose an image of type : png, jpg, jpeg.'}
                </Form.Control.Feedback>            
              </Form.Group>
            </Col>
            <Col md={4}>
              <img style={{ height: '15rem' }} src={`${process.env.backurl}/${user.image}`} />
            </Col>
          </Row>

        </Stack>
        <Button className="btn btn-md btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" type="submit">{operationMode} User</Button>
      </Form>
    </Container >

  )
}

