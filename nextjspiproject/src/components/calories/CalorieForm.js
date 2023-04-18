import { calculateCalories } from "@/services/calories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Button, Container, Form, Row, Col, Stack } from "react-bootstrap"
import { Cookies } from "react-cookie";

export default function CalorieForm(props) {
  const cookies = new Cookies()
  const router = useRouter()
  const [cal, setCal] = useState(0);
  const [errActivity, setErrActivity] = useState(false)
  const [operationMode, setOperationMode] = useState('Create')
  const [calorie, setCalorie] = useState({
    weight : 0,
    height :  0,
    age  :  0,
    gender :  "",
    activity  :  ""
  })
  // const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const form = event.currentTarget;
    // setValidated(true);
    // console.log(calorie)
    if(calorie.activity==""){
      setErrActivity(true)
    }
    else{
      setErrActivity(false)
      let cc = await calculateCalories(calorie)
      setCal(cc)
    // if (form.checkValidity() === true) {
    //   //router.push('/calories')
    }
  }
  
  
function calculateAge(dateOfBirth) {
  const today = new Date();
  // console.log(" dateOfBirth : "+dateOfBirth)
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
  useEffect(() => {
    
    if (props.user !== undefined) {
      let dataUserToCalorie = {
        weight : props.user.weight,
        height :  props.user.height,
        age  :  calculateAge(props.user.dateOfBirth),
        gender :  props.user.gender,
        activity  :  ""
      }
      setCalorie(dataUserToCalorie)
    }
  }, [])
  
  const handleChange = async (event) => {
    
    // if (event.target.name=="weight")
    //   setCalorie({ ...calorie, 'weight': event.target.value })
    //   if (event.target.name=="height")
    //     setCalorie({ ...calorie, 'height': event.target.value })
    //     if (event.target.name=="age")
    //       setCalorie({ ...calorie, 'age': event.target.value })
    // if (event.target.name=="gender")
    //   setCalorie({ ...calorie, 'gender': event.target.value })
    if (event.target.name=="activity")
      setCalorie({ ...calorie, 'activity': event.target.value })

  }

  return (
    <Container className="woocommerce-Tabs-panel woocommerce-Tabs-panel--additional_information panel entry-content wc-tab">
      <h3 className="txtCenter">
        {/* {operationMode} */}
       Calorie : {Math.round(cal)} cal</h3>
      <hr/>
      {/* <Form noValidate validated={validated} onSubmit={handleSubmit}  encType='multipart/form-data'>
        <Stack gap={4}> */}
          <Row>
              <Col md={6}>
                Weight : {calorie.weight} (kg)
              </Col>
              <Col md={6}>
                Height : {calorie.height} (cm)
              </Col>
          </Row>
          <Row>
              <Col md={6}>
                Age : {calorie.age}
              </Col>
              <Col md={6}>
                Gender :  {calorie.gender}

              </Col>
          </Row>


        {/* <Row>
            <Col md={4}>
                <Form.Group>
                    <Form.Label htmlFor="weight">Weight (kg) </Form.Label>
                    <Form.Control defaultValue={calorie.weight} placeholder="70" type="number" id="weight" name="weight" required ></Form.Control>
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group>
                    <Form.Label htmlFor="height"> Height (cm) </Form.Label>
                    <Form.Control defaultValue={calorie.height} placeholder="180" type="number" id="height" name="height" required ></Form.Control>
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group>
                    <Form.Label htmlFor="age"> Age </Form.Label>
                    <Form.Control defaultValue={calorie.age} placeholder="30" type="number" id="age" name="age" required ></Form.Control>
                </Form.Group>
            </Col>
        </Row> */}
        <Row>
            {/* <Col md={6}>
                <Form.Group>
                    <Form.Label htmlFor="gender"> Gender </Form.Label>
                    <Form.Select required value={calorie.gender} name="gender" onChange={handleChange} >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Select>
                </Form.Group>
            </Col> */}
            <Col md={12}>
                <Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Label htmlFor="activity"> Activity </Form.Label>
                      </Col>
                      <Col md={6}>
                        <Form.Select required value={calorie.activity} name="activity" onChange={handleChange} >
                            <option value="">Select Activity</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="lightly active">Lightly active</option>
                            <option value="moderately active">Moderately active</option>
                            <option value="very active">very active</option>
                            <option value="super active">super active</option>
                        </Form.Select>
                        {errActivity? 
                          <span style={{color : "red"}}>Please Select Activity</span>
                          :
                          <></>
                        }
                      </Col>
                    </Row>
                </Form.Group>
            </Col>
            {/* <Col md={3}>
               <Form.Label> Calorie :  {cal} cal </Form.Label>
            </Col> */}
        </Row>
        
        <Row>
            <Col md={12}>
              <Button className="btn btn-md btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button"  onClick={handleSubmit}>Calculate</Button>
            </Col>
        </Row>

        {/* </Stack>
      </Form> */}
    </Container >
    
  )
}
export async function getServerSideProps() {
   const cookies = new Cookies()
  return{
    props: {
      user: cookies.get('user')
    }
  }
}

