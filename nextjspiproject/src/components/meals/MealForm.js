import { submitMeal } from "@/services/meal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Button, Container, Form, Stack } from "react-bootstrap"

export default function MealsForm(props) {
  const router = useRouter()
  
  const [operationMode, setOperationMode] = useState('Create')
  const [meal, setMeal] = useState({
    FoodCategory : "",
    FoodItem :  "",
    calories_100g  :  "",
    serving_size_portion :  "",
    serving_size_oz  :  ""
  })
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    await submitMeal(event, operationMode)
    if (form.checkValidity() === true) {
      router.push('/meals')
    }
  }

  useEffect(() => {
    
    if (props.meal !== undefined) {
      setMeal(props.meal)
      setOperationMode('Modify')
    }
  }, [])

  return (
    <Container>
      <h3>{operationMode} Meal</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}  encType='multipart/form-data'>
        <Stack gap={4}>


            <Form.Group>
                <input type="hidden" name="id" defaultValue={meal._id}></input>
                <Form.Label htmlFor="FoodCategory">Food Category</Form.Label>
                <Form.Control defaultValue={meal.FoodCategory} placeholder="Food Category" type="text" id="FoodCategory" name="FoodCategory" required></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="FoodItem"> Food Item</Form.Label>
                <Form.Control defaultValue={meal.FoodItem} placeholder="Food Item " type="text" id="FoodItem" name="FoodItem" required></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="calories_100g"> Calories 100g</Form.Label>
                <Form.Control defaultValue={meal.calories_100g} placeholder="150" type="text" id="calories_100g" name="calories_100g" required></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="serving_size_portion"> Serving Size Portion </Form.Label>
                <Form.Control defaultValue={meal.serving_size_portion} placeholder="10" type="text" id="serving_size_portion" name="serving_size_portion" required></Form.Control>  
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="serving_size_oz"> Serving Size Oz</Form.Label>
                <Form.Control defaultValue={meal.serving_size_oz} placeholder="28" type="text" id="serving_size_oz" name="serving_size_oz" required></Form.Control>
            </Form.Group>

        </Stack>
        <Button variant="success" type="submit">Add Meal</Button>
      </Form>
    </Container >
    
  )
}

