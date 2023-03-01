import Link from "next/link"
import { useEffect, useState } from "react"
import { BiBlock, BiCheck } from 'react-icons/bi'
import Bug from "SportsSharedComponents/bugMsg"
import { submitSubTypeForm } from "SportsSharedComponents/SportServices/SportSubTypeServices"
import Success from "SportsSharedComponents/SuccessMsg"

export default function SportSubTypesForm(props) {

    const [sportSubType, setSportSubType] = useState({
        title : '', 
        demoVideo : '',
        advantages : '',
        limits : '',
        slug: ''}) 
    const [operationMode, setOperationMode] = useState('Add')
    const [showAlert, setShowAlert] = useState(false)
    const [bugAlert, setBugAlert] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await submitSubTypeForm(e, operationMode)
        if (!showAlert) {
            setShowAlert(true)
        }
    }

    useEffect(() => {
        if (props.sportSubType !== undefined) {
            setSportSubType(props.sportSubType)
            setOperationMode('Update')
        }
    }, [])

    useEffect(()=> {
        setTimeout(() => {
            setShowAlert(false)
            }, 2000);
    }, [showAlert])

    useEffect(()=> {
        setTimeout(() => {
            setBugAlert(false)
            }, 2000);
    }, [bugAlert])

    return (
        <form onSubmit={handleSubmit}>
            {showAlert && (<Success message={`Sport SubType ${operationMode}ed Successfully !`}></Success>)}
            {bugAlert && (<Bug message={"Error while adding a sub type !"}></Bug>)}
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
            <div className="form-floating mb-3">
                <input defaultValue={sportSubType.slug} name="slug" type="text" className="form-control" id="floatingPassword" placeholder="Slug" />
                <label htmlFor="floatingPassword">Sport SubType Slug</label>
            </div>
            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                    <label className="form-check-label" htmlFor="invalidCheck">
                        Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                        You must agree before submitting.
                    </div>
                </div>
            </div>
            <div className="col-12">
                <button className="btn btn-success" type="submit">
                    {operationMode} <BiCheck></BiCheck>
                </button>
                <Link href="/Back-Office-SubType" className="btn btn-light" type="submit">
                    Cancel <BiBlock></BiBlock>
                </Link>
            </div>
        </form>
    )
}