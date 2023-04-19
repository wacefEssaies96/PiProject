import { submitRecipe } from "@/services/recipe";
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

  
  const getValidated = async (event) => {
    console.log(event.target.value)
    setRecipe({ ...props.recipe, 'validated': event.target.value })
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidatedForm(true);
    
    if (form.checkValidity() === true) {
      await submitRecipe(event, operationMode)
    }
  }

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
      <Form noValidate validated={validatedForm} onSubmit={handleSubmit}  encType='multipart/form-data'>
        <Stack gap={4}>

          <Row>
            <Col md={4}>
              <Form.Group>
                  <input type="hidden" name="id" defaultValue={recipe._id}></input>

                  <Form.Label htmlFor="Name">Name</Form.Label>
                  <Form.Control defaultValue={recipe.name} placeholder="Name" type="text" id="name" name="name" required></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
            <Form.Group>
                <Form.Label htmlFor="description"> description</Form.Label>
                <Form.Control defaultValue={recipe.description} placeholder="description" type="text" id="description" name="description" required></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          
          <Row>
            {/* <Col md={6}>
              <Form.Group>
                <Form.Label>Picture</Form.Label>
                {/* {!(recipe.imgRecipe)
                  ?
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    required
                  />
                  : /}
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="imgRecipe"
                  />
                {/* } /}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {'Please choose an image of type : png, jpg, jpeg.'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col> */}
            <Col md={4}>
              <div className="designation-profile-img">
                {!(recipe.imgRecipe)
                  ?
                  <>
                    <img style={{ height: '15rem', width: '15rem' }}
                      src={`${process.env.backurl}/uploads/Recipe/altRecipe.jpg`}
                      alt="no img altRecipe.jpg"
                    />
                    <hr />
                    <div className="desig-content">
                      <p>{`/uploads/Recipe/altRecipe.jpg`}</p>
                     <input type="hidden" id="pathImg" name="pathImg" defaultValue={`/uploads/Recipe/altRecipe.jpg`} /> 
                    </div>
                  </>
                  :
                  <>
                    <img style={{ height: '15rem', width: '15rem' }}
                      src={`${process.env.backurl}/${recipe.imgRecipe}`}
                      alt="verifiy img"
                    />
                    <hr />
                    <div className="desig-content">
                      <p >{recipe.imgRecipe}</p>
                     <input type="hidden" id="pathImg" name="pathImg" defaultValue={recipe.imgRecipe} /> 
                    </div>
                  </>
                }
              </div>
            </Col>
          </Row>
          <Row>
            
                    {/* <div class="quantity">
					<input type="button" value="-" class="minus btn btn-outline-secondary"/>
					<input
						type="number"
						id="quantity_6407f5d94259b"
						class="input-text qty text"
						step="1"
						min="1"
						max="99999"
						name="quantity"
						value="1"
						title="Qty"
						size="4" />
					<input type="button" value="+" class="plus btn btn-outline-secondary"/>
				</div> */}
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="quantity"> Quantity</Form.Label>
                  <Form.Control defaultValue={recipe.quantity} placeholder="150" type="text" id="quantity" name="quantity" required></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="meals"> Meals </Form.Label>
                  <Form.Control defaultValue={recipe.meals} placeholder="10" type="text" id="meals" name="meals" required></Form.Control>  
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
            <Alert key="info" variant="info">
              If recipe is validated ,All users can find it ! 
            </Alert>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="validated"> Validated </Form.Label>
                <Form.Select required value={recipe.validated} name="validated" onChange={getValidated} >
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
      </Form>
    </Container >
    
  )
}

