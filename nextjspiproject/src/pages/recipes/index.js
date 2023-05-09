import { Container, Button  } from "react-bootstrap";
import {  useState } from "react";
import { fetchData } from "@/services/mix";
import CalorieForm from "@/components/calories/CalorieForm";
import nextCookie from 'next-cookies'

export default function Index({ Myrecipesdb,recipesdb,user}) {

  const [mylist, setmMylist] = useState(Myrecipesdb)
  const [list, setList] = useState(recipesdb)
  const [filtered, setFiltered] = useState();
  const [showfiltered, setShowfiltered] = useState(false);
  const [typefilter, setTypefilter] = useState();
  const [search, setSearch] = useState("");

  const filterList = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearch(searchQuery)
    let filterColumn ="name";
    if(typefilter!=undefined){
      filterColumn =typefilter;
    }
    var filteredList=[];
    if(filterColumn == "totalCalorie")
    {
      filteredList = list.filter((item) =>
      Number(item[filterColumn]) >= Number(searchQuery)
    );
    }
    else{
      filteredList = list.filter((item) =>
        item[filterColumn] && item[filterColumn].toString().toLowerCase().includes(searchQuery)
      );
    }
    if(searchQuery!=""){
      setFiltered(filteredList);
      setShowfiltered(true)
    }else{
      setShowfiltered(false)
    }
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

  const renderRecipe = (recipe, index) =>{
    return (
      <div key={index} className="col-12 col-lg-6 col-md-6">
      <article id="post-157" className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
        <div className="post_img">
          <a key={recipe._id} href={`/recipes/details/${recipe._id}`}>
             
             
            <img key={recipe.imgRecipe} 
            // style={{width: "730px",height:"520px"}} 
            // width="730" height="520" 
            
            src={ recipe.imgRecipe == undefined 
              ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
              :`${process.env.backurl}${recipe.imgRecipe}`
            } 
            alt="Recipe IMG" 
            className=" wp-post-image img-container" 
              decoding="async" 
              srcSet={ recipe.imgRecipe == undefined 
              ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
              :`${process.env.backurl}${recipe.imgRecipe}`
            }  /> 
          </a>
        </div>
        <div className="post-info">
          <div className="post_meta">
            {/* //USER IMG */}
            {recipe.user && recipe.user.image  
              ? 
                <span>
                  <img  key={recipe.user.image}  className="avatar rounded-circle" 
                  src={ recipe.user.image == undefined 
                    ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
                    :`${process.env.backurl}/${recipe.user.image}`
                  } 
                  alt="ImgUser" /> 
                  
                  <a key={recipe.user.fullname} href={`/recipes/details/${recipe._id}`}>{recipe.user.fullname}</a>

                </span>                     
              :
                ""
            }
            {/* {userList[index] && userList.length>0  
              ? 
                <span>
                  <img  key={userList[index].image}  className="avatar rounded-circle" 
                  src={ userList[index].image == undefined 
                    // || VerifImg(`${userList[index].image}`)  == false  
                    ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
                    :`${process.env.backurl}/${userList[index].image}`
                  } 
                  alt="Verify image" /> 
                  
                  <a key={userList[index].fullname} href={`/recipes/details/${recipe._id}`}>{userList[index].fullname}</a>

                </span>                     
              :
                ""
            } */}
            <span><a href={`/recipes/details/${recipe._id}`}  key={recipe.createdAt}>{extractDate(recipe.createdAt)}</a></span>
          </div>
          <h2 className="post-title">
            <a key={recipe.name} href={`/recipes/details/${recipe._id}`}>{recipe.name}</a>
          </h2>
          <h2 className="post-title">
            <a key={recipe.totalCalorie} href={`/recipes/details/${recipe._id}`}>{recipe.totalCalorie} cal</a>
          </h2>
          <p className="paragraph-container post-excerpt" key={recipe.description} >
            {recipe.description}                
          </p>
          <div className="wd-blog-bottom-meta">
              <div className="wd-author-meta">
                <div className="wd-post_date">
                    <a href={`/recipes/details/${recipe._id}`} className="btn wd-btn-round-2">Show More </a>
                </div>
                &nbsp;
                { recipe.user._id == user._id && recipe.validated
                &&
                <div className="post_meta" >
                  <span style={{fontFamily : "bold",fontSize : "20px"}}>Published</span>
                </div>
                }
                { recipe.user._id == user._id && !recipe.validated
                &&
                <div className="post_meta" >
                  <span style={{fontFamily : "bold",fontSize : "20px"}}>Not Published</span>
                </div>
                }
              </div>
          </div>
        </div>
      </article>
     </div> 
    )
  }

    
  const [Page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(6);
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
            <span className="heading-subtitle">Featured Repices</span>
                <h3 className="wow fadeIn">Our Latest & <span className="wd-primary-color">Featured Repices</span></h3>
            <p></p>
        </div>
      </div>
      <div className="wd-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="sidebar">
                {user._id &&
                  <div id="search-1" className="widget widget_search"><h4 className="widget-title txtCenter">Add New Recipe</h4>
                    <div
                      className=" txtCenter greenBtn centerMydiv" >
                      <a href={`/recipes/create`}>Create new Recipe</a>
                    </div>
                  </div>
                }
                <div id="tag_cloud-1" className="widget widget_tag_cloud"><h4 className="widget-title txtCenter">Search type</h4><div className="tagcloud">
                    <select 
                      className="greenBtn centerMydiv"   
                          onChange={(event) =>{
                          setTypefilter(event.target.value);
                          setSearch("")
                          setShowfiltered(false)
                          }
                          }
                          >
                          <option value="name"> Name </option>
                          <option value="totalCalorie"> Calorie 100 g/ml </option>
                      </select>
                  </div>
                </div>    
                <div id="search-1" className="widget widget_search"><h4 className="widget-title txtCenter">Search value</h4>
                  <input 
                  className="greenBtn centerMydiv" 
                  onChange={filterList} placeholder="search" value={search} type="text"/>
                </div>
                
                {user._id &&
                  <>
                    <div id="categories-2" className="widget widget_categories"><h4 className="widget-title txtCenter">Calorie</h4>
                      <CalorieForm user={user} />
                    </div>
                    <div id="weefly_recent_post-1" className="widget widget_weefly_recent_post"><h4 className="widget-title txtCenter">My Recipes</h4>
                      <div className="widget-posts">
                        <ul>
                          {mylist.length>0 &&
                            mylist.slice(-3).map((recipe, index)=> {
                              return(
                                <li  key={"li"+index} className="widget-post">
                                  <div className="post_thumb">
                                    <a key={recipe._id} href={`/recipes/details/${recipe._id}`} className="post-thumb">
                                      <img
                                      key={recipe.imgRecipe}
                                      src={ recipe.imgRecipe == undefined 
                                      ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
                                      :`${process.env.backurl}${recipe.imgRecipe}`
                                        }
                                      />
                                    </a>
                                  </div>
                                  <div className="recent-content-wrap">
                                    <p className="post-date wd-primary-color" key={recipe.createdAt}>{extractDate(recipe.createdAt)}</p>
                                      <h6><a key={recipe.name} href={`/recipes/details/${recipe._id}`} className="post-title black-color">{recipe.name} ({recipe.totalCalorie} Cal )</a></h6>
                                  </div>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>  
                  </>
                }  
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                {currentlist && currentlist.map 
                    ((recipe, index)=> {
                        return (renderRecipe(recipe, index))
                    })
                }
                    {/* {showfiltered ?
                                 filtered.length>0 && filtered.map
                                ((recipe, index)=> {
                                    return (renderRecipe(recipe, index))
                                })
                                :
                                list.length>0 && list.map
                                ((recipe, index)=> {
                                    return (renderRecipe(recipe, index))
                                })
                            }  */}
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

export async function getServerSideProps(ctx) {

    // const usersdb = await fetchData(`${process.env.backurl}/api/users/findAll`);
    var recipesdb = await fetchData(`${process.env.backurl}/api/recipe/Validated`);

    var Myrecipesdb =[];

    const { user } = nextCookie(ctx)
    if (user) {
      recipesdb =[];
      const id = user._id
      const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
      const u = await res.json()
      Myrecipesdb = await fetch(`${process.env.backurl}/api/recipe/MyRecipe/${id}`)
      Myrecipesdb = await Myrecipesdb.json()
      recipesdb = await fetchData(`${process.env.backurl}/api/recipe/Validated/${id}`);


      return {
        props: {
          Myrecipesdb : Myrecipesdb,
          recipesdb : recipesdb,
          // usersdb : usersdb,
          user: u
        }
      }
    }
    return {
      props: {
        Myrecipesdb : Myrecipesdb,
        recipesdb : recipesdb,
        // usersdb : usersdb,
        user: {
          height: "",
          weight: "",
          dateOfBirth: "",
          gender: "",
        }
      }
    }
}