import { fetchData } from "@/services/mix";
import { useRouter } from 'next/router';
import { submitRecipe } from "@/services/recipe";
import { useEffect, useState } from "react"
import { Button, Container, Form, Stack,Row ,Col, Alert, Table } from "react-bootstrap"

export default function RecipeForm(props) {
  
  const router = useRouter();
  
  const [filtered, setFiltered] = useState();
  const [showfiltered, setShowfiltered] = useState(false);
  const [typefilter, setTypefilter] = useState();
  const [search, setSearch] = useState("");

  var [totalCaloriecal, setTotalCaloriecal] = useState(0)
  var [filteredListMeal, setFilteredListMeal] = useState(props.mealsdb)
  var [listMeal, setListMeal] = useState([])
  var [listMealIds, setListMealIds] = useState([])
  var [listQuantity, setListQuantity] = useState([])

  const [operationMode, setOperationMode] = useState('Create')
  const [recipe, setRecipe] = useState({
    name : "",
    validated : false,
    description :  "",
    quantity  :  [],
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

  function calculateTotCal() {
    var tt = 0;
    for (let i in recipe.meals){
      tt=tt+extractValue(recipe.meals[i].calories_100g)*recipe.quantity[i]
    }
    setTotalCaloriecal(tt) 
  }

  function extractValue(string) {

    let match = string.match(/\d+\.?\d*/g);
    return match ? parseFloat(match[match.length-1]) : null;
  }
  
  const addqt = async (position,qt) =>{
    if(qt>0){
      listQuantity[position]=qt;
      recipe.quantity = listQuantity;
      calculateTotCal();
    }
  }
  
  const addOneMeal = async (mealId,qt) =>{

    var position = -1;
    for (let i in listMeal){
      if(listMeal[i]._id.includes(mealId)){
        position=i;
      }
    }
    if(position == -1 ){
      const data = await fetchData(`${process.env.backurl}/api/meal/findOne/${mealId}`);
      listMeal.push(data);
      listQuantity.push(qt);
    }else{
      listQuantity[position]=listQuantity[position]+qt;
    }
    
    recipe.meals = listMeal;
    recipe.quantity = listQuantity;

    updateMealsIds()
    calculateTotCal();
    router.replace(router.asPath);
  }

  const deleteOneMeal = async (position) =>{
    
    setListMeal(listMeal.filter((item, i) => i !== position));
    setListQuantity(listQuantity.filter((item, i) => i !== position));
    setListMealIds(listMealIds.filter((item, i) => i !== position));

    recipe.meals = listMeal.filter((item, i) => i !== position);
    recipe.quantity=recipe.quantity.filter((item, i) => i !== position);
    listMealIds=listMealIds.filter((item, i) => i !== position)

    calculateTotCal();
    router.replace(router.asPath);

  }

  
  const filterList = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearch(searchQuery)
    let filterColumn ="FoodCategory";
    if(typefilter!=undefined){
      filterColumn =typefilter;
    }
    const filteredList = filteredListMeal.filter((item) =>
      item[filterColumn] && item[filterColumn].toString().toLowerCase().includes(searchQuery)
    );
    if(searchQuery!=""){
      setFiltered(filteredList);
      setShowfiltered(true)
    }else{
      setShowfiltered(false)
    }
  }
  
  const renderMeal = (meal, index) =>{
    
    return (
        <div key={meal._id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 ">
            
            <h6 key={meal.FoodCategory} className="navy-txt txtCenter"><a
                                href="#">{meal.FoodCategory}</a>
                    </h6>
            <div key={index} className="product-item">
                <div className="img">
                    {/* <a href="#"> */}
                        <img
                         src={ 
                            meal.imgMeal   
                            ?`${process.env.backurl}${meal.imgMeal}`
                            :
                            `${process.env.backurl}/uploads/Meal/altMeal.jpg` 
                       } 
                                alt="image meal"/>
                                {/* </a> */}
                    <span>
                        <a href="#"   onClick={() => addOneMeal(meal._id,1)}
                    ><i className="sl icon-plus"></i></a></span>
                </div>
                <div className="product-info">
                    <h6 key={meal.FoodItem} className="navy-txt"><a
                                href="#">{meal.FoodItem}</a>
                    </h6>
                    <p key={meal.calories_100g}>{meal.calories_100g}</p>                                    
                    {/* <div className="wd-shop-details-title-wrapper">
                        <div className="wd-shop-product-review-star">
                            <div className="rating-star">
                                <div className="star-rating" title="Rated 3.50 out of 5">
                                    <span style={{width:"70%"}}></span>
                                </div>
                                <div className="rating-count">
                                    <strong className="rating">3.50</strong>
                                </div>                                                                                                            
                                <span className="woocommerce-review-link" rel="nofollow">(<span className="count">2</span> reviews)</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
    </div>
    )
  }

  const updateMealsIds = () =>{
    for (let i in recipe.meals){
      if(!listMealIds.includes(recipe.meals[i]._id)){
        listMealIds.push(recipe.meals[i]._id)
      }
    }
    router.replace(router.asPath);
  }

  useEffect(() => {
    if (props.recipe !== undefined) {
      setTotalCaloriecal(props.recipe.totalCalorie)
      setRecipe(props.recipe)
      setOperationMode('Modify')
      setListMeal(props.recipe.meals)
      setListQuantity(props.recipe.quantity)
      updateMealsIds()
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
        <input type="hidden" name="id" defaultValue={recipe._id}></input>
        <Stack gap={4}>
          <Row>
            <div className="col-12 ">
              <article id="post-157" className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
                <div className="post-info">
                  <h2 className="post-title txtCenter">Total Calories ( {totalCaloriecal} Cal )</h2>
                  <Table striped bordered hover size="sm"  className="woocommerce-product-attributes shop_attributes  txtCenter">
                    <thead>
                      <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
                        { listQuantity.length>0 ?
                        <>
                          <th >Delete</th>
                          <th >Food Item</th>
                          <th >Calories 100 g/ml
                            <br/>
                            <span className="redBOLD">***</span>
                            <br/>
                            <span className="greenBOLD"> Percent</span>
                          </th>
                          <th>Quantity</th>
                          <th className="woocommerce-product-attributes-item__label" >Picture</th>
                          </>
                          :
                           <td  className="redBOLD"> Add meals from list below </td>
                        }
                      </tr>
                    </thead>
                    <tbody>
                      { listMeal.map 
                        ( (meal, index)=> {
                          return (
                            <tr key={index} className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
                              <td key={meal.id} className="woocommerce-product-attributes-item__value">
                                <div className="wd-blog-bottom-meta">
                                  <div className="wd-author-meta">
                                    <div className="wd-post_date">
                                        <Button onClick={() => deleteOneMeal(index)}  className="btn wd-btn-round-2"><i className="sl icon-trash"></i></Button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td key={meal.FoodItem} className="woocommerce-product-attributes-item__value">{meal.FoodItem}</td>
                              <td key={meal.calories_100g}  className="woocommerce-product-attributes-item__value">
                                {meal.calories_100g}
                                <br/>
                                  <span className="redBOLD">***</span>
                                <br/>
                                  <span className="greenBOLD"> { ((extractValue(meal.calories_100g)*listQuantity[index])/totalCaloriecal*100).toFixed(2)} %</span>
                              </td>
                              <td key={listQuantity[index]} className="woocommerce-product-attributes-item__value">
                                <input
                                  type="number"
                                  id="quantity_6407f5d94259b"
                                  className="input-text qty text"
                                  step="1"
                                  min="1"
                                  max="999"
                                  value={listQuantity[index]}
                                  onChange={() => addqt(index,recipe.quantity[index])}
                                  title="Qty"
                                  size="3" />
                                  <input 
                                  onClick={() => addqt(index,recipe.quantity[index]-1)}
                                  type="button" value="-" className="minus btn btn-outline-secondary"/>
                                  <input 
                                  onClick={() => addqt(index,recipe.quantity[index]+1)}
                                  type="button" value="+" className="plus btn btn-outline-secondary"/>
                              </td>
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
                            </tr>
                          )}
                        )
                      }
                    </tbody>
                  </Table>
                </div>
              </article>
            </div>
            <Container className="woocommerce-Tabs-panel woocommerce-Tabs-panel--additional_information panel entry-content wc-tab">
              <div className="vc_row wpb_row vc_row-fluid vc_custom_1641487967546">
                <div className="wpb_column vc_column_container vc_col-sm-12">
                  <div className="vc_column-inner">
                    <div className="wpb_wrapper">      
                      <div className=" wd-section-heading-wrapper text-center">
                        <div className="wd-service-heading wd-section-heading">
                          <span className="heading-subtitle">Featured Meals</span>
                            <h3 className="wow fadeIn">Our Latest & <span className="wd-primary-color">Featured Meals</span></h3>
                          <p></p>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="sidebar">
                            <div  className="widget widget_search"><h4 className="widget-title txtCenter"> Filter List </h4>
                              <Row >
                                <div className=" txtCenter  centerMydiv  col-12 col-lg-6 " >
                                  Search type :
                                  <br/>
                                  <select 
                                    className="greenBtn"   
                                    onChange={(event) =>{
                                        setTypefilter(event.target.value);
                                        setSearch("")
                                        setShowfiltered(false)
                                    }
                                    }
                                    >
                                    <option value="FoodCategory"> Category </option>
                                    <option value="FoodItem"> Food </option>
                                    <option value="calories_100g"> Calorie 100 g/ml </option>
                                  </select>
                                </div>
                                <div className=" txtCenter  centerMydiv  col-12 col-lg-6 " >
                                  Search value :
                                  <br/>
                                  <input 
                                  className="greenBtn"   
                                  onChange={filterList} placeholder="search" value={search} type="text"/>
                                </div>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="wd-feature-products meals-container">
                        <div className="row">
                          {showfiltered ? 
                            filtered && filtered.map
                            ((meal, index)=> {
                              return (renderMeal(meal, index))
                            })
                            :
                            filteredListMeal && filteredListMeal.map 
                            ((meal, index)=> {
                              return (renderMeal(meal, index))
                            })
                          } 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
                    
            <Col md={4} hidden={true}>
              <Form.Group>
                <Form.Label htmlFor="quantity"> Quantity</Form.Label>
                <Form.Control defaultValue={recipe.quantity}
                placeholder="150" type="text" id="quantity" name="quantity" required></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4} hidden={true}>
              <Form.Group>
                <Form.Label htmlFor="meals"> Meals </Form.Label>
                <Form.Control defaultValue={listMealIds} 
                placeholder="10" type="text" id="meals" name="meals" required></Form.Control>  
              </Form.Group>
            </Col>
          </Row>
          <div className="container">
            <div className="row">
              <div className="widget widget_search col-12 col-lg-6">
                <Alert key="info" variant="info">
                  If your recipe is publiched ,All users can find it ! 
                </Alert>
                  <Row >
                    <div className=" txtCenter  centerMydiv  col-12 col-lg-8 " >
                      <Form.Group>
                        <Form.Label htmlFor="Name">Name</Form.Label>
                        <Form.Control defaultValue={recipe.name} placeholder="Name" type="text" id="name" name="name" required></Form.Control>
                      </Form.Group>
                    </div>
                    <div className=" txtCenter  centerMydiv  col-12 col-lg-4 " >
                      <Form.Group>
                        <Form.Label htmlFor="validated"> Publiched </Form.Label>
                        <Form.Select required value={recipe.validated} name="validated" onChange={getValidated} >
                          <option value="false">False</option>
                          <option value="true">True</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className=" txtCenter  centerMydiv  col-12  " >
                      <Form.Group>
                        <Form.Label htmlFor="description"> description</Form.Label>
                        <Form.Control defaultValue={recipe.description} as="textarea" rows={3}  placeholder="description" type="text" id="description" name="description" required></Form.Control>
                      </Form.Group>
                    </div>
                  </Row>                    
                  </div>
              
                  <div className="widget widget_search col-12 col-lg-6">

                  <Row>
                    <div className=" txtCenter  centerMydiv  col-12 col-lg-6 " >
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
                    </div>
                    <div className=" txtCenter  centerMydiv  col-12  " >
                      <div className="designation-profile-img centerMydiv">
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
                    </div>
                  </Row>
                  </div>
              </div>
              </div>
        </Stack>
        <div className="txtCenter">
          <Button  variant="success" type="submit">{operationMode} Meal</Button>
        </div>
        <br/>
      </Form>
    </Container >
  )
}
