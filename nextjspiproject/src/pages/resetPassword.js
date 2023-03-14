import { resetPassword } from "@/services/resetPasswordService"
import { useRouter } from "next/router"
import { useState } from "react"
import { Alert, Button, Container, Form, Stack } from "react-bootstrap"

export default function resetPass() {

    const [show, setShow] = useState(false)
    const router = useRouter()
    const [validated, setValidated] = useState(false)
    const { userId, token } = router.query

    const handleResetPassword = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        const password1 = e.target.password1.value
        if (password1.length != 0) {
            if (form.checkValidity() === true) {
                await resetPassword(e, userId, token)
                setShow(true)
            }
        }
    }

    return (
        <Container>
            {show && <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Your password is changed with success !</Alert.Heading>
            </Alert>}
            <h3>Change Password</h3>
            <Form noValidate validated={validated} onSubmit={handleResetPassword}>
                <Stack gap={4}>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control placeholder="New password" type="password" name="password1" required minLength={8}></Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please enter your new password, Password minLength is 8
                        </Form.Control.Feedback>
                    </Form.Group>
                </Stack><br />
                <Button type="submit" className="btn btn-lg btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button">Submit</Button>
            </Form><br />
        </Container>
    )
}