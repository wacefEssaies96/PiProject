import { Container, Button  } from "react-bootstrap";
import {  useState } from "react";
import { VerifImg, fetchData } from "@/services/mix";
import CalorieForm from "@/components/calories/CalorieForm";
import nextCookie from 'next-cookies'




export default function Index({ Myrecipesdb,recipesdb
  // ,usersdb 
  ,user}) {

  const [mylist, setmMylist] = useState(Myrecipesdb)
  const [list, setList] = useState(recipesdb)
  // var [userList, setUserList] = useState([])
  // const [userListdb, setUserListdb] = useState(usersdb)
  const [filtered, setFiltered] = useState();
  const [showfiltered, setShowfiltered] = useState(false);
  const [typefilter, setTypefilter] = useState();
  const [search, setSearch] = useState("");

  //   const refresh = async()=>{
  //     // userList=[]
  //     setList(recipesdb)
  //     if(recipesdb!=[]){
  //       recipesdb.forEach(async rec =>{
  //         const data = await fetchData(`${process.env.backurl}/api/users/findOne/${rec.user}`);
  //         userList.push(data);
  //       })
  //     }
  //    console.log("userList "+JSON.stringify(userList))
  //  }
  // useEffect(() => {
  //     list.forEach(async rec =>{
  //       addToUserList(rec.user);
  //     })
  //   console.log("userList "+JSON.stringify(userList))
  // }, [])

  // const VerifImg2=(path)=>{
  //   console.log("ii "+VerifImg(path).data) 
  //   return VerifImg(path).data
  // }
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
        item[filterColumn].toLowerCase().includes(searchQuery)
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
              // || VerifImg2(`${recipe.imgRecipe}`)  == undefined  
              ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
              :`${process.env.backurl}${recipe.imgRecipe}`
            } 
            alt="Recipe IMG" 
            className=" wp-post-image img-container" 
              decoding="async" 
              srcSet={ recipe.imgRecipe == undefined 
                // || VerifImg(`${recipe.imgRecipe}`)  == false  
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
                    // || VerifImg(`${userList[index].image}`)  == false  
                    ?`${process.env.backurl}/uploads/Recipe/altRecipe.jpg` 
                    :`${process.env.backurl}/${recipe.user.image}`
                  } 
                  alt="Verify image" /> 
                  
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
        <div id="search-1" className="widget widget_search"><h4 className="widget-title txtCenter">Add New Recipe</h4>
          <div
            className=" txtCenter greenBtn centerMydiv" >
            <a href={`/recipes/create`}>Create new Recipe</a>
          </div>
        
      </div>
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
                // || VerifImg(`${recipe.imgRecipe}`)  == false  
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
</div>
    </div>
                                <div className="col-lg-8">
                    <div className="row">

                    {showfiltered ?
                                 filtered.length>0 && filtered.map
                                ((recipe, index)=> {
                                    return (renderRecipe(recipe, index))
                                })
                                :
                                list.length>0 && list.map
                                ((recipe, index)=> {
                                    return (renderRecipe(recipe, index))
                                })
                            } 
                    </div>
                                            {/* <div className="row">
                            <div className="col-12">
                                <div className="pagination-wrap">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-12">
                                            
	<nav className="navigation pagination" aria-label=" ">
		<h2 className="screen-reader-text"> </h2>
		<div className="nav-links"><span aria-current="page" className="page-numbers current">1</span>
<a className="page-numbers" href="page/2/index.html">2</a>
<a className="next page-numbers" href="page/2/index.html">&raquo;</a></div>
	</nav>                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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