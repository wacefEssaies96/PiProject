import { submitMeal } from "@/services/meal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Button, Container, Form, Stack,Row ,Col, Alert } from "react-bootstrap"

export default function MealsForm(props) {
  const router = useRouter()
  
  const [operationMode, setOperationMode] = useState('Create')
  const [meal, setMeal] = useState({
    serving_size_100g : "",
    FoodCategory : "",
    FoodItem :  "",
    calories_100g  :  "",
    serving_size_portion :  "",
    serving_size_oz  :  "",
    validated : "",
    imgMeal : ""
  })  
  const [imageSrc, setImageSrc] = useState(`${process.env.backurl}/uploads/Meal/altMeal.jpg`)

  const [validatedForm, setValidatedForm] = useState(false);

  
  const handleImageChange = (event) => {
    if (event.target.files[0])
      setImageSrc(URL.createObjectURL(event.target.files[0]))
    else
      setImageSrc('')
  }

  const getValidated = async (event) => {
    console.log(event.target.value)
    setMeal({ ...props.meal, 'validated': event.target.value })
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidatedForm(true);
    
    if (form.checkValidity() === true) {
      await submitMeal(event, operationMode)
    }
  }

  useEffect(() => {
    
    if (props.meal !== undefined) {
      setMeal(props.meal)      
      setImageSrc(`${process.env.backurl}/${props.meal.imgMeal}`)
      setOperationMode('Modify')
    }
  }, [])

  return (
    <Container className="col-12 col-lg-8">
      
      <div className=" wd-section-heading-wrapper text-center">
      <div className="wd-service-heading wd-section-heading">
        <span className="heading-subtitle ">{operationMode} Meal</span>
        </div>
        </div>
      <Form noValidate validated={validatedForm} onSubmit={handleSubmit}  encType='multipart/form-data'>
        <Stack gap={4}>

          <Row>
            <Col md={4}>
              <Form.Group>
                  <input type="hidden" name="id" defaultValue={meal._id}></input>

                  <Form.Label htmlFor="FoodCategory" className="greenBOLD">Food Category</Form.Label>
                  <Form.Control defaultValue={meal.FoodCategory} placeholder="Food Category" type="text" id="FoodCategory" name="FoodCategory" required></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
            <Form.Group>
                <Form.Label htmlFor="FoodItem" className="greenBOLD"> Food Item</Form.Label>
                <Form.Control defaultValue={meal.FoodItem} placeholder="Food Item " type="text" id="FoodItem" name="FoodItem" required></Form.Control>
            </Form.Group>
            </Col>
            <Col md={4}>

            <Form.Group>
                <Form.Label htmlFor="serving_size_100g" className="greenBOLD"> Serving size 100 g/ml</Form.Label>
                <Form.Control defaultValue={meal.serving_size_100g} placeholder="100" type="text" id="serving_size_100g" name="serving_size_100g" required></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="calories_100g" className="greenBOLD"> Calories 100 g/ml</Form.Label>
                  <Form.Control defaultValue={meal.calories_100g} placeholder="150" type="text" id="calories_100g" name="calories_100g" required></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="serving_size_portion" className="greenBOLD"> Serving Size Portion </Form.Label>
                  <Form.Control defaultValue={meal.serving_size_portion} placeholder="10" type="text" id="serving_size_portion" name="serving_size_portion" required></Form.Control>  
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="serving_size_oz" className="greenBOLD"> Serving Size Oz</Form.Label>
                  <Form.Control defaultValue={meal.serving_size_oz} placeholder="28" type="text" id="serving_size_oz" name="serving_size_oz" required></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            
                <div className="widget widget_search col-12 col-lg-6">
                  <Alert key="info" variant="info">
                    If meal is validated ,you cannot delete it ! 
                  </Alert>

                <div className="widget widget_search col-12 col-lg-6">              <Form.Group>
                  <Form.Label htmlFor="validated"> Validated </Form.Label>
                  <Form.Select required value={meal.validated} name="validated" onChange={getValidated} >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </Form.Select>
                </Form.Group>
            </div>
            </div>

            <div className="widget widget_search col-12 col-lg-6">
                  <Row>
                    <div className=" txtCenter  centerMydiv  col-12  " >
                      <Form.Group>
                <Form.Label className="greenBOLD">Picture</Form.Label>
                 {operationMode=='Create'
                  ?
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="imgMeal"
                    required
                    onChange={handleImageChange}
                  />
                  : 
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="imgMeal"
                    onChange={handleImageChange}
                  />
                }
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {'Please choose an image of type : png, jpg, jpeg.'}
                </Form.Control.Feedback>
              </Form.Group>
                    </div>
                    <div className=" txtCenter  centerMydiv  col-12 col-lg-6 " >
                      <div className="designation-profile-img centerMydiv">
                {/* {meal.imgMeal
                  ?
                  <> */}

                    <img style={{ height: '15rem', width: '15rem' }}
                      src={imageSrc}
                      alt="Img"
                    />
                    <hr />
                    <div className="desig-content">
                      {/* <p >{meal.imgMeal}</p> */}
                     <input type="hidden" id="pathImg" name="pathImg" defaultValue={imageSrc} /> 
                    </div>
                  {/* 
                                    </>

                  :
                  
                  <>
                    <img style={{ height: '15rem', width: '15rem' }}
                      src={`${process.env.backurl}/uploads/Meal/altMeal.jpg`}
                      onError={(e) => {
                        e.target.src = `${process.env.backurl}uploads/Meal/altMeal.jpg`;
                      }}
                      alt="no img altMeal.jpg"
                    />
                    <hr />
                    <div className="desig-content">
                      {/* <p>{`/uploads/Meal/altMeal.jpg`}</p> -/}
                     <input type="hidden" id="pathImg" name="pathImg" defaultValue={`/uploads/Meal/altMeal.jpg`} /> 
                    </div>
                  </>
                  
                } */}
              </div>
                  </div>
                  </Row>
            </div>
            
          </Row>

        </Stack>
        <div className="txtCenter">
          <Button  variant="success" type="submit">{operationMode} Meal</Button>
        </div>
        <br/>
      </Form>
    </Container >
    
  )
}

