import { deleteData, fetchData,VerifImg } from "@/services/mix";
import { Cookies } from 'react-cookie'
import { useEffect, useState } from "react"
import { Table,Button, Container, Form, Stack } from "react-bootstrap"

const cookies = new Cookies();
export default function RecipeDetails(props) {
  
  // const [operationMode, setOperationMode] = useState('Create')
  const [listMeal, setListMeal] = useState([])
  const [totalCalorie, setTotalCalorie] = useState(0)

  const [listMealoneTime, setListMealoneTime] = useState(true)

  const [recipe, setRecipe] = useState({
    name : "",
    description :  "",
    quantity  :  "",
    totalCalorie :  "",
    imgRecipe  :  "",
    meals  :  "",
    user  :  ""
  })
  
  const [userOfRecipe, setUserOfRecipe] = useState()

  const deleteOneRecipe = async (id) =>{
   await deleteData(`${process.env.backurl}/api/recipe/${id}`)
   window.location = "/recipes"
   }
   
   
   const refresh = async ()=>{
      setTotalCalorie(recipe.totalCalorie)
      // setRecipe({...recipe,melas:[]})
      setRecipe({...recipe,melas:props.recipe.meals})
      for (let i in recipe.meals){
        if (listMealoneTime) {
          const data = await fetchData(`${process.env.backurl}/api/meal/findOne/${recipe.meals[i]}`);
          listMeal.push(data)
        }
      }
      setListMealoneTime(false)
   }
   
  const addToUserOfRecipe = async (id) =>{
    const data = await fetchData(`${process.env.backurl}/api/users/findOne/${id}`);
    setUserOfRecipe(data)
  }
  useEffect(() => {
    
    if (props.recipe !== undefined) {
      setRecipe(props.recipe)
      addToUserOfRecipe(props.recipe.user)
      
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
                      {userOfRecipe != undefined &&
                 <span>
                    <img   className="avatar rounded-circle" 
                    
                      src={ userOfRecipe.image == undefined || VerifImg(`/${userOfRecipe.image}`)  == false 
                      ?`${process.env.backurl}/uploads/User/altUser.png` 
                      :`${process.env.backurl}/${userOfRecipe.image}`
                    } 
                    alt="USER IMG" /> 

                          
                         
                     <a >{userOfRecipe.fullname}</a>
                     </span>
                     }
                 <span><a   key={recipe.createdAt}>{extractDate(recipe.createdAt)}</a></span>
              </div>
              <hr/>
              {cookies.get('user') && recipe.user == cookies.get('user')["_id"] &&
              <div className="wd-blog-bottom-meta">
                 <div className="wd-author-meta">
                    <div className="wd-post_date">
                       <a href={`/recipes/edit/${recipe._id}`} className="btn wd-btn-round-2">Edit</a>
                    </div>
                    <div className="wd-post_date">
                        <Button onClick={() => deleteOneRecipe(recipe._id)} className="btn wd-btn-round-2">Delete</Button>
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
              <h2 className="post-title">Total Calories ( {totalCalorie} Cal )</h2>
                
            <Button
            className="greenBtn"
             onClick={() => refresh()}>Refresh</Button>

      <Table striped bordered hover size="sm" style={{margin:"0%"}} className="woocommerce-product-attributes shop_attributes">
        <thead>
          <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
            <th className="woocommerce-product-attributes-item__label">Picture</th>
            <th className="woocommerce-product-attributes-item__label">FoodItem</th>
            <th className="woocommerce-product-attributes-item__label">calories_100 g/ml</th>
            <th>Percent</th>
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
                    
                    src={ meal.imgMeal == undefined || VerifImg(`${meal.imgMeal}`)  == false  
                    ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
                    :`${process.env.backurl}${meal.imgMeal}`
                  } 
                    alt="Meal IMG" /> 
                     </span>
              </div>
        </td>
        <td key={meal.FoodItem} className="woocommerce-product-attributes-item__value">{meal.FoodItem}</td>
        <td key={meal.calories_100g}  className="woocommerce-product-attributes-item__value">{meal.calories_100g}</td>
        <td  className="woocommerce-product-attributes-item__value">{ ((extractValue(meal.calories_100g)*recipe.quantity[index])/recipe.totalCalorie*100).toFixed(2)} %</td>


      </tr>
       )}
       )
         }
        </tbody>
      </Table>
              
           </div>
        </article>
     </div> 
     </div></div>
    </Container >
    
  )
}

