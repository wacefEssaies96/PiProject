import { submitEventForm } from "@/services/eventCalendarService"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { BiBlock, BiCheck } from 'react-icons/bi'
import { toast } from 'react-toastify';

export default function EventCalendarForm(props) {
    const [event, setEvent] = useState({
        summary: '',
        description: ''
    })
    const [operationMode, setOperationMode] = useState('Add')
    const [validated, setValidated] = useState(false)
    const router = useRouter()
    const [usersEmails, setUsersEmails] = useState([])
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    };

    const getAllUsers = async () => {
        const res = await fetch(`${process.env.backurl}/api/users/findAll`)
        const data = await res.json()
        return data
    }

    useEffect(() => {
        getAllUsers()
            .then((data) => {
                let table = []
                for (let index = 0; index < data.length; index++) {
                    table.push(data[index].email)
                }
                setUsersEmails(table)
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)

        if (selectedValue != '') {
            const result = await fetch(`${process.env.backurl}/api/users/email/${selectedValue}`)
            const userData = await result.json()
            let userId = userData._id
            console.log(userId);

            if (operationMode === 'Add') {
                if (form.checkValidity() === true) {
                    await submitEventForm(e, operationMode, userId)
                    toast.success('Event is Added Successfully!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    router.push('/admin/event-calendar-sports')
                }

            } else {
                await submitEventForm(e, operationMode, userId)
                toast.success('Event is Updated Successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                router.push('/admin/event-calendar-sports')
            }
        }
    }

    useEffect(() => {
        if (props.Event !== undefined) {
            setEvent(props.Event)
            setSelectedValue(props.email)
            setOperationMode('Update')
        }
    }, [])

    const handleChangeAtt = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    return (
        <div className="container" style={{ padding: "5%" }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Control defaultValue={event._id} name="id" type="hidden" className="form-control" id="floatingInput" />
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">User Email</Form.Label>
                    <Form.Select defaultValue={event._id} aria-label="Default select example" required name="email" value={selectedValue} onChange={handleSelectChange}>
                        <option>Select a user email</option>
                        {usersEmails.length > 0 && usersEmails.map((u, i) => <option key={i} value={u.email}>{u}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please select a user email !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Event Summary</Form.Label>
                    <Form.Control defaultValue={event.summary} required placeholder="Event Summary" value={event.summary} name="summary" onChange={handleChangeAtt} />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter an event summary !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Event Description</Form.Label>
                    <Form.Control defaultValue={event.description} required placeholder="Event Description" value={event.description} name="description" onChange={handleChangeAtt} />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter an event description !
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="success" type="submit">
                    {operationMode} <BiCheck></BiCheck>
                </Button>
                <Link href="/admin/event-calendar-sports" className="btn btn-light" type="submit">
                    Cancel <BiBlock></BiBlock>
                </Link>
            </Form>
        </div>
    )
}