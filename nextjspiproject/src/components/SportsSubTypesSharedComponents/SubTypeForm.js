import { submitSubTypeForm } from "@/services/SportSubTypeServices"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BiBlock, BiCheck } from 'react-icons/bi'
import Success from "../layouts/SuccessMsg"
// import Bug from "SportsSharedComponents/bugMsg"
// import { submitSubTypeForm } from "SportsSharedComponents/SportServices/SportSubTypeServices"
// import Success from "SportsSharedComponents/SuccessMsg"

export default function SportSubTypesForm(props) {
    const [sportSubType, setSportSubType] = useState({
        title: '',
        demoVideo: '',
        advantages: '',
        limits: ''
    })
    const [operationMode, setOperationMode] = useState('Add')
    const [showAlert, setShowAlert] = useState(false)
    const [bugAlert, setBugAlert] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await submitSubTypeForm(e, operationMode)
        if (!showAlert) {
            setShowAlert(true)
            router.push('/admin/sport-sub-type')
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
            setBugAlert(false)
        }, 2000);
    }, [bugAlert])

    return (
        <form onSubmit={handleSubmit}>
            {showAlert && (<Success message={`Sport SubType ${operationMode}ed Successfully !`}></Success>)}
            {/* {bugAlert && (<Bug message={"Error while adding a sub type !"}></Bug>)} */}
            <div className="form-floating mb-3">
                <input defaultValue={sportSubType._id} name="id" type="hidden" className="form-control" id="floatingInput" />
                <input defaultValue={sportSubType.title} name="title" type="text" className="form-control" id="floatingInput" placeholder="Title" />
                <label htmlFor="floatingInput">Sport SubType Title</label>
            </div>
            <div className="form-floating mb-3">
                <input defaultValue={sportSubType.demoVideo} name="demoVideo" type="text" className="form-control" id="floatingInput" placeholder="DemoVideo" />
                <label htmlFor="floatingInput">DemoVideo</label>
            </div>
            <div className="form-floating mb-3">
                <input defaultValue={sportSubType.advantages} name="advantages" type="text" className="form-control" id="floatingInput" placeholder="Advantages" />
                <label htmlFor="floatingInput">Advantages</label>
            </div>
            <div className="form-floating mb-3">
                <input defaultValue={sportSubType.limits} name="limits" type="text" className="form-control" id="floatingInput" placeholder="Limits" />
                <label htmlFor="floatingInput">Limits</label>
            </div>
            <div className="col-12">
                <button className="btn btn-success" type="submit">
                    {operationMode} <BiCheck></BiCheck>
                </button>
                <Link href="/admin/sport-sub-type" className="btn btn-light" type="submit">
                    Cancel <BiBlock></BiBlock>
                </Link>
            </div>
        </form>
    )
}