import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";



export default function Meal({ mealsdb }) {

  const [list, setList] = useState(mealsdb)
  const [filtered, setFiltered] = useState();
  const [showfiltered, setShowfiltered] = useState(false);
  const [typefilter, setTypefilter] = useState();
  const [search, setSearch] = useState("");

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
                    {/* <span>
                        <a href="#" 
                    className="button button product_type_simple add_to_cart_button ajax_add_to_cart product_type_simple"
                    ><i className="sl icon-basket"></i></a></span> */}
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
  return (
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
                                list && list.map 
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
  )
}