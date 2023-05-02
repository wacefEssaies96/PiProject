import { postSportType } from "@/services/SportTypeService"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Alert, Button, Card, Carousel, Form } from "react-bootstrap"
import { BiBlock, BiCheck } from "react-icons/bi"
import Success from "../layouts/SuccessMsg"
import axios from "axios"

export default function SportTypeForm({ sportType }) {
    const [operation, setOperationMode] = useState('Add')
    const router = useRouter()
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertErrorSubTypes, setShowAlertErrorSubTypes] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [errorMsgSubTypes, setErrorMsgSubTypes] = useState(null)
    const [validated, setValidated] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)
    const [sportTypeTitle, setSportTypetitle] = useState([])
    const [sTADV, setSportTypeADV] = useState([])
    const [sTTitles, setSportSTTitles] = useState([])
    const [subTypesTitles, setSubTypesTitles] = useState({
        sportSubTypes1: [],
        sportSubTypes2: [],
        sportSubTypes3: [],
        sportSubTypes4: []
    })
    const [advObj, setADVObj] = useState({ titles: '', paragraphes: '' })
    const [searchForTitle, setSearchForTitle] = useState([])
    const [sportSubTypesDeFaultValueInput, setSportSubTypesDeFaultValueInput] = useState({ titles: '' })
    const [showError, setShowError] = useState(false)
    const submit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)

        let advantages = []
        let advUpdate = []
        if (operation === 'Add') {
            advantages = e.target.advantages.value.split("/ ")
            advObj.paragraphes.replace('/', '')
            let parag = advObj.paragraphes.split("./ ")
            for (let index = 0; index < parag.length; index++) {
                advantages.push(parag[index])
            }
            advantages.shift()
        } else {
            for (let index = 0; index < sportType.advantages.length; index++) {
                advUpdate.push(sportType.advantages[index])
            }
            let s = e.target.advantages.value.split(".,/ ")
            advUpdate.splice(sportType.advantages.length / 2, 0, s[1])
            let parag = advObj.paragraphes.split("./ ")
            for (let index = 0; index < parag.length; index++) {
                advUpdate.push(parag[index])
            }
        }
        // search for subtypestitle
        let selectedSubTypes = []
        let table = sportSubTypesDeFaultValueInput.titles.split('/ ');
        table.shift();
        table.forEach(async (element) => {
            const response = await axios.get(`${process.env.backurl}/api/sportSubTypes/titleSubType/${element}`)
            console.log(response);
            if (response.data != null) {
                selectedSubTypes.push(response.data)
            }
            else {
                setShowError(true)
            }
        });

        const findBySportTypeByTitle = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${e.target.title.value}`)
        const resFindByTitle = await findBySportTypeByTitle.json()

        if (operation === 'Add') {

            if (resFindByTitle == null) {
                if (form.checkValidity() === true) {
                    let tableST = []
                    if (showError) {
                        setShowAlertErrorSubTypes(true)
                        setErrorMsgSubTypes(`The Sport Sub Type title does not exist in the database !`)
                    }
                    for (let index = 0; index < selectedSubTypes.length; index++) {
                        const findBySportSubTypeByTitle = await fetch(`${process.env.backurl}/api/sportSubTypes/titleSubType/${selectedSubTypes[index].title}`)
                        const resFindByTitleSubType = await findBySportSubTypeByTitle.json()
                        console.log(resFindByTitleSubType);
                        if (resFindByTitleSubType === null) {
                            setShowAlertErrorSubTypes(true)
                            setErrorMsgSubTypes(`The Sport Sub Type title ${selectedSubTypes[index].title} does not exist in the database !`)
                        } else {
                            tableST.push(resFindByTitleSubType)
                        }
                    }
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
            await postSportType(e, operation, advUpdate, selectedSubTypes)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
                router.push('/admin/sport-type')
            }, 3000)
        }
    }

    //web scraping
    useEffect(() => {
        fetch(`${process.env.backurl}/api/sportTypes/sportTypesTitle`)
            .then((data) => data.json())
            .then((titles) => {
                setSportTypetitle(titles)
            })
    }, []);

    const sportTypeAdvAndSubType = async (e) => {

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

        switch (e.target.value) {
            case "Individual Sports":
                {
                    await fetch(`${process.env.backurl}/api/scrapedSportSubTypesTitles/getAllSubSportTypesTitlesScraped`)
                        .then((data) => data.json())
                        .then((dataT) => {
                            setSubTypesTitles(dataT[1].titlesScrapped)
                            setSportSTTitles(dataT[1].titlesScrapped.sportSubTypes1)
                        })
                    break;
                }
            case "Partner Sports":
                {
                    await fetch(`${process.env.backurl}/api/scrapedSportSubTypesTitles/getAllSubSportTypesTitlesScraped`)
                        .then((data) => data.json())
                        .then((dataT) => {
                            setSubTypesTitles(dataT[1].titlesScrapped)
                            setSportSTTitles(dataT[1].titlesScrapped.sportSubTypes2)
                        })
                    break;
                }
            case "Team Sports":
                {
                    await fetch(`${process.env.backurl}/api/scrapedSportSubTypesTitles/getAllSubSportTypesTitlesScraped`)
                        .then((data) => data.json())
                        .then((dataT) => {
                            setSubTypesTitles(dataT[1].titlesScrapped)
                            setSportSTTitles(dataT[1].titlesScrapped.sportSubTypes3)
                        })
                    break;
                }
            case "Extreme Sports":
                {
                    await fetch(`${process.env.backurl}/api/scrapedSportSubTypesTitles/getAllSubSportTypesTitlesScraped`)
                        .then((data) => data.json())
                        .then((dataT) => {
                            setSubTypesTitles(dataT[1].titlesScrapped)
                            setSportSTTitles(dataT[1].titlesScrapped.sportSubTypes4)
                        })
                    break;
                }
        }

    }

    useEffect(() => {
        if (sportType.title !== '') {
            setOperationMode('Edit')
            sportType.sportSubType.forEach(element => {
                setSportSubTypesDeFaultValueInput({ titles: sportSubTypesDeFaultValueInput.titles + "/ " + element.title })
            })
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowAlertError(false)
        }, 10000);
    }, [showAlertError])

    useEffect(() => {
        setTimeout(() => {
            setShowAlertErrorSubTypes(false)
        }, 10000);
    }, [showAlertErrorSubTypes])

    const passADV = (obj) => {
        setADVObj(prevObj => {
            if (!prevObj.titles.includes(Object.keys(obj)[0])) {
                return {
                    ...prevObj,
                    titles: advObj.titles = advObj.titles + "/ " + Object.keys(obj)[0],
                    paragraphes: advObj.paragraphes = advObj.paragraphes + "/ " + Object.values(obj)[0]
                }
            } else {
                return prevObj
            }
        })
    }
    const removeFromInput = (mode, title) => {
        if (mode === "Advantages") {
            if (advObj.titles.search(title) !== -1) {
                let str1 = advObj.titles.substring(0, advObj.titles.search(title) - 2)
                let str2 = advObj.titles.substring(title.length + advObj.titles.search(title), advObj.titles.length)
                console.log(str1, str2)
                setADVObj({ titles: str1 + str2 })
                console.log(advObj.titles);
            }
        } else {
            if (sportSubTypesDeFaultValueInput.titles.search(title) !== -1) {
                let str1 = sportSubTypesDeFaultValueInput.titles.substring(0, sportSubTypesDeFaultValueInput.titles.search(title) - 2)
                let str2 = sportSubTypesDeFaultValueInput.titles.substring(title.length + sportSubTypesDeFaultValueInput.titles.search(title), sportSubTypesDeFaultValueInput.titles.length)
                console.log(str1, str2)
                setSportSubTypesDeFaultValueInput({ titles: str1 + str2 })
                console.log(sportSubTypesDeFaultValueInput.titles);
            }
        }
    }
    const passSportSubTypes = async (title) => {
        console.log("work");
        setSportSubTypesDeFaultValueInput(prevObj => {
            if (!prevObj.titles.includes(title)) {
                return {
                    titles: prevObj.titles = prevObj.titles + "/ " + title,
                }
            } else {
                return prevObj
            }
        })
    }
console.log(sportSubTypesDeFaultValueInput);
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
                    {operation === 'Edit' ? <Form.Control as="textarea" defaultValue={[sportType.advantages, advObj.titles]} name="advantages" type="text" className="form-control" id="floatingInput" placeholder="Advantages" required>
                    </Form.Control> :
                        <Form.Control as="textarea" value={advObj.titles} name="advantages" type="text" className="form-control" id="floatingInput" placeholder="Advantages" required>
                        </Form.Control>
                    }
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter sport sub-type advantages !
                    </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group className="d-flex flex-wrap flex-row justify-content-between">
                    {sTADV && sTADV.map((o, i) =>
                        <Card key={i} style={{ width: '15rem' }}>
                            <Card.Body>
                                <Card.Title>{Object.keys(o)[0]}</Card.Title>
                                <Card.Text>{Object.values(o)[0]}</Card.Text>
                                <Button style={{ backgroundColor: "#dd9933", borderColor: "#dd9933" }} onClick={() => passADV(o)}>Choose this</Button>
                                <Button style={{ backgroundColor: "#dd9933", borderColor: "#dd9933" }} onClick={() => removeFromInput("Advantages", Object.keys(o)[0])}>Remove</Button>

                            </Card.Body>
                        </Card>)
                    }
                </Form.Group > */}
                <Form.Group>
                    <Carousel variant="dark">
                        {sTADV && sTADV.map((o, i) =>
                            <Carousel.Item key={i}>
                                <Card style={{ width: '50%', marginLeft:"25%", height:"10%"}}>
                                    <Card.Body>
                                        <Card.Title>{Object.keys(o)[0]}</Card.Title>
                                        <Card.Text>{Object.values(o)[0]}</Card.Text>
                                        <Button style={{ backgroundColor: "#dd9933", borderColor: "#dd9933" }} onClick={() => passADV(o)}>Choose this</Button>
                                        <Button style={{ backgroundColor: "#dd9933", borderColor: "#dd9933" }} onClick={() => removeFromInput("Advantages", Object.keys(o)[0])}>Remove</Button><br/><br/><br/>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>)}
                    </Carousel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Choose sports subtypes</Form.Label>
                    {operation === 'Edit'
                        ? <Form.Control as="textarea" defaultValue={sportSubTypesDeFaultValueInput.titles} name="sportSubType" type="text" className="form-control" id="floatingInput" placeholder="SportSubTypes" required></Form.Control>
                        : <Form.Control as="textarea" value={sportSubTypesDeFaultValueInput.titles} name="sportSubType" type="text" className="form-control" id="floatingInput" placeholder="sportSubTypes" required></Form.Control>
                    }
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter sport sub-types !
                    </Form.Control.Feedback>
                    {/* <Form.Group className="d-flex flex-wrap flex-row justify-content-between">
                        {sTTitles && sTTitles.map((t, i) =>
                            <Card key={i} style={{ width: '15rem' }}>
                                <Card.Body>
                                    <Card.Title>{t}</Card.Title>
                                    <Button style={{ backgroundColor: "#dd9933", borderColor: "#dd9933" }} onClick={() => passSportSubTypes(t)}>Choose this</Button>
                                </Card.Body>
                            </Card>)
                        }
                    </Form.Group > */}
                    {showError && (<Alert variant="danger">{errorMsgSubTypes}</Alert>)}
                    {showAlertErrorSubTypes && (<Alert variant="danger">{errorMsgSubTypes}</Alert>)}
                    <Form.Control.Feedback type='invalid'>
                        Please select sport subtypes !
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Carousel variant="dark">
                        {sTTitles && sTTitles.map((t, i) =>
                            <Carousel.Item key={i}>
                                <Card style={{ width: '25%', marginLeft:"35%", height:"10%"}}>
                                    <Card.Body>
                                        <Card.Title>{t}</Card.Title>
                                        <Button style={{ backgroundColor: "#dd9933", borderColor: "#dd9933" }} onClick={() => passSportSubTypes(t)}>Choose this</Button>
                                        <Button style={{ backgroundColor: "#dd9933", borderColor: "#dd9933" }} onClick={() => removeFromInput("SubTypes", t)}>Remove</Button><br/><br/><br/>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>)}
                    </Carousel>
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