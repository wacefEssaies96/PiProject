import { postSportType } from "@/services/SportTypeService"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { BiBlock, BiCheck } from "react-icons/bi"
import Select from "react-select"
import Success from "../layouts/SuccessMsg"

export default function SportTypeForm({ sportType }) {
    const [operation, setOperationMode] = useState('Add')
    const router = useRouter()
    const [data, setData] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [subTypes, setSubTypes] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const [validated, setValidated] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)

        const findBySportTypeByTitle = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${e.target.title.value}`)
        const resFindByTitle = await findBySportTypeByTitle.json()

        const selectedSubTypes = data.map(e => ({ title: e.value }))

        if (operation === 'Add') {
            if (resFindByTitle === null) {
                if (form.checkValidity() === true) {
                    // const subTypesList = selectedSubTypes.map(
                    //     async (subTypeTitle) => {
                    //         const res = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${subTypeTitle.title}`)
                    //         const data = await res.json()
                    //         return data
                    //     })
                    // const sportType = {
                    //     title: e.target.title.value,
                    //     sportSubType: subTypesList
                    // }
                    await postSportType(e, operation, selectedSubTypes)
                    setShowAlert(true)
                    setTimeout(() => {
                        setShowAlert(false)
                        router.push('/admin/sport-type')
                    }, 3000)
                }
            } else {
                setShowAlertError(true)
                setErrorMsg("This Sport Type title already existes in the database !")
            }
        } else {
            e.preventDefault()
            await postSportType(e, operation, selectedSubTypes)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
                router.push('/admin/sport-type')
            }, 3000)
        }
    }

    const getSubTypes = async () => {
        const res = await fetch(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
        const data = await res.json()
        let table = data.map(subType => ({ value: subType.title, label: subType.title }))
        setSubTypes(table)
    }

    useEffect(() => {
        getSubTypes()
        if (sportType.sportSubType.length > 0) {
            setOperationMode('Edit')
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowAlertError(false)
        }, 5000);
    }, [showAlertError])

    return (
        <div className="container" style={{ padding: "5%" }}>
            {showAlert && <Success message={`Sport Type ${operation}ed Successfully !`}></Success>}
            <Form noValidate validated={validated} onSubmit={submit}>
                <Form.Group className="mb-3">
                    <Form.Control defaultValue={sportType._id} name="id" type="hidden" />
                    <Form.Label htmlFor="floatingInput">Sport Type Title</Form.Label>
                    <Form.Control defaultValue={sportType.title} required name="title" type="text" className="form-control" id="floatingInput" placeholder="Title" />
                    {!errorMsg && <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>}
                    {showAlertError && (<Alert variant="danger">{errorMsg}</Alert>)}
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport type title !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Choose sports subtypes</Form.Label>
                    <Select
                        defaultValue={() => {
                            return sportType.sportSubType.map((element) => {
                                return { value: element.title, label: element.title }
                            })
                        }}
                        id="selectWarna"
                        instanceId="selectSubTypes"
                        isMulti
                        className="basic-multi-select"
                        classNamePrefix="select"
                        options={subTypes}
                        onChange={(data) => setData(data)}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please select sport subtypes !
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="success" type="submit">
                    {operation} <BiCheck></BiCheck>
                </Button>
                <Link href="/admin/sport-type" className="btn btn-light" type="submit">
                    Cancel <BiBlock></BiBlock>
                </Link>
            </Form>
        </div>
    )
}