import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { fetchData } from "@/services/mix";
import CalorieForm from "@/components/calories/CalorieForm";
import nextCookie from 'next-cookies'




export default function Index({ Myrecipesdb,recipesdb ,user}) {

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
       
        <div className="col-12 col-lg-6 col-md-6">
        <article id="post-157" className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
                 <div className="post_img">
              <a key={recipe._id} href={`/recipes/details/${recipe._id}`}>
                 { (recipe.imgRecipe && (recipe.imgRecipe.endsWith('.jpg') || recipe.imgRecipe.endsWith('.png'))) 
                    ?
              <img key={recipe.imgRecipe} width="730" height="520" src={recipe.imgRecipe} className=" wp-post-image" 
                onError={(e) => { e.target.src = `${process.env.backurl}/uploads/Recipe/altRecipe.jpg` }}
                decoding="async" srcSet={recipe.imgRecipe} sizes="(max-width: 730px) 100vw, 730px" />         
                :
                <img key={recipe.imgRecipe} width="730" height="520"  className=" wp-post-image" 
                
                src={`${process.env.backurl}/uploads/Recipe/altRecipe.jpg`}
                onError={(e) => {
                  e.target.src = `${process.env.backurl}/uploads/Recipe/altRecipe.jpg`;
                }}
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
                   onError={(e) => { e.target.src = `${process.env.backurl}/uploads/User/altUser.png` }}
                   alt="Verify image" /> 
                    :
                    
                    <img   className="avatar rounded-circle" 
                    // key={user.image}
                    src={`${process.env.backurl}/uploads/User/altUser.png` }
                   onError={(e) => { e.target.src = `${process.env.backurl}/uploads/User/altUser.png` }}
                    alt="Verify image" /> 
                  }

                          
                         
                     <a href={`/recipes/details/${recipe._id}`}>John Martin</a></span>
                 <span><a href={`/recipes/details/${recipe._id}`}  key={recipe.createdAt}>{extractDate(recipe.createdAt)}</a></span>
              </div>
              <h2 className="post-title">
                <a key={recipe.name} href={`/recipes/details/${recipe._id}`}>{recipe.name}</a></h2>
              <h2 className="post-title">
                <a key={recipe.totalCalorie} href={`/recipes/details/${recipe._id}`}>{recipe.totalCalorie} cal</a></h2>
                
              <p key={recipe.description} className="post-excerpt">
              {recipe.description}                
              </p>
              <div className="wd-blog-bottom-meta">
                 <div className="wd-author-meta">
                    <div className="wd-post_date">
                       <a href={`/recipes/details/${recipe._id}`} className="btn wd-btn-round-2">Show More</a>
                    </div>
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
            
        <div id="search-1" className="widget widget_search"><h4 className="widget-title">Add New Recipe</h4>
          <div
            className=" txtCenter greenBtn" >
            <a href={`/recipes/create`}>Create new Recipe</a>
          </div>
        
      </div>
        <div id="tag_cloud-1" className="widget widget_tag_cloud"><h4 className="widget-title">Search type</h4><div className="tagcloud">

        <select 
                        className="greenBtn"   
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
            <div id="search-1" className="widget widget_search"><h4 className="widget-title">Search value</h4>
            <input 
                        className="greenBtn"   
                        onChange={filterList} placeholder="search" value={search} type="text"/>
</div>
<div id="categories-2" className="widget widget_categories"><h4 className="widget-title">Calorie</h4>
<CalorieForm user={user} />

			</div>
      <div id="weefly_recent_post-1" className="widget widget_weefly_recent_post"><h4 className="widget-title">My Recipes</h4>
        <div className="widget-posts">
          <ul>
            {
              mylist.slice(-3).map((recipe, index)=> {
                return(
              <li className="widget-post">
                <div className="post_thumb">
                  <a key={recipe._id} href={`/recipes/details/${recipe._id}`} className="post-thumb">
                  { (recipe.imgRecipe && (recipe.imgRecipe.endsWith('.jpg') || recipe.imgRecipe.endsWith('.png'))) 
                    ?
                    <img
                    key={recipe.imgRecipe}
                    src={recipe.imgRecipe}
                    onError={(e) => {
                      e.target.src = `${process.env.backurl}/uploads/Recipe/altRecipe.jpg`;
                    }}
                    />
                    :
                    <img
                    key={recipe.imgRecipe}
                    src={`${process.env.backurl}/uploads/Recipe/altRecipe.jpg`}
                    onError={(e) => {
                      e.target.src = `${process.env.backurl}/uploads/Recipe/altRecipe.jpg`;
                    }}
                    />
                  }
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
                                filtered.map
                                ((recipe, index)=> {
                                    return (renderRecipe(recipe, index))
                                })
                                :
                                list.map 
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

    const recipesdb = await fetchData(`${process.env.backurl}/api/recipe/findAll`);

    var Myrecipesdb =[];

    const { user } = nextCookie(ctx)
    if (user) {
      const id = user._id
      const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
      const u = await res.json()
      Myrecipesdb = await fetch(`${process.env.backurl}/api/recipe/MyRecipe/${id}`)
      Myrecipesdb = await Myrecipesdb.json()
      return {
        props: {
          Myrecipesdb : Myrecipesdb,
          recipesdb : recipesdb,
          user: u
        }
      }
    }
    return {
      props: {
        Myrecipesdb : Myrecipesdb,
        recipesdb : recipesdb,
        user: {
          height: "",
          weight: "",
          dateOfBirth: "",
          gender: "",
        }
      }
    }
}