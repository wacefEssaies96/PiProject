import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { deleteData,fetchData } from "@/services/mix";
import { addMealScrap, fetchMealsUrl } from "@/services/meal";
import Link from "next/link";



export default function Index({ catMeals,meals,mealsdb }) {

  const [catlist, setCatlist] = useState(catMeals)
  const [list, setList] = useState(mealsdb)
  const [listdb, setListdb] = useState(mealsdb)
  const [filtered, setFiltered] = useState();
  const [showfiltered, setShowfiltered] = useState(false);
  const [typefilter, setTypefilter] = useState();
  const [search, setSearch] = useState("");


  const [showServing_100g, setshowServing_100g] = useState(true)
  const [showServing_portion, setshowServing_portion] = useState(false)
  const [showServing_oz, setshowServing_oz] = useState(false)
  


  const showServingFilter = (filter) =>{
    setshowServing_100g(false)
    setshowServing_portion(false)
    setshowServing_oz(false)
    if(filter == "100g")
      setshowServing_100g(true)
    if(filter == "portion")
      setshowServing_portion(true)
    if(filter == "oz")
      setshowServing_oz(true)
  }
  const handleSubmit = async (meal) => {
    await addMealScrap(meal)
    setListdb(await fetchData(`${process.env.backurl}/api/meal/findAll`));
    // setList(await fetchData(`${process.env.backurl}/api/meal/findAll`));
  }
  const verifyMeal = (FoodItem) => {
    let searchMeal = null
    searchMeal = listdb.find((meal) => meal.FoodItem == FoodItem)
    return searchMeal
  }
  const filterList = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearch(searchQuery)
    let filterColumn ="FoodItem";
    if(typefilter!=undefined){
      filterColumn =typefilter;
    }
    const filteredList = list.filter((item) =>
      item[filterColumn].toLowerCase().includes(searchQuery)
    );
    if(searchQuery!=""){
      setFiltered(filteredList);
      setShowfiltered(true)
    }else{
      setShowfiltered(false)
    }
  }
  const refreshCategory = async (c) => setList(await fetchData(`${process.env.backurl}/api/meal/scrape?url=`+c))

  const getdataMeal = async () => {
    setListdb(await fetchData(`${process.env.backurl}/api/meal/findAll`));
    setList(await fetchData(`${process.env.backurl}/api/meal/findAll`));
    }
    
  const deleteOneMeal = async (id) =>{
    await deleteData(`${process.env.backurl}/api/meal/${id}`)
    setListdb(await fetchData(`${process.env.backurl}/api/meal/findAll`));
    setList(await fetchData(`${process.env.backurl}/api/meal/findAll`));
  
    }
  const renderMeal = (meal, index) =>{
    
    return (
      <tr key={index} className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
        
        <td key={meal.imgMeal}>
          <div className="designation-profile-img">
            
            { 
            meal.imgMeal
              ?
              <img style={{ height: '10 rem', width: '10 rem' }}
                src={`${process.env.backurl}${meal.imgMeal}`}
                alt="verifiy img"
              />
              :
              <img style={{ height: '10 rem', width: '10 rem' }}
                src={`${process.env.backurl}/uploads/Meal/altMeal.jpg`}
                alt="no img altMeal.jpg"
              />
            }
              
          </div>
        </td>
        <td key={meal.FoodCategory+meal.index} className="woocommerce-product-attributes-item__value">{meal.FoodCategory}</td>
        <td key={meal.FoodItem}  className="woocommerce-product-attributes-item__value">{meal.FoodItem}</td>
        
        {showServing_100g ? 
        <><td key={meal.serving_size_100g} className="woocommerce-product-attributes-item__value">{meal.serving_size_100g}</td>
        <td key={meal.calories_100g} className="woocommerce-product-attributes-item__value">{meal.calories_100g}</td></>
        :
        showServing_portion ? 
        <><td key={meal.serving_size_portion} className="woocommerce-product-attributes-item__value">{meal.serving_size_portion}</td>
        <td key={meal.calories_portion} className="woocommerce-product-attributes-item__value">{meal.calories_portion}</td></>
        :
        showServing_oz &&
        <><td key={meal.serving_size_oz} className="woocommerce-product-attributes-item__value">{meal.serving_size_oz}</td>
        <td key={meal.calories_oz} className="woocommerce-product-attributes-item__value">{meal.calories_oz}</td></>
        }

        <td 
        // key={meal._id}
        >
          {meal._id?
            <>
              <Link className="btn btn-outline-secondary me-3 ms-3" href={`/admin/meals/edit/${meal._id}`}>Edit</Link>
              &nbsp;
              {meal.validated ?<></>
                :
                <Button onClick={() => deleteOneMeal(meal._id)} variant="outline-danger">Delete</Button>
              }
            </>
            :
            <>
            {verifyMeal(meal.FoodItem)
              ?
              "This Meal exist"
              :                    
              <Button onClick={() => handleSubmit(meal)}>Add meal</Button>
            }
            </>
          }
        </td> 
      </tr>
    )
  }
  return (
    <Container className="woocommerce-Tabs-panel woocommerce-Tabs-panel--additional_information panel entry-content wc-tab">
      
      <div className=" wd-section-heading-wrapper text-center">
      <div className="wd-service-heading wd-section-heading">
        <span className="heading-subtitle ">List of Meals</span>
        </div>
        </div>
        
        <hr/>
        <div className="container">
          <div className="row">

              <div className=" col-12 col-lg-4 sidebar">
                <div className="widget widget_search"><h4 className="widget-title txtCenter">Add New Meal</h4>
                  <div className=" txtCenter greenBtn centerMydiv" >
                    <Link href={`/admin/meals/create`}>Create new meal</Link>
                  </div>
                </div>
              </div>

              <div className=" col-12 col-lg-4 sidebar">
                <div  className="widget widget_search"><h4 className="widget-title txtCenter"> Meals from dataBase</h4>
                  <div className=" txtCenter  centerMydiv" >
                    <Button className="greenBtn"
                    onClick={() => getdataMeal()}>Get meals</Button>
                  </div>
                </div>
              </div>

              <div className=" col-12 col-lg-4 sidebar">
                <div  className="widget widget_search"><h4 className="widget-title txtCenter"> Meals from Scraping</h4>
                  <div className=" txtCenter  centerMydiv" >
                    <select 
                      className="greenBtn"            
                      onClick={(event) => refreshCategory(event.target.value)}>
                      {catlist.map((catMeal, index1) => (
                        <option
                        key={index1} value={catMeal.hrefCatMeals}>
                          {catMeal.nameCatMeals}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="sidebar">
                <div  className="widget widget_search"><h4 className="widget-title txtCenter"> Filter List </h4>

                <Row >
                    <div className=" txtCenter  centerMydiv  col-12 col-lg-4 " >
                      <select 
                      className="greenBtn"    
                        onChange={(event) => showServingFilter(event.target.value)}
                        >
                        <option value="100g"> Serving_size_100g </option>
                        <option value="portion"> serving_size_portion </option>
                        <option value="oz"> serving_size_oz </option>
                      </select>
                    </div>
                  <div className=" txtCenter  centerMydiv  col-12 col-lg-4 " >
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
                      <option value="calories_portion"> Calorie Portion </option>
                      <option value="calories_oz"> Calorie Oz </option>
                    </select>
                  </div>
                  
                
                  <div className=" txtCenter  centerMydiv  col-12 col-lg-4 " >
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
        
      <Table striped bordered hover size="sm"  className="woocommerce-product-attributes shop_attributes">
        <thead>
          <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_conditions">
            <th>Picture</th>
            <th className="woocommerce-product-attributes-item__label">Food<br/>Category</th>
            <th className="woocommerce-product-attributes-item__label">Food<br/>Item</th>
            {showServing_100g ? <><th className="woocommerce-product-attributes-item__label">Serving Size<br/>100 g/ml</th><th className="woocommerce-product-attributes-item__label">Calories<br/>100 g/ml</th></>:
            showServing_portion ? <><th className="woocommerce-product-attributes-item__label">Serving<br/>Portion</th><th className="woocommerce-product-attributes-item__label">Calories<br/>Portion</th></>:
            showServing_oz ? <><th className="woocommerce-product-attributes-item__label">Serving Size<br/>Oz</th><th className="woocommerce-product-attributes-item__label">Calories<br/>Oz</th></>:
            <><th className="woocommerce-product-attributes-item__label">Serving</th><th className="woocommerce-product-attributes-item__label">calories</th></>  }
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showfiltered ?
          filtered.map
          ((meal, index)=> {
            return (renderMeal(meal, index))
          })
          :
          list.map 
          ((meal, index)=> {
            return (renderMeal(meal, index))
          })
          } 
        </tbody>
      </Table>
    </Container>
  )
}

export async function getServerSideProps() {
  var data = [];
  var catMeals = [];
  //// const urlcatMeal = "https://www.calories.info/food/fruit-juices"
  //// const data = await fetchData(`${process.env.backurl}/api/meal/scrape/${urlcatMeal}`);

  catMeals = await fetchData(`${process.env.backurl}/api/meal/scrapeCatMeals`);
  data = await fetchData(`${process.env.backurl}/api/meal/scrape`);
  const mealsdb = await fetchData(`${process.env.backurl}/api/meal/findAll`);

  return {
    props: {
      catMeals: catMeals
      ,
      meals: data
      ,
      mealsdb : mealsdb
    }
  }
}