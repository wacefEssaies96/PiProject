import Success from "@/components/layouts/SuccessMsg"
import { resetPassword } from "@/services/resetPasswordService"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Container, Form, Stack } from "react-bootstrap"

export default function resetPass(props) {

    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()
    const [validated, setValidated] = useState(false)
    const { userId, token } = router.query
    const [ passConfirmMsg, setPassConfirmMsg] = useState('')

    const handleResetPassword = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        // console.log(userId, token)
        const password1 = e.target.password1.value
        // const password2 = e.target.password2.value
        if (password1.length!=0){
            // if (password1 !== password2) {
            //     setPassConfirmMsg("Passwords Don't Match")
            //     console.log(passConfirmMsg)
            // } else {
            //     // setPassConfirmMsg("")
            //     // await resetPassword(e)
            // }
            if (form.checkValidity() === true) {
                console.log("working")
                await resetPassword(e,userId,token)
                // router.push("/")
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000);
    }, [showAlert])

    return (
        <Container>
            {showAlert && (<Success message={'Password reseted succsefully!'}></Success>)}
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
                    {/* <Form.Group>
                        <Form.Label htmlFor="password">Confirm Password</Form.Label>
                        <Form.Control placeholder="Confirm new password" type="password" name="password2" required minLength={8}></Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please confirm your new password, Password minLength is 8
                            {passConfirmMsg}
                        </Form.Control.Feedback>
                    </Form.Group> */}
                </Stack><br/>
                <Button type="submit" className="btn btn-lg btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button">Submit</Button>
            </Form><br/>
        </Container>
    )
}