import { deleteData, fetchData } from "@/services/mix";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Table,Button, Container, Form, Stack } from "react-bootstrap"

export default function RecipeDetails(props) {
  const router = useRouter()
  
  // const [operationMode, setOperationMode] = useState('Create')
  const [listMeal, setListMeal] = useState([])

  const [recipe, setRecipe] = useState({
    name : "",
    description :  "",
    quantity  :  "",
    totalCalorie :  "",
    imgRecipe  :  "",
    meals  :  "",
    user  :  ""
  })
  

  const deleteOneRecipe = async (id) =>{
   await deleteData(`${process.env.backurl}/api/recipe/${id}`)
   window.location = "/recipes"
   }
   
  const addToListMeals = async (id) =>{
   const data = await fetchData(`${process.env.backurl}/api/meal/findOne/${id}`);
   listMeal.push(data)
   console.log("listMeal "+listMeal.calories_100g)
   }
   const refresh =()=>{
      
      // setRecipe({...recipe,melas:[]})
      // setRecipe({...recipe,melas:props.recipe.meals})
      for (let i in props.recipe.meals){
         addToListMeals(props.recipe.meals[i])
         // console.log("addToListMeals "+props.recipe.meals[i].calories_100g)
      }
   }
  useEffect(() => {
    if (props.recipe !== undefined) {
      setRecipe(props.recipe)
    }
  }, [])
  
  function extractValue(string) {

   let match = string.match(/\d+\.?\d*/g);
   if(match)
       console.log(" extractValue : "+match)
   else
       console.log(" prob extractValue match  ")
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
        <div className="col-12 col-lg-6 col-md-6">
        <article id="post-157" className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
                 <div className="post_img">
              <a >
                 { (recipe.imgRecipe && (recipe.imgRecipe.endsWith('.jpg') || recipe.imgRecipe.endsWith('.png'))) 
                    ?
              <img key={recipe.imgRecipe} width="730" height="520" src={recipe.imgRecipe} className=" wp-post-image" 
                decoding="async" srcSet={recipe.imgRecipe} sizes="(max-width: 730px) 100vw, 730px" />         
                :
                
                
                <img key={recipe.imgRecipe} width="730" height="520"  className=" wp-post-image" 
                
                src={`${process.env.backurl}/uploads/Recipe/altRecipe.jpg`}
                
                 decoding="async" srcSet={`${process.env.backurl}/uploads/Recipe/altRecipe.jpg`} sizes="(max-width: 730px) 100vw, 730px" />      
                  
               }
                                          
                                          </a>
           </div>
                 <div className="post-info">
                    <div className="post_meta">
                 <span>
                  {/* //USER IMG */}
                 { (recipe.imgRecipe && (recipe.imgRecipe.endsWith('.jpg') || recipe.imgRecipe.endsWith('.png'))) 
                    ?
                    <img   className="avatar rounded-circle" 
                    src="#"
                    // key={user.image}
                    // src={user.image}
                    alt="USER IMG" /> 
                    :
                    
                    <img   className="avatar rounded-circle" 
                    // key={user.image}
                    src={`${process.env.backurl}/uploads/User/altUser.png` }
                    alt="USER IMG" /> 
                  }

                          
                         
                     <a >John Martin</a></span>
                 <span><a   key={recipe.createdAt}>{extractDate(recipe.createdAt)}</a></span>
              </div>
              <h2 className="post-title">
                <a >Description</a></h2>
                
              <p key={recipe.description} className="post-excerpt">
              {recipe.description}                
              </p>
              <div className="wd-blog-bottom-meta">
                 <div className="wd-author-meta">
                    <div className="wd-post_date">
                       <a href={`/recipes/edit/${recipe._id}`} className="btn wd-btn-round-2">Edit</a>
                    </div>
                    <div className="wd-post_date">
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
                        <Button onClick={() => deleteOneRecipe(recipe._id)} className="btn wd-btn-round-2">Delete</Button>
                    </div>
                 </div>
              </div>
           </div>
        </article>
     </div> 
        <div className="col-12 col-lg-6 col-md-6">
        <article id="post-157" className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
                 
                 
                 <div className="post-info">
              <h2 className="post-title">Total Calories ( {recipe.totalCalorie} Cal )</h2>
                
            <Button
            className="greenBtn"
             onClick={() => refresh()}>Refresh</Button>

      <Table striped bordered hover size="sm" style={{width:"80%",margin:"0 10%"}} className="woocommerce-product-attributes shop_attributes">
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
                 { (meal.imgMeal && (meal.imgMeal.endsWith('.jpg') || meal.imgMeal.endsWith('.png'))) 
                    ?
                    <img   className="avatar rounded-circle" 
                    key={meal.imgMeal}
                    src={meal.imgMeal}
                    alt="Meal IMG" /> 
                    :
                    
                    <img   className="avatar rounded-circle" 
                    key={meal.imgMeal}
                    src={`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` }
                    alt="Meal IMG" /> 
                  }
                     </span>
              </div>
        </td>
        <td key={meal.FoodItem} className="woocommerce-product-attributes-item__value">{meal.FoodItem}</td>
        <td key={meal.calories_100g}  className="woocommerce-product-attributes-item__value">{meal.calories_100g}</td>
        <td  className="woocommerce-product-attributes-item__value">{ (extractValue(meal.calories_100g)/recipe.totalCalorie*100).toFixed(2)} %</td>


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

