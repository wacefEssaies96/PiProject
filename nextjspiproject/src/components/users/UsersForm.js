import { submitUser } from "@/services/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Button, Container, Form, Stack } from "react-bootstrap"

export default function UsersForm(props) {
  const router = useRouter()

  const [operationMode, setOperationMode] = useState('Create')
  const [user, setUser] = useState({
    email : "",
    role: "",
    height: "",
    weight: "",
    gender: ""
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

  const getGender = async (event) => {
    console.log(event.target.value)
    setUser({...props.user, 'gender': event.target.value })
  }

  useEffect(() => {

    if (props.user !== undefined) {
      setUser(props.user)
      setOperationMode('Modify')
    }
  }, [])

  return (
    <Container>
      <h3>{operationMode} User </h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit} encType='multipart/form-data'>
        <Stack gap={4}>
          <input type="hidden" name="id" defaultValue={user._id}></input>
          <Form.Select required value={user.role} name="role" onChange={getRole} >
            <option value="">Select ROLE</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose an image of type : png, jpg, jpeg.
            </Form.Control.Feedback>            
            <img style={{ height: '15rem' }} src={`${process.env.backurl}/${user.image}`} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email"> Email </Form.Label>
            <Form.Control defaultValue={user.email} placeholder="Email" type="email" name="email" required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="height"> Height </Form.Label>
            <Form.Control defaultValue={user.height} placeholder="160" type="text" id="height" name="height" required></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="weight">Weight </Form.Label>
            <Form.Control defaultValue={user.weight} placeholder="50" type="text" id="weight" name="weight" required></Form.Control>
          </Form.Group>

          <Form.Select required value={user.gender} name="gender" onChange={getGender} >
            <option value="">Select Gender</option>
            <option value="Man">Man</option>
            <option value="Women">Women</option>
          </Form.Select>

        </Stack>
        <Button variant="success" type="submit">Submit</Button>
      </Form>
    </Container >

  )
}

