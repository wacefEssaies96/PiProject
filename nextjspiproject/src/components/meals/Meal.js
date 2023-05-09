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

  
  const [Page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(12);
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
                    
                    <div className="wd-feature-products ">
                        <div className="row">
                            {currentlist && currentlist.map 
                                ((meal, index)=> {
                                    return (renderMeal(meal, index))
                                })
                            }
                            {/* {showfiltered ?
                                filtered && 
                                <>
                                {filtered.map
                                ((meal, index)=> {
                                    return (renderMeal(meal, index))
                                })}
                                <div>hi</div>
                                </>
                                :
                                list && list.map 
                                ((meal, index)=> {
                                    return (renderMeal(meal, index))
                                })
                            }  */}
                        </div>
                    </div>

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

                </div>
            </div>
        </div>
    </div>
    </Container>
  )
}
