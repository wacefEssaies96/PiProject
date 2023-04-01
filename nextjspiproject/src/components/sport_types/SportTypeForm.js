import { postSportType } from "@/services/SportTypeService"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { BiBlock, BiCheck } from "react-icons/bi"
import Select from "react-select"
import Success from "../layouts/SuccessMsg"

export default function SportTypeForm({ sportType }) {
    const [operation, setOperationMode] = useState('Add')
    const router = useRouter()
    const [data, setData] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [subTypes, setSubTypes] = useState([{ value: '', label: '' }])
    const [errorMsg, setErrorMsg] = useState(null)
    const [validated, setValidated] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)
    const [sportTypeTitle, setSportTypetitle] = useState([])
    const [sTADV, setSportTypeADV] = useState([])
    const [subTypesTitles, setSubTypesTitles] = useState({})
    const [advObj, setADVObj] = useState({ titles: '', paragraphes: '' })
    // const [subTArr, setSubTArr] = useState([])

    const submit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)

        let advantages = []
        advantages = e.target.advantages.value.split(", ")
        let parag = advObj.paragraphes.split("., ")
        for (let index = 0; index < parag.length; index++) {
            advantages.push(parag[index])
        }
        advantages.shift()

        const findBySportTypeByTitle = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${e.target.title.value}`)
        const resFindByTitle = await findBySportTypeByTitle.json()

        const selectedSubTypes = data.map(e => ({ title: e.value }))

        if (operation === 'Add') {
            if (resFindByTitle === null) {
                if (form.checkValidity() === true) {
                    await postSportType(e, operation, advantages, selectedSubTypes)
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
            await postSportType(e, operation, advantages, selectedSubTypes)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
                router.push('/admin/sport-type')
            }, 3000)
        }
    }

    // const getSubTypes = async () => {
        // const res = await fetch(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
        // const data = await res.json()
        // let table = data.map(subType => ({ value: subType.title, label: subType.title }))
        // setSubTypes(table)
    // }

    //web scraping
    useEffect(() => {
        fetch(`${process.env.backurl}/api/sportTypes/sportTypesTitle`)
            .then((data) => data.json())
            .then((titles) => {
                setSportTypetitle(titles)
            })
    }, []);

    const sportTypeAdvAndSubType = async (e) => {

        await fetch(`${process.env.backurl}/api/sportSubTypes/sportSubTypesTitle`)
            .then((data) => data.json())
            .then((titles) => {
                setSubTypesTitles(titles)
            })

        const table1 = subTypesTitles.sportSubTypes1 && subTypesTitles.sportSubTypes1.map(subType => ({ value: subType, label: subType }))
        const table2 = subTypesTitles.sportSubTypes2 && subTypesTitles.sportSubTypes2.map(subType => ({ value: subType, label: subType }))
        const table3 = subTypesTitles.sportSubTypes3 && subTypesTitles.sportSubTypes3.map(subType => ({ value: subType, label: subType }))
        const table4 = subTypesTitles.sportSubTypes4 && subTypesTitles.sportSubTypes4.map(subType => ({ value: subType, label: subType }))

        if (e.target.value === "Individual Sports") {
            setSubTypes(table1)
        } else
        if (e.target.value === "Partner Sports") {
            setSubTypes(table2)
        } else
        if (e.target.value === "Team Sports") {
            setSubTypes(table3)
        } else
        if (e.target.value === "Extreme Sports") {
            setSubTypes(table4)
        }

        switch (e.target.value) {
            case "Individual Sports":
                {
                    await fetch(`${process.env.backurl}/api/sportTypes/sportTypesAdvIndiv`)
                        .then((data) => data.json())
                        .then((adv) => {
                            setSportTypeADV(adv)
                        })
                    break;
                }
            case "Partner Sports":
                {
                    await fetch(`${process.env.backurl}/api/sportTypes/sportTypesAdvPartner`)
                        .then((data) => data.json())
                        .then((adv) => {
                            setSportTypeADV(adv)
                        })
                    break;
                }
            case "Team Sports":
                {
                    await fetch(`${process.env.backurl}/api/sportTypes/sportTypesAdvTeam`)
                        .then((data) => data.json())
                        .then((adv) => {
                            setSportTypeADV(adv)
                        })
                    break;
                }
            case "Extreme Sports":
                {
                    await fetch(`${process.env.backurl}/api/sportTypes/sportTypesAdvExtreme`)
                        .then((data) => data.json())
                        .then((adv) => {
                            setSportTypeADV(adv)
                        })
                    break;
                }
        }
    }

    useEffect(() => {
        // getSubTypes()
        if (sportType.title !== '') {
            setOperationMode('Edit')
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowAlertError(false)
        }, 5000);
    }, [showAlertError])

    const passADV = (obj) => {
        setADVObj({
            titles: advObj.titles = advObj.titles + ", " + Object.keys(obj)[0],
            paragraphes: advObj.paragraphes = advObj.paragraphes + ", " + Object.values(obj)[0]
        })
    }

    // const arr1 = sportType.advantages.slice(0, sportType.advantages.length / 2)
    // const arr2 = sportType.advantages.slice(sportType.advantages.length / 2)

    return (
        <div className="container" style={{ padding: "5%" }}>
            {showAlert && <Success message={`Sport Type ${operation}ed Successfully !`}></Success>}
            <Form noValidate validated={validated} onSubmit={submit}>
                <Form.Control defaultValue={sportType._id} name="id" type="hidden" />
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Select Sport Type Title</Form.Label>
                    <Form.Select onChange={sportTypeAdvAndSubType} required defaultValue={sportType.title} name="title" >
                        {sportTypeTitle.map((t, i) => <option key={i}>{t}</option>)}
                    </Form.Select>
                    {!errorMsg && <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>}
                    {showAlertError && (<Alert variant="danger">{errorMsg}</Alert>)}
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport type title !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Advantages</Form.Label>
                    <Form.Control as="textarea" defaultValue={sportType.advantages}  value={advObj.titles} name="advantages" type="text" className="form-control" id="floatingInput" placeholder="Advantages" required />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport sub-type advantages !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="d-flex flex-wrap flex-row justify-content-between">
                    {sTADV && sTADV.map((o, i) =>
                        <Card key={i} style={{ width: '15rem' }}>
                            <Card.Body>
                                <Card.Title>{Object.keys(o)[0]}</Card.Title>
                                <Card.Text>{Object.values(o)[0]}</Card.Text>
                                <Button style={{ backgroundColor: "#dd9933", borderColor: "#dd9933" }} onClick={() => passADV(o)}>Choose this</Button>
                            </Card.Body>
                        </Card>)
                    }
                </Form.Group >
                <Form.Group className="mb-3">
                    <Form.Label>Choose sports subtypes</Form.Label>
                    <Select
                        defaultValue={() => {
                            return sportType.sportSubType.map((element) => {
                                return element && { value: element.title, label: element.title }
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
            </Form >
        </div >
    )
}