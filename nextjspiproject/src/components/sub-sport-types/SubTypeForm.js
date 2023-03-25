import { submitSubTypeForm } from "@/services/SportSubTypeServices"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { BiBlock, BiCheck } from 'react-icons/bi'
import Success from "../layouts/SuccessMsg"

export default function SportSubTypesForm(props) {
    const [sportSubType, setSportSubType] = useState({
        title: '',
        demoVideo: '',
        advantages: '',
        limits: ''
    })
    const [operationMode, setOperationMode] = useState('Add')
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState(null)
    const [validated, setValidated] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const findByTitle = await fetch(`${process.env.backurl}/api/sportSubTypes/titleSubType/${e.target.title.value}`)
        const resFindByTitle = await findByTitle.json()
        setValidated(true)

        if (resFindByTitle === null) {
            if (form.checkValidity() === true) {
                await submitSubTypeForm(e, operationMode)
                if (!showAlert) {
                    setShowAlert(true)
                    router.push('/admin/sport-sub-type')
                }
            }
        } else {
            if (operationMode === 'Add') {
                setShowAlertError(true)
                setErrorMsg("This sport subtype Title is already existing in DB !")
            }
            await submitSubTypeForm(e, operationMode)
            if (!showAlert) {
                setShowAlert(true)
                router.push('/admin/sport-sub-type')
            }
        }
    }

    useEffect(() => {
        if (props.sportSubType !== undefined) {
            setSportSubType(props.sportSubType)
            setOperationMode('Update')
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000);
    }, [showAlert])

    useEffect(() => {
        setTimeout(() => {
            setShowAlertError(false)
        }, 5000);
    }, [showAlertError])

    return (
        <div className="container" style={{ padding: "5%" }}>
            {showAlert && (<Success message={`Sport SubType ${operationMode}ed Successfully !`}></Success>)}
            <Form encType="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Control defaultValue={sportSubType._id} name="id" type="hidden" className="form-control" id="floatingInput" />
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Sport SubType Title</Form.Label>
                    <Form.Control defaultValue={sportSubType.title} name="title" type="text" className="form-control" id="floatingInput" placeholder="Title" required />
                    {!errorMsg && <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>}
                    {showAlertError && (<Alert variant="danger">{errorMsg}</Alert>)}
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport sub-type title !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">DemoVideo</Form.Label>
                    <Form.Control defaultValue={sportSubType.demoVideo} name="demoVideo" type="file" className="form-control" id="floatingInput" placeholder="DemoVideo" required />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport sub-type demoVideo !
                    </Form.Control.Feedback>
                    {sportSubType.demoVideo &&
                        <video width="320" height="240" controls>
                            <source src={`${process.env.backurl}/${sportSubType.demoVideo}`} />
                            Your browser does not support the video tag.
                        </video>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Advantages</Form.Label>
                    <Form.Control defaultValue={sportSubType.advantages} name="advantages" type="text" className="form-control" id="floatingInput" placeholder="Advantages" required />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport sub-type advantages !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Limits</Form.Label>
                    <Form.Control defaultValue={sportSubType.limits} name="limits" type="text" className="form-control" id="floatingInput" placeholder="Limits" required />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport sub-type limits !
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="success" type="submit">
                    {operationMode} <BiCheck></BiCheck>
                </Button>
                <Link href="/admin/sport-sub-type" className="btn btn-light" type="submit">
                    Cancel <BiBlock></BiBlock>
                </Link>
            </Form>
        </div>
    )
}