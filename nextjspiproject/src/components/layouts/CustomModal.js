import React, { useState } from 'react'
import { Modal, Button, Form, Stack } from "react-bootstrap";

const CustomModal = ({ showModal, hideModal, confirmModal, id, type, message, alertEmail }) => {

  const [email, setEmail] = useState(null)
  const [validated, setValidated] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailInput = e.currentTarget
    const findByUserEmail = await fetch(`${process.env.backurl}/api/users/email/${email}`)
    const resFindByEmail = await findByUserEmail.json()
    setValidated(true)

    if (resFindByEmail.email != undefined) {
      if (emailInput.checkValidity() === true) {
        try {
          const res = await fetch(`${process.env.backurl}/api/send-reset-link`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email
            }),
          })
          const response = await res.json()
          if (!response.error) {
            hideModal()
            alertEmail()
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setErrorMsg("This email is not found ! Please enter an existing one.")
    }
  }
  return (
    <Modal show={showModal} onHide={hideModal}>

      <Modal.Header closeButton>
        {id !== null ? <Modal.Title>Delete Confirmation</Modal.Title> : <Modal.Title>Reset Password</Modal.Title>}
      </Modal.Header>
      {id !== null ? <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body> :
        <Modal.Body>
          <div className="alert alert-success">{message}</div>
          <Form noValidate validated={validated}>
            <Stack gap={4}>
              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control placeholder="name@example.com" type="text" name="email" required onChange={e => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"></Form.Control>
                {!errorMsg && <Form.Control.Feedback type="valid">
                  You did it!
                </Form.Control.Feedback>}
                <Form.Control.Feedback style={{ color: "#b22222" }}>{errorMsg}</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  {'This email appears to be incomplete or it could not be found !'}
                </Form.Control.Feedback>
              </Form.Group>
            </Stack>
          </Form>
        </Modal.Body>}
      <Modal.Footer>
        <Button variant="light" onClick={hideModal}>
          Cancel
        </Button>
        {id !== null ? <Button variant="danger" onClick={() => confirmModal(id)}>
          Delete
        </Button> :
          <Button variant="success" type="submit" onClick={handleSubmit}>Submit</Button>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal;