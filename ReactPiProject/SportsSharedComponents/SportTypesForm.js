import { useReducer } from "react"
import {BiCheck} from 'react-icons/bi'
import Success from "./SuccessMsg"

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

export default function SportTypesForm() {

    const [formData, setFormData] = useReducer(formReducer, {})

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(formData)
    }

    if(Object.keys(formData).length>0) return <Success message={"Sport Type Added Successfully !"}></Success>

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input onChange={setFormData} name="title" type="text" className="form-control" id="floatingInput" placeholder="Title"/>
                <label htmlFor="floatingInput">Sport Type Title</label>
            </div>
            <div className="form-floating mb-3">
            <select onChange={setFormData} name="subType" className="form-select" id="floatingSelect" aria-label="Floating label select example">
                <option defaultValue>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            <label htmlFor="floatingSelect">Choose a sub type</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={setFormData} name="slug" type="text" className="form-control" id="floatingPassword" placeholder="Slug"/>
                <label htmlFor="floatingPassword">Sport Type Slug</label>
            </div>
            <div className="col-12">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
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
                    Submit <BiCheck></BiCheck>
                </button>
            </div>
        </form>
    )
}