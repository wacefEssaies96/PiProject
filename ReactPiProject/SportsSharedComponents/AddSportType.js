import { useEffect, useState } from "react"
import { BiCheck } from 'react-icons/bi'
import Select from "react-select"
import Success from "./SuccessMsg"


export default function AddSportTypesForm(props, context) {

    const [subTypes, setSubTypes] = useState([])
    const [sportType, setSportType] = useState({
        title : '', 
        sportSubType : 
            [{title: '',
             demoVideo: '', 
             advantages: '', 
             limits: '', 
             slug: ''}], 
        slug: ''}) 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title: e.target.title.value,
            sportSubType: e.target.sportSubType.value,
            slug: e.target.slug.value ,
        }

        // if(formData==undefined){
            const res = await fetch(
            `${process.env.backurl}/api/sportTypes/addSportType`, {
            method : 'POST',
            body : JSON.stringify(formData),
            headers : {
                'Content-Type' : 'application/json'
            }
            })
            const json = await res.json()
            if(Object.keys(sportType).length>0) return <Success message={"Sport Type Added Successfully !"}></Success>
        // } else {
        //     const resUpdate = await fetch(
        //     `${process.env.backurl}/api/sportTypes/${context.query.id}`, {
        //     method : 'PUT',
        //     body : JSON.stringify(formData),
        //     headers : {
        //         'Content-Type' : 'application/json'
        //     }
        //     })
        //     const jsonUpdate = await resUpdate.json()
        //     if(Object.keys(sportType).length>0) return <Success message={"Sport Type Updated Successfully !"}></Success>
        // }
    }

    const getAllSubTypes = async () => {
        const res = await fetch(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
        const data = await res.json()
        let table = data.map(subType => ({value:subType.title, label:subType.title}))
        setSubTypes(table)
      }

    useEffect(()=>{
        getAllSubTypes()
        if (props.sportType !== undefined) {
            setSportType(props.sportType)
        }
    },[])

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input value={sportType.title} onChange={setSportType} name="title" type="text" className="form-control" id="floatingInput" placeholder="Title" />
                <label htmlFor="floatingInput">Sport Type Title</label>
            </div>
            <div className="form-floating mb-3">
                <Select
                    value={sportType.sportSubType}
                    id="selectWarna"
                    instanceId="selectSubTypes"
                    isMulti
                    name="subType"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    options={subTypes}
                    onChange={setSportType}
                />
                <label htmlFor="floatingSelect">Choose a sub type</label>
            </div>
            <div className="form-floating mb-3">
                <input value={sportType.slug} onChange={setSportType} name="slug" type="text" className="form-control" id="floatingPassword" placeholder="Slug" />
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
                <button className="btn btn-success" type="submit">
                    Add <BiCheck></BiCheck>
                </button>
            </div>
        </form>
    )
}