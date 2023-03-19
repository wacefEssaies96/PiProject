import { postSportType } from "@/services/SportTypeService"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BiBlock, BiCheck } from "react-icons/bi"
import Select from "react-select"
import Success from "../layouts/SuccessMsg"

export default function SportTypeForm({sportType}) {
    const [operation, setOperationMode] = useState('Add')
    const router = useRouter()
    const [data, setData] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [subTypes, setSubTypes] = useState([])

    const submit = async (e) => {
        e.preventDefault()
        const selectedSubTypes = data.map(e => ({ title: e.value }))
        const subTypesList = selectedSubTypes.map(
            async (subTypeTitle) =>{ 
            const res = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${subTypeTitle.title}`)
            const data = await res.json()
            return data
            })
        console.log(subTypesList)
        const sportType = {
            title: e.target.title.value,
            sportSubType: subTypesList
        }
        await postSportType(e, operation, selectedSubTypes)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            router.push('/admin/sport-type')
        }, 3000)
    }

    const getSubTypes = async () => {
        const res = await fetch(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
        const data = await res.json()
        let table = data.map(subType => ({ value: subType.title, label: subType.title }))
        setSubTypes(table)
    }

    useEffect(() => {
        getSubTypes()
        if (sportType.sportSubType.length >0) {
            setOperationMode('Edit')
        }
    }, [])

    return (
        <form onSubmit={submit}>
            {showAlert && <Success message={"Sport Type Added Successfully !"}></Success>}
            <div className="form-floating mb-3">
                <input defaultValue={sportType._id} name="id" type="hidden" />
                <input defaultValue={sportType.title} name="title" type="text" className="form-control" id="floatingInput" placeholder="Title" />
                <label htmlFor="floatingInput">Sport Type Title</label>
            </div>
            <div className="form-floating mb-3">
                <h5>Choose sports subtypes : </h5>
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
                />
            </div>
            <div className="col-12">
                <button className="btn btn-success" type="submit">
                    {operation} <BiCheck></BiCheck>
                </button>
                <Link href="/admin/sport-type" className="btn btn-light" type="submit">
                    Cancel <BiBlock></BiBlock>
                </Link>
            </div>
        </form>
    )
}