import { submitMeal } from "@/services/meal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Button, Container, Form, Stack,Row ,Col, Alert } from "react-bootstrap"

export default function RecipeForm(props) {
  const router = useRouter()
  
  const [operationMode, setOperationMode] = useState('Create')
  const [recipe, setRecipe] = useState({
    name : "",
    description :  "",
    quantity  :  "",
    totalCalorie :  "",
    imgRecipe  :  "",
    meals  :  "",
    user  :  ""
  })
  const [validatedForm, setValidatedForm] = useState(false);

  
//   const getValidated = async (event) => {
//     console.log(event.target.value)
//     setMeal({ ...props.meal, 'validated': event.target.value })
// }

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     setValidatedForm(true);
    
//     if (form.checkValidity() === true) {
//       await submitMeal(event, operationMode)
//     }
//   }

  useEffect(() => {
    
    if (props.recipe !== undefined) {
      setRecipe(props.recipe)
      setOperationMode('Modify')
    }
  }, [])
  

  return (
    <Container>
      
    <div className=" wd-section-heading-wrapper text-center">
        <div className="wd-service-heading wd-section-heading">
            <span className="heading-subtitle">{operationMode} Recipe</span>
            <p></p>
        </div>
    </div>
      {/* <Form noValidate validated={validatedForm} onSubmit={handleSubmit}  encType='multipart/form-data'>
        <Stack gap={4}>

          <Row>
            <Col md={4}>
              <Form.Group>
                  <input type="hidden" name="id" defaultValue={meal._id}></input>

                  <Form.Label htmlFor="FoodCategory">Food Category</Form.Label>
                  <Form.Control defaultValue={meal.FoodCategory} placeholder="Food Category" type="text" id="FoodCategory" name="FoodCategory" required></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
            <Form.Group>
                <Form.Label htmlFor="FoodItem"> Food Item</Form.Label>
                <Form.Control defaultValue={meal.FoodItem} placeholder="Food Item " type="text" id="FoodItem" name="FoodItem" required></Form.Control>
            </Form.Group>
            </Col>
            <Col md={4}>

            <Form.Group>
                <Form.Label htmlFor="serving_size_100g"> Serving size 100 g/ml</Form.Label>
                <Form.Control defaultValue={meal.serving_size_100g} placeholder="100" type="text" id="serving_size_100g" name="serving_size_100g" required></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="calories_100g"> Calories 100 g/ml</Form.Label>
                  <Form.Control defaultValue={meal.calories_100g} placeholder="150" type="text" id="calories_100g" name="calories_100g" required></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="serving_size_portion"> Serving Size Portion </Form.Label>
                  <Form.Control defaultValue={meal.serving_size_portion} placeholder="10" type="text" id="serving_size_portion" name="serving_size_portion" required></Form.Control>  
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="serving_size_oz"> Serving Size Oz</Form.Label>
                  <Form.Control defaultValue={meal.serving_size_oz} placeholder="28" type="text" id="serving_size_oz" name="serving_size_oz" required></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
            <Alert key="info" variant="info">
              If meal is validated ,you cannot delete it ! 
            </Alert>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="validated"> Validated </Form.Label>
                <Form.Select required value={meal.validated} name="validated" onChange={getValidated} >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

        </Stack>
        <div className="txtCenter">
          <Button  variant="success" type="submit">{operationMode} Meal</Button>
        </div>
        <br/>
      </Form> */}
    </Container >
    
  )
}

