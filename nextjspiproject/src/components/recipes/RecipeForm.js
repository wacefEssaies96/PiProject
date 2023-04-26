import { fetchData } from "@/services/mix";
import { submitRecipe } from "@/services/recipe";
import { useEffect, useState } from "react"
import { Button, Container, Form, Stack,Row ,Col, Alert, Table } from "react-bootstrap"
import Meal from "../meals/Meal";

export default function RecipeForm(props) {

  var [totalCaloriecal, setTotalCaloriecal] = useState(0)
  var [filteredListMeal, setFilteredListMeal] = useState([])
  var [listMeal, setListMeal] = useState([])
  var [listMealIds, setListMealIds] = useState([])
  var [listQuantity, setListQuantity] = useState([])
  const [listMealoneTime, setListMealoneTime] = useState(true)

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
  
   const refresh = async ()=>{
    // filteredListMeal = filteredListMeal.filter(item => listMeal.map(item => item.id).includes(item.id));


    //   console.log(" filteredListMeal "+JSON.stringify(filteredListMeal)+" listMeal "+JSON.stringify(listMeal))

      // setRecipe({...recipe,melas:[]})
        if (listMealoneTime) {
          setRecipe({...recipe,melas:props.recipe.meals})
        }
      // 
      if (listMeal.length != recipe.meals.length) {

        for (let i in recipe.meals){
          if(!listMealIds.includes(recipe.meals[i])){
            const data = await fetchData(`${process.env.backurl}/api/meal/findOne/${recipe.meals[i]}`);
            listMeal.push(data)
            listMealIds.push(recipe.meals[i])
            listQuantity.push(recipe.quantity[i])
          }
        }
        filterAddMeal()
        
      }
      setListMealoneTime(false)
      calculateTotCal()
      // console.log(" listMeal "+JSON.stringify(listMeal)+" listQuantity "+JSON.stringify(listQuantity))

      
   }
   function filterAddMeal(){
    const l = props.mealsdb.filter(item1 => !listMealIds.map(item => item).includes(item1._id));
    for (let j in l){
      filteredListMeal.push(l[j])
    }
   }
   function calculateTotCal() {
    var tt = 0;
    for (let i in listMeal){
      // totalCalorie=totalCalorie+
      tt=tt+extractValue(listMeal[i].calories_100g)*listQuantity[i]
    }
    setTotalCaloriecal(tt) 
    console.log(" tt "+totalCaloriecal+" re tt "+recipe.totalCalorie)
  }
  function extractValue(string) {

    let match = string.match(/\d+\.?\d*/g);
    return match ? parseFloat(match[match.length-1]) : null;
  }
  
  const deleteOneMeal = async (position) =>{
    
    setListMeal(listMeal.filter((item, i) => i !== position));
    listMeal=(listMeal.filter((item, i) => i !== position));
    setListQuantity(listQuantity.filter((item, i) => i !== position));
    listQuantity=(listQuantity.filter((item, i) => i !== position));
    setListMealIds(listMealIds.filter((item, i) => i !== position));
    listMealIds=(listMealIds.filter((item, i) => i !== position));
    filteredListMeal=[]
    filterAddMeal()
    calculateTotCal()
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
            <Col md={6}>
              <Form.Group>
                <Form.Label>Picture</Form.Label>
                 {operationMode=='Create'
                  ?
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="imgRecipe"
                    required
                  />
                  : 
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="imgRecipe"
                  />
                }
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {'Please choose an image of type : png, jpg, jpeg.'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <div className="designation-profile-img">
                {recipe.imgRecipe
                  ?
                  <>

                    <img style={{ height: '15rem', width: '15rem' }}
                      src={`${process.env.backurl}${recipe.imgRecipe}`}
                      onError={(e) => {
                        e.target.src = `${process.env.backurl}uploads/Recipe/altRecipe.jpg`;
                      }}
                      // onerror="this.onerror=null;this.src=;"
                      alt={`${process.env.backurl}uploads/Recipe/altRecipe.jpg`}
                    />
                    <hr />
                    <div className="desig-content">
                      {/* <p >{recipe.imgRecipe}</p> */}
                     <input type="hidden" id="pathImg" name="pathImg" defaultValue={recipe.imgRecipe} /> 
                    </div>
                  </>
                  :
                  
                  <>
                    <img style={{ height: '15rem', width: '15rem' }}
                      src={`${process.env.backurl}/uploads/Recipe/altRecipe.jpg`}
                      onError={(e) => {
                        e.target.src = `${process.env.backurl}uploads/Recipe/altRecipe.jpg`;
                      }}
                      alt="no img altRecipe.jpg"
                    />
                    <hr />
                    <div className="desig-content">
                      {/* <p>{`/uploads/Recipe/altRecipe.jpg`}</p> */}
                     <input type="hidden" id="pathImg" name="pathImg" defaultValue={`/uploads/Recipe/altRecipe.jpg`} /> 
                    </div>
                  </>
                  
                }
              </div>
            </Col>
          </Row>
          <Row>
            
        <div className="col-12 ">
        <article id="post-157" className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
                 
                 
                 <div className="post-info">
              <h2 className="post-title">Total Calories ( {totalCaloriecal} Cal )</h2>
                
            <Button
            className="greenBtn"
             onClick={() => refresh()}>Refresh</Button>

      <Table striped bordered hover size="sm" style={{margin:"0%"}} className="woocommerce-product-attributes shop_attributes">
        <thead>
          <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
            <th className="woocommerce-product-attributes-item__label">Picture</th>
            <th className="woocommerce-product-attributes-item__label">FoodItem</th>
            <th className="woocommerce-product-attributes-item__label">calories_100 g/ml</th>
            <th>Quantity</th>
            <th>Percent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        { listMeal.map 
          ( (meal, index)=> {
            return (
      <tr key={index} className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
        <td className="woocommerce-product-attributes-item__value">
         
        <div className="post_meta">
                 <span>
                    <img  className="wp-post-image" sizes="(max-width: 730px) 100vw, 730px"
                    key={meal.imgMeal}
                    
                    src={ meal.imgMeal 
                    ?`${process.env.backurl}${meal.imgMeal}`
                    :`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 

                  } 
                    alt="Meal IMG" /> 
                     </span>
              </div>
        </td>
        <td key={meal.FoodItem} className="woocommerce-product-attributes-item__value">{meal.FoodItem}</td>
        <td key={meal.calories_100g}  className="woocommerce-product-attributes-item__value">{meal.calories_100g}</td>
        <td key={listQuantity[index]} className="woocommerce-product-attributes-item__value">{listQuantity[index]}</td>
        <td  className="woocommerce-product-attributes-item__value">{ ((extractValue(meal.calories_100g)*listQuantity[index])/totalCaloriecal*100).toFixed(2)} %</td>
        <td key={meal.id} className="woocommerce-product-attributes-item__value">
          <div className="wd-blog-bottom-meta">
            <div className="wd-author-meta">
              <div className="wd-post_date">
                  <Button onClick={() => deleteOneMeal(index)}  className="btn wd-btn-round-2">Delete</Button>
              </div>
            </div>
          </div>
        </td>

      </tr>
       )}
       )
         }
        </tbody>
      </Table>
              
           </div>
        </article>
     </div> 
     <Meal mealsdb={filteredListMeal}></Meal>            

     {/* <Meal mealsdb={props.mealsdb}></Meal>
                  */}
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
                  <Form.Control defaultValue={listQuantity} onChange={refresh} placeholder="150" type="text" id="quantity" name="quantity" required></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                  <Form.Label htmlFor="meals"> Meals </Form.Label>
                  <Form.Control defaultValue={listMealIds} onChange={refresh}  placeholder="10" type="text" id="meals" name="meals" required></Form.Control>  
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

