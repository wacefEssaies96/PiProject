import { Container, Table, Button, Row } from "react-bootstrap";
import { useState } from "react";
import { deleteData,fetchData } from "@/services/mix";
import { addMealScrap } from "@/services/meal";
import Link from "next/link";
import DeleteModal from "@/components/layouts/DeleteModal";
import { useRouter } from "next/router";
import {  BiEdit, BiTrashAlt } from 'react-icons/bi'




export default function Index({ catMeals,mealsdb }) {

  const router = useRouter();

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
  
  const [id, setId] = useState(null)
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(null)
  
  const showDeleteModal = (id) => {
    setId(id)
    setDeleteMessage(`Are you sure you want to delete the  : '${list.find((x) => x._id === id).FoodItem}' from Meals  ?`)
    setDisplayConfirmationModal(true)
  }
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }


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
    window.location = "/admin/meals" 

    // setListdb(await fetchData(`${process.env.backurl}/api/meal/findAll`));
    
    // router.replace(router.asPath);
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
    let filterColumn ="FoodCategory";
    if(typefilter!=undefined){
      filterColumn =typefilter;
    }
    const filteredList = list.filter((item) =>
      item[filterColumn] && item[filterColumn].toString().toLowerCase().includes(searchQuery)
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
    setDisplayConfirmationModal(false)
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
              <Link className="btn btn-outline-secondary me-3 ms-3" href={`/admin/meals/edit/${meal._id}`}>
                <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
              </Link>
              &nbsp;
              {meal.validated ?<></>
                :
                <Button onClick={() => showDeleteModal(meal._id)} variant="outline-danger">
                  <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                </Button>
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
  
  const [Page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const indexOfLastpage = Page * itemPerPage;
  const indexOfFirstpage = indexOfLastpage -itemPerPage;
  const pageNumbers = [];
  var currentlist = Array.isArray(list) ? list.slice(indexOfFirstpage, indexOfLastpage) : [];

  if(showfiltered){
    for (let i = 1; i <= Math.ceil(filtered.length / itemPerPage); i++) {
        pageNumbers.push(i);
    }
    currentlist = filtered.slice(indexOfFirstpage, indexOfLastpage)
  }else{
    for (let i = 1; i <= Math.ceil(list.length / itemPerPage); i++) {
        pageNumbers.push(i);
    }
    currentlist = list.slice(indexOfFirstpage, indexOfLastpage)
  }

  const renderPageNumbers = pageNumbers.slice(Page-1,Page).map(number => {
      return (
          <li
              key={number}
              id={number}

              className={Page === number ? "page-item color-picker " : "page-item"}
              onClick={() => setPage(number)}
          >
            {Page === number
            ?
            <a className="page-number current " style={{backgroundColor : "#016837",color: "white" }} >{number}  / {pageNumbers.length}</a>
            :
              <a className="page-number " >{number} / {pageNumbers.length}</a>
            }
          </li>
      );
  });
  const changepage = async (nbr) =>{
    var newnbr = Page+nbr;
    if(pageNumbers.includes(newnbr)){
      setPage(newnbr)
    }
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
          {currentlist && currentlist.map 
              ((meal, index)=> {
                  return (renderMeal(meal, index))
              })
          }
          {/* {showfiltered ?
          filtered.map
          ((meal, index)=> {
            return (renderMeal(meal, index))
          })
          :
          list.map 
          ((meal, index)=> {
            return (renderMeal(meal, index))
          })
          }  */}
        </tbody>
      </Table>

      <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center ">
              <div className="nav-links">
                {Page != pageNumbers[0] &&
                  <a className="prev page-numbers "  onClick={()=>changepage(-1)}>&laquo;</a>
                }
                {renderPageNumbers}
                {Page != pageNumbers[pageNumbers.length-1] &&
                  <a className="next page-numbers" onClick={()=>changepage(1)} >&raquo;</a>
                }
              </div>
          </ul>
      </nav>
      <DeleteModal showModal={displayConfirmationModal} confirmModal={deleteOneMeal} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />

    </Container>
  )
}

export async function getServerSideProps() {
  var data = [];
  var catMeals = [];
  //// const urlcatMeal = "https://www.calories.info/food/fruit-juices"
  //// const data = await fetchData(`${process.env.backurl}/api/meal/scrape/${urlcatMeal}`);

  catMeals = await fetchData(`${process.env.backurl}/api/meal/scrapeCatMeals`);
  // data = await fetchData(`${process.env.backurl}/api/meal/scrape`);
  const mealsdb = await fetchData(`${process.env.backurl}/api/meal/findAll`);

  return {
    props: {
      catMeals: catMeals
      // ,
      // meals: data
      ,
      mealsdb : mealsdb
    }
  }
}