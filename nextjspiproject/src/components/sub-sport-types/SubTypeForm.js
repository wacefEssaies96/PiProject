import { submitSubTypeForm } from "@/services/SportSubTypeServices"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Form, Accordion } from "react-bootstrap"
import { BiBlock, BiCheck } from 'react-icons/bi'
import { toast } from 'react-toastify';

export default function SportSubTypesForm(props) {
    const [sportSubType, setSportSubType] = useState({
        title: '',
        demoVideo: '',
        definitionHistory: ''
    })
    const [operationMode, setOperationMode] = useState('Add')
    const router = useRouter()
    const [validated, setValidated] = useState(false)
    const [sportSubTypeTitle, setSportSubTypetitle] = useState({})
    const [sportSubTypeDef, setSportSubTypeDef] = useState({ history: [] })
    const [checkSport, setCheckSport] = useState(false);
    const [arr, setArr] = useState([])
    const [sportTypeTitle, setSportTypeTitle] = useState('')
    const [editVid, setEditVid] = useState(false)

    //web scraping
    useEffect(() => {
        fetch(`${process.env.backurl}/api/scrapedSportSubTypesTitles/getAllSubSportTypesTitlesScraped`)
            .then((data) => data.json())
            .then((dataT) => {
                setSportSubTypeDef(dataT[0].historyScrapped)
                setSportSubTypetitle(dataT[1].titlesScrapped)
            })
    }, []);

    const handleChange = (e) => {
        setCheckSport(e.target.checked)
        setSportTypeTitle(`${e.target.name} Sports`)
        switch (e.target.name) {
            case "Individual": {
                setArr(sportSubTypeTitle.sportSubTypes1)
                break;
            }
            case "Partner": {
                setArr(sportSubTypeTitle.sportSubTypes2)
                break;
            }
            case "Team": {
                setArr(sportSubTypeTitle.sportSubTypes3)
                break;
            }
            case "Extreme": {
                setArr(sportSubTypeTitle.sportSubTypes4)
                break;
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const findByTitle = await fetch(`${process.env.backurl}/api/sportSubTypes/titleSubType/${e.target.title.value}`)
        const resFindByTitle = await findByTitle.json()
        setValidated(true)

        if (resFindByTitle === null) {
            if (form.checkValidity() === true) {
                await submitSubTypeForm(e, operationMode)
                toast.success('Sport SubType Added Successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                router.push('/admin/sport-sub-type')
            }
        } else {
            if (operationMode === 'Add') {
                toast.error('This sport subtype Title is already existing in DB !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            await submitSubTypeForm(e, operationMode)
            toast.success('Sport SubType Updated Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            router.push('/admin/sport-sub-type')
        }
    }

    useEffect(() => {
        if (props.sportSubType !== undefined) {
            setSportSubType(props.sportSubType)
            setOperationMode('Update')
        }
    }, [])

    const handleChangeAtt = (e) => {
        setSportSubType({ ...sportSubType, [e.target.name]: e.target.value })
    }

    const handleDemoVideo = (e) => {
        setSportSubType({ ...sportSubType, demoVideo: e.target.files[0] })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }

    const handleClick = () => {
        console.log("hi");
        setEditVid(true)
    }

    return (
        <div className="container" style={{ padding: "5%" }}>
            <h2>{sportTypeTitle}</h2>
            <Form encType="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Control defaultValue={sportSubType._id} name="id" type="hidden" className="form-control" id="floatingInput" />
                <div className='d-flex justify-content-evenly' style={{ margin: "5%" }}>
                    <Form.Check
                        name="Individual"
                        type="switch"
                        id="custom-switch"
                        label="Individual Sports"
                        disabled={checkSport}
                        onChange={handleChange}
                    />
                    <Form.Check
                        name="Partner"
                        type="switch"
                        id="custom-switch"
                        label="Partner Sports"
                        disabled={checkSport}
                        onChange={handleChange}
                    />
                    <Form.Check
                        name="Team"
                        type="switch"
                        id="custom-switch"
                        label="Team Sports"
                        disabled={checkSport}
                        onChange={handleChange}
                    />
                    <Form.Check
                        name="Extreme"
                        type="switch"
                        id="custom-switch"
                        label="Extreme Sports"
                        disabled={checkSport}
                        onChange={handleChange}
                    />
                </div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Sport SubType Title</Form.Label>
                    {operationMode === "Add" ? <Form.Select required value={sportSubType.title} name="title" onChange={handleChangeAtt}>
                        <option value="">Select Soprt SubType Title</option>
                        {arr && arr.map((t, i) => <option value={t} key={i}>{t}</option>)}
                    </Form.Select> :
                        <Form.Select readOnly value={props.sportSubType.title} name="title" onChange={handleChangeAtt}>
                            <option>{props.sportSubType.title}</option>
                        </Form.Select>}
                </Form.Group>
                {!editVid && <Form.Control value={props.sportSubType.demoVideo} type="text" />}
                <Button onClick={handleClick}>Edit Video</Button>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">DemoVideo</Form.Label>
                    <Form.Control disabled={!editVid} defaultValue={sportSubType.demoVideo} name="demoVideo" type="file" className="form-control" id="floatingInput" placeholder="DemoVideo" required onChange={handleDemoVideo} />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport sub-type demoVideo !
                    </Form.Control.Feedback>
                    {sportSubType.demoVideo &&
                        <>
                            <video width="320" height="240" controls>
                                <source src={`${process.env.backurl}/${sportSubType.demoVideo}`} />
                                Your browser does not support the video tag.
                            </video>
                        </>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="floatingInput">Definition History</Form.Label>
                    <Form.Control value={sportSubType.definitionHistory} name="definitionHistory" type="text" className="form-control" id="floatingInput" placeholder="Definition and History of this sport sub type" required onChange={handleChangeAtt} />
                    <Form.Control.Feedback type="valid">
                        You did it!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        Please enter a sport sub-type Definition and History !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    {sportSubTypeDef.history.length > 0 && sportSubTypeDef.history.map((e, i) =>
                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Paragraphe {i}</Accordion.Header>
                                <Accordion.Body>
                                    {e}
                                    <Button variant="success" onClick={() => copyText(e)}>Copy Text</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )}
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