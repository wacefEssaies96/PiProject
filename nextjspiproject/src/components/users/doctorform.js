import {submitDoctor} from "@/services/doctor.js"
import { useRouter } from "next/router";
import { useState } from "react";
import{Button,Container, Form,Stack} from "react-bootstrap"
export default function DoctorsForm(props){
    const router=useRouter()

    const [operationMode, setOperationMode]= useState('Create')
    const [doctor, setDoctor]= UseState({
        fullName:"",
        email : "",
        role: "",
        gender: "",
        phone:0,
        address:"",
        speciality:"",


    })

    const [validated, setValidated]= useState(false);
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const form= event.currentTarget;
        setValidated(true);
        //await registerDoctor(event, operationMode)
          if(form.checkValidity()===true){
            console.log('working');
            router.push('/doctor')
          }
    }
    useEffect(()=>{
        if(props.doctor!==undefined){
            setRegisterData(props.doctor)
            setOperationMode('Update')
        }
    }, [])
    useEffect(()=>{
        setShowAlert(false)
    }, [ShowAlert])
    return(
        <>
        {ShowAlert && (<Sucess message={'Welcome to our health Spotlight App!'}></Sucess>)}
        <div id="inner_header" className="inner-page-banner" style={{}}>
            <div className="container">
                <div className="inner_intro text-center">
                    <h1>Register a doctor </h1>
                    <div className="breadcrumb">
                        <ul className="pagination-inner">
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            {operationMode === 'Add' ?
                                <li className="breadcrumb-item active" aria-current="page">
                                    Register
                                </li> :
                                <li className="breadcrumb-item active" aria-current="page">
                                    Edit Profile
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row no-gutter">
                <div className="col-md-12">
                    <div className="register py-5">
                        <div className="row">
                            <div className="offset-lg-3 col-lg-6  mx-auto d-block login-page">
                                <div className="register_form_heading">
                                    <p className="sub_title">
                                        Already have an account?
                                        <Link className="color-litegreen" href="/login">
                                            Login here!
                                        </Link>
                                    </p>
                                </div>
                                <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-horizontal registraion-form">
                                    {operationMode === 'Add' ? <h2>Sign up</h2> : <h2>Edit Profile</h2>}

                                    <Form.Control defaultValue={registerData._id} name="id" type="hidden"></Form.Control>
                                    <Form.Group className="mb-3">
                                        <Form.Label>FullName</Form.Label>
                                        <Form.Control id="vb_name" defaultValue={registerData.fullname} name="fullName" type="text" placeholder="FullName" required minLength={4} maxLength={15} />
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your fullname, fullname length must be at least 4 caracteres and at most 15 caracters'}
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control defaultValue={registerData.email} name="email" type="email" placeholder="name@example.com" required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-z]{2,8}' />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your email address'}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control name="password" type="password" placeholder="Password" required minLength={8} />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your password, password minLength is 8'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control defaultValue={registerData.phone} name="phone" type="number" placeholder="Phone Number" required minLength={8} />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your phone number'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control defaultValue={registerData.address} name="address" type="text" placeholder="Address" required />
                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            {'Please enter your address'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Gender</Form.Label>
                                        <div className="mb-3">
                                            <Form.Select className="form-control" defaultValue={registerData.gender} name="gender" aria-label="Default select example" required>
                                                <option value="">Select your gender</option>
                                                <option value="1">Female</option>
                                                <option value="2">Male</option>
                                            </Form.Select>
                                        </div>

                                        <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            Please select your gender
                                        </Form.Control.Feedback>


                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                        
                                        <Form.Label>speciality</Form.Label>
                                        <div className="mb-3">
                                            <Form.Select className="form-control" defaultValue={registerData.speciality} name="speciality" aria-label="Default select example" required>
                                                <option value="">Select your speciality </option>
                                                <option value="1">Family medicine</option>
                                                <option value="2">Internal Medicine</option>
                                                <option value="3">Pediatrician</option>
                                                <option value="4">Obstetricians/gynecolo</option>
                                                <option value="5">gist (OBGYNs)</option>
                                                <option value="6">Cardiologist</option>
                                                <option value="7">Oncologist</option>
                                                <option value="8">Gastroenterologist</option>
                                                <option value="9">Pulmonologist</option>
                                                <option value="10">Infectious disease</option>
                                                <option value="11">Nephrologist</option>
                                                <option value="12">Endocrinologist</option>
                                                <option value="13">Ophthalmologist</option>
                                                <option value="14">Otolaryngologist</option>
                                                <option value="15">Dermatologist</option>
                                                <option value="16">Psychiatrist</option>
                                                <option value="17">Neurologist</option>
                                                <option value="18">Radiologist</option>
                                                <option value="19">Anesthesiologist</option>
                                                <option value="20">Surgeon</option>
                                                <option value="21">Physician executive</option>
                                                
                                         </Form.Select>
                                         </div>
                                         <Form.Control.Feedback type="valid">
                                            You did it!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type='invalid'>
                                            Please select your gender
                                        </Form.Control.Feedback>

                                        </Form.Group>
                                        <Button variant="success" type="submit" className="btn btn-lg btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button">Submit</Button>
                                     </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



                                        


        
        
        </>
    )
 

}