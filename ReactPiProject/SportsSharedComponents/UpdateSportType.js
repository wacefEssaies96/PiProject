import { useEffect, useReducer, useState } from "react"
import { BiBrush } from 'react-icons/bi'
import Success from "./SuccessMsg"
import Select from "react-select"

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

export default function UpdateSportTypesForm() {

    const [formData, setFormData] = useReducer(formReducer, {})
    const [subTypes, setSubTypes] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    const getAllSubTypes = async () => {
        const res = await fetch(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
        const data = await res.json()
        let table = data.map(subType => ({value:subType.title, label:subType.title}))
        setSubTypes(table)
      }

    useEffect(()=>{
        getAllSubTypes()
    },[])

    //if(Object.keys(formData).length>0) return <Success message={"Sport Type Added Successfully !"}></Success>

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input onChange={setFormData} name="title" type="text" className="form-control" id="floatingInput" placeholder="Title" />
                <label htmlFor="floatingInput">Sport Type Title</label>
            </div>
            <div className="form-floating mb-3">
                <Select
                    id="selectWarna"
                    instanceId="selectSubTypes"
                    isMulti
                    name="subType"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    options={subTypes}
                    onChange={setFormData}
                />
                <label htmlFor="floatingSelect">Choose a sub type</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={setFormData} name="slug" type="text" className="form-control" id="floatingPassword" placeholder="Slug" />
                <label htmlFor="floatingPassword">Sport Type Slug</label>
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
                <button className="btn btn-warning" type="submit">
                    Update <BiBrush></BiBrush>
                </button>
            </div>
        </form>
    )
}