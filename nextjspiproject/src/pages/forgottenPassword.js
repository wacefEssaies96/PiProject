import { Button, Container, Form, Stack } from "react-bootstrap"
import { useState } from "react"

export default function forgottenPassword() {

  const [email, setEmail] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email) {
      await fetch(`${process.env.backurl}/api/send_recovery_email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient_email: email
        }),
      })

      console.log('an email is sent to you ! check it please')
    }
  }
  return (
    <Container>
      <h3>Forgot Password</h3>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control placeholder="name@example.com" type="text" id="email" name="email" required onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
        </Stack>
        <Button variant="success" type="submit">Submit</Button>
      </Form>
    </Container>
  )
}