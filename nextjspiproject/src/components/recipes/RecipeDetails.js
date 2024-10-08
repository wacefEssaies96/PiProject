import { deleteData, VerifImg } from "@/services/mix";
import { Cookies } from 'react-cookie'
import { useEffect, useState } from "react"
import { Table,Button, Container, Form, Stack } from "react-bootstrap"
import DeleteModal from "@/components/layouts/DeleteModal";

const cookies = new Cookies();
export default function RecipeDetails(props) {

  const [recipe, setRecipe] = useState({
    name : "",
    description :  "",
    quantity  :  "",
    totalCalorie :  "",
    imgRecipe  :  "",
    meals  :  "",
    user  :  ""
  })
  
  const [id, setId] = useState(null)
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(null)
  
  const showDeleteModal = (id) => {
    setId(id)
    setDeleteMessage(`Are you sure you want to delete your  Recipe : '${recipe.name}' ('${recipe.totalCalorie}' Cal ) ?`)
    setDisplayConfirmationModal(true)
  }
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }

  const deleteOneRecipe = async (id) =>{
   await deleteData(`${process.env.backurl}/api/recipe/${id}`)
   setDisplayConfirmationModal(false)
   window.location = "/recipes"
   }
   
  useEffect(() => {
    if (props.recipe !== undefined) {
      setRecipe(props.recipe)
    }
  }, [])
  
  function extractValue(string) {
    let match = string.match(/\d+\.?\d*/g);
    return match ? parseFloat(match[match.length-1]) : null;
  }

  function extractDate(createAt) {
    const date = new Date(createAt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const dateString = `${monthNames[monthIndex]} ${day}, ${year}`;
    return dateString;
  }

  const Somme = (MealRate)  => {
    var somme = 0;
    for (let i = 0; i < MealRate.length; i++) {
      somme += MealRate[i].rate;      
    }
    return somme;
  }
  return (
    <Container>
      <div className=" wd-section-heading-wrapper text-center">
        <div className="wd-service-heading wd-section-heading">
              <span className="heading-subtitle"> Recipe Details</span>
                  <h3 className="wow fadeIn">{/*Name :*/} <span className="wd-primary-color">{recipe.name}</span></h3>
              <p></p>
        </div>
      </div>
                    
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-5 col-md-5">
            <article id="post-157" className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
              <div className="post_img">
                <a >
                  <img key={recipe.imgRecipe} width="730" height="520" 
                  src={  recipe.imgRecipe == undefined || VerifImg(`${recipe.imgRecipe}`) == false 
                    ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
                    :`${process.env.backurl}${recipe.imgRecipe}`
                  } 
                  className=" wp-post-image" 
                  decoding="async" 
                  sizes="(max-width: 730px) 100vw, 730px"
                  alt="Recipe IMG"  />   
                </a>
              </div>
              <div className="post-info">
                <div className="post_meta">
                  {recipe.user.image != undefined &&
                    <span>
                        <img   className="avatar rounded-circle" 
                          src={ recipe.user.image == undefined || VerifImg(`/${recipe.user.image}`)  == false 
                          ?`${process.env.backurl}/uploads/User/altUser.png` 
                          :`${process.env.backurl}/${recipe.user.image}`
                        } 
                        alt="USER IMG" /> 
                        <a >{recipe.user.fullname}</a>
                    </span>
                  }
                  <span><a   key={recipe.createdAt}>{extractDate(recipe.createdAt)}</a></span>
                </div>
                <hr/>
                {cookies.get('user') && recipe.user._id == cookies.get('user')["_id"] &&
                <div className="wd-blog-bottom-meta">
                  <div className="wd-author-meta">
                      <div className="wd-post_date">
                        <a href={`/recipes/edit/${recipe._id}`} className="btn wd-btn-round-2">Edit</a>
                      </div>
                      <div className="wd-post_date">
                          <Button onClick={() => showDeleteModal(recipe._id)} className="btn wd-btn-round-2">Delete</Button>
                      </div>
                  </div>
                </div>
                }
                <hr/>
                <h2 className="post-title">
                  <a >Description</a></h2>
                <p key={recipe.description} className="post-excerpt">
                {recipe.description}                
                </p>
              </div>
            </article>
          </div> 
          <div className="col-12 col-lg-7 col-md-7">
            <article id="post-157" className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
              <div className="post-info">
                <h2 className="post-title">Total Calories ( {recipe.totalCalorie} Cal )</h2>
                <Table striped bordered hover size="sm" style={{margin:"0%"}} className="woocommerce-product-attributes shop_attributes">
                  <thead>
                    <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
                      <th className="woocommerce-product-attributes-item__label">Picture</th>
                      <th className="woocommerce-product-attributes-item__label">Food Item</th>
                      <th className="woocommerce-product-attributes-item__label">calories 100 g/ml</th>
                      <th>Percent</th>
                    </tr>
                  </thead>
                  <tbody>
                    { recipe.meals && recipe.meals.map 
                      ( (meal, index)=> {
                        return (
                          <tr key={index} className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
                            <td className="woocommerce-product-attributes-item__value">
                              <div className="post_meta">
                                <span>
                                    <img  className="wp-post-image" sizes="(max-width: 730px) 100vw, 730px"
                                    key={meal.imgMeal}
                                    
                                    src={ meal.imgMeal == undefined 
                                      // || VerifImg(`${meal.imgMeal}`)  == false  
                                    ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
                                    :`${process.env.backurl}${meal.imgMeal}`
                                  } 
                                    alt="Meal IMG" /> 
                                    </span>
                              </div>                                    
                              <div className="wd-shop-details-title-wrapper ">
                                  <div className="wd-shop-product-review-star">
                                      <div className="rating-star">
                                          <div className="star-rating" >
                                              <span style={{width:`${(Somme(meal.rate)/5)*100}%`}}></span>
                                          </div>
                                          {/* <div className="rating-count">
                                              <strong className="rating">{Somme(meal.rate)}</strong>
                                          </div>                                                                                                             */}
                                          {/* <span className="woocommerce-review-link" rel="nofollow">(<span className="count">2</span> reviews)</span> */}
                                      </div>
                                  </div>
                              </div>
                            </td>
                            <td key={meal.FoodItem} className="woocommerce-product-attributes-item__value">{meal.FoodItem}</td>
                            <td key={meal.calories_100g}  className="woocommerce-product-attributes-item__value">{meal.calories_100g}</td>
                            <td  className="woocommerce-product-attributes-item__value">
                              { ((extractValue(meal.calories_100g)*recipe.quantity[index])/recipe.totalCalorie*100).toFixed(2)} 
                              %
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
        </div>
      </div>
      <DeleteModal showModal={displayConfirmationModal} confirmModal={deleteOneRecipe} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
    </Container >
  )
}

