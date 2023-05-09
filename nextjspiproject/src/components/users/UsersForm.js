import { submitUser } from "@/services/user";
import Link from "next/link";
import { useEffect, useState } from "react"
import { Button, Container, Form, Row, Col, Stack, Alert } from "react-bootstrap"

export default function UsersForm(props) {

  const [operationMode, setOperationMode] = useState(props.operationMode)
  const [user, setUser] = useState({
    id:"",
    image: "",
    fullname: "",
    email: "",
    role: "",
    phone: "",
    // dateOfBirth: "",
    height: "",
    weight: "",
    gender: "",
    address: "",
    disease: "",
    speciality: "",
  })
  const [validated, setValidated] = useState(false);

  const [imageSrc, setImageSrc] = useState(`${process.env.backurl}/uploads/User/altUser.png`)
  
  const handleImageChange = (event) => {
    if (event.target.files[0])
      setImageSrc(URL.createObjectURL(event.target.files[0]))
    else
      setImageSrc('')
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === true) {
      await submitUser(event, operationMode)
    }
  }

  const getRole = async (event) => {
    if (event.target)
    setUser({ ...props.user, 'role': event.target.value })
  }
  const getGender = async (event) => {
      setUser({ ...props.user, 'gender': event.target.value })
  }

  const getSpeciality = async (event) => {
    if (event.target)
      setUser({ ...props.user, 'speciality': event.target.value })
  }
  useEffect(() => {

    if (props.user !== undefined && props.user !== null) {
      setUser(props.user)
      setImageSrc(`${process.env.backurl}/${props.user.image}`)
    }
  }, [])
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  return (
    <Container className="py-5 col-12 col-lg-8">
      <div className=" wd-section-heading-wrapper text-center">
          <div className="wd-service-heading wd-section-heading">
              <span className="heading-subtitle">{operationMode} </span>
              <p></p>
          </div>
      </div>
      { (operationMode === "Register User" || operationMode === "Register Doctor")  && 
      <div className="register_form_heading">
          <Alert>
              Already have an account?
              &nbsp;
              <Link className="color-litegreen" href="/auth/login">
                  Login here!
              </Link>
          </Alert>
      </div>}
      <Form noValidate validated={validated} onSubmit={handleSubmit} encType='multipart/form-data'>
        <Stack gap={4}>
          <input type="hidden" name="id" defaultValue={user._id}></input>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="fullName" className="greenBOLD"> Full Name </Form.Label>
                <Form.Control defaultValue={user.fullname} placeholder="Full Name" type="text" name="fullname" required minLength={4} maxLength={20} />
                <Form.Control.Feedback type='invalid'>
                  {'Please enter your fullname, length must be between 4  and 20 caracters'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="email" className="greenBOLD"> Email </Form.Label>
                <Form.Control defaultValue={user.email} placeholder="Email" type="email" name="email" required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-z]{2,8}' />
                <Form.Control.Feedback type='invalid'>
                  {'Please enter your email address'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="greenBOLD">Password</Form.Label>
              { (operationMode=="Modify User" ||  operationMode=="Profile User")
                ?
                  <>
                    <Form.Control  name="password" type="password" placeholder="Password" minLength={8} />
                    <input type="hidden" id="pass" name="pass" defaultValue={user.password} /> 
                  </>
                :  
                  <Form.Control  name="password" type="password" placeholder="Password" required minLength={8} />
                
              }

              <Form.Control.Feedback type="valid">
                You did it!
              </Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {'Please enter your password, password minLength is 8'}
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="gender" className="greenBOLD"> Gender </Form.Label>
                <Form.Select required value={user.gender} name="gender" onChange={getGender} >
                  <option value="">Select your gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="height" className="greenBOLD"> Height </Form.Label>
                <Form.Control defaultValue={user.height} type="number"  id="height" name="height" required />
                <Form.Control.Feedback type='invalid'>
                  {'Please enter your height'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="weight" className="greenBOLD"> Weight </Form.Label>
                <Form.Control defaultValue={user.weight} type="number" id="weight" name="weight" required />
                <Form.Control.Feedback type='invalid'>
                  {'Please enter your weight'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="dateOfBirth" className="greenBOLD"> Date of Birth </Form.Label>
                { ( operationMode=="Modify User" ||  operationMode=="Profile User" )
                ?                
                <Form.Control value={formatDate(user.dateOfBirth)}  type="date" id="dateOfBirth" name="dateOfBirth" required />
                :
                <Form.Control defaultValue={formatDate(user.dateOfBirth)}  type="date" id="dateOfBirth" name="dateOfBirth" required />
                }
                <Form.Control.Feedback type='invalid'>
                  {'Please enter this field'}
                </Form.Control.Feedback>
              </Form.Group>

            </Col> */}
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="address" className="greenBOLD"> Address </Form.Label>
                <Form.Control defaultValue={user.address} placeholder="Tunis" type="text"  id="address" name="address" required />
                <Form.Control.Feedback type='invalid'>
                  {'Please enter your address'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="phone" className="greenBOLD"> Phone </Form.Label>
                <Form.Control defaultValue={user.phone} placeholder="12345678" type="text" pattern="^[0-9]{8}$" id="phone" name="phone" required />
                <Form.Control.Feedback type='invalid'>
                  {'Please enter your phone with 8 number'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={6}>
              { (user.role =="ADMIN" || operationMode === "Create User" || operationMode === "Modify User")
               &&
              <Form.Group>
                <Form.Label htmlFor="role" className="greenBOLD"> Role </Form.Label>
                <Form.Select required value={user.role} name="role" onChange={getRole} >
                  <option value="">Select ROLE</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DOCTOR">Doctor</option>
                </Form.Select>
              </Form.Group>
              }
              { (user.role =="DOCTOR" || operationMode === "Register Doctor") &&
              <Form.Group className="mb-3">
                  <Form.Label>speciality</Form.Label>
                  <div className="mb-3">
                      <Form.Select onChange={getSpeciality} className="form-control" value={user.speciality} name="speciality" aria-label="Default select example" required>
                          <option value="">Select your speciality </option>
                          <option value="Family medicine">Family medicine</option>
                          <option value="Internal Medicine">Internal Medicine</option>
                          <option value="Pediatrician">Pediatrician</option>
                          <option value="Obstetricians/gynecolo">Obstetricians/gynecolo</option>
                          <option value="gist (OBGYNs)">gist (OBGYNs)</option>
                          <option value="Cardiologist">Cardiologist</option>
                          <option value="Oncologist">Oncologist</option>
                          <option value="Gastroenterologist">Gastroenterologist</option>
                          <option value="Pulmonologist">Pulmonologist</option>
                          <option value="Infectious disease">Infectious disease</option>
                          <option value="Nephrologist">Nephrologist</option>
                          <option value="Endocrinologist">Endocrinologist</option>
                          <option value="Ophthalmologist">Ophthalmologist</option>
                          <option value="Otolaryngologist">Otolaryngologist</option>
                          <option value="Dermatologist">Dermatologist</option>
                          <option value="Psychiatrist">Psychiatrist</option>
                          <option value="Neurologist">Neurologist</option>
                          <option value="Radiologist">Radiologist</option>
                          <option value="Anesthesiologist">Anesthesiologist</option>
                          <option value="Surgeon">Surgeon</option>
                          <option value="Physician executive">Physician executive</option>
                      </Form.Select>
                  </div>
                  <Form.Control.Feedback type="valid">
                      You did it!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                      Please select a speciality
                  </Form.Control.Feedback>
              </Form.Group>
              }
              { !(user.role =="DOCTOR" || operationMode === "Register Doctor")  &&
              <Form.Group className="mb-3">
                  <Form.Label>Disease</Form.Label>
                  <Form.Control defaultValue={user.disease} name="disease" type="text" placeholder="Disease" required />
                  <Form.Control.Feedback type="valid">
                      You did it!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                      {'Please enter your disease'}
                  </Form.Control.Feedback>
              </Form.Group>
              }
          </Col>
          <Col md={6}>
              <Form.Group>
                <Form.Label className="greenBOLD">Picture</Form.Label>
                { operationMode=="Modify User" ||  operationMode=="Profile User"
                  ?
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    onChange={handleImageChange}
                  />
                  :
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    onChange={handleImageChange}
                    required
                    
                  />
                }
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {'Please choose an image of type : png, jpg, jpeg.'}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="designation-profile-img centerMydiv">
                {/* {!(user.image)
                  ?
                  <> */}
                    <img style={{ height: '15rem', width: '15rem' }}
                      src={imageSrc}
                      alt="altUser.png"
                    />
                    <hr />
                    <div className="desig-content">
                      {/* <p>{`/uploads/User/altUser.png`}</p> */}
                     <input type="hidden" id="pathImg" name="pathImg" defaultValue={`${process.env.backurl}/${props.user.image}`} /> 
                    </div>
                  {/* </>
                  :
                  <>
                    <img style={{ height: '15rem', width: '15rem' }}
                      src={`${process.env.backurl}/${user.image}`}
                      alt="verifiy img"
                    />
                    <hr />
                    <div className="desig-content">
                      {/* <p >{user.image}</p> --/}
                     <input type="hidden" id="pathImg" name="pathImg" defaultValue={user.image} /> 
                    </div>
                  </> 
                }*/}
              </div>
            </Col>
          </Row>

        </Stack>
        <Button className="btn btn-md btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" type="submit">Valid {operationMode} </Button>
      </Form>
    </Container >

  )
}

