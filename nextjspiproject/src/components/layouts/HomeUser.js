import { Store } from '@/utils/Store';
import React, { useContext } from 'react'
import { FcSportsMode } from 'react-icons/fc';
import { GiMeal } from 'react-icons/gi';
import { MdArticle } from 'react-icons/md';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import axios from "axios";
import { toast } from 'react-toastify';




function HomeUser({ prods, doctors, articles, meals }) {

  const { state, dispatch } = useContext(Store);

  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    console.log('hi');
    const quantityy = existItem ? existItem.quantityy + 1 : 1;
    const { data } = await axios.get(
      `${process.env.backurl}/api/admin/products/find/${product._id}`
    );
    if (data.quantity < quantityy) {
      toast.error('Sorry. Product is out of stockk');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantityy } });

    toast.success('Product added to the cart');
  };

  const Somme = (MealRate) => {
    var somme = 0;
    for (let i = 0; i < MealRate.length; i++) {
      somme += MealRate[i].rate;
    }
    return somme;
  }

  return (
    <>
        <div className="container">

            <div
              data-vc-full-width="true"
              data-vc-full-width-init="false"
              className="vc_row wpb_row vc_row-fluid 
               bg-fixed vc_custom_1639462258372 vc_row-has-fill"
            >
              <div className="wpb_column vc_column_container vc_col-sm-12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    {" "}
                    <div className="row ">
                      <div className="col-xl-7 col-lg-7 cta-self-left">
                        <div className="cta-left">
                          <div className="wd-section-heading-left">
                            <div className="wd-about-page-text">
                              <h5 className="wow fadeIn">
                                Improving Your Health &amp; Wellness
                              </h5>

                            </div>
                            <div className="wd-about-button">
                              <a
                                href="/about-us"
                                className="btn wd-btn-round-2"
                              >
                                Our Service & Our Team
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-5 col-lg-5">
                        <div className="cta-right">
                          <div className="wd-right-icons">
                            <div className="wd-right-img">
                              <MdProductionQuantityLimits style={{ color: "white" }} size={65} />
                            </div>
                            <div className="wd-right-content">
                              <h5>Healthy Food Product</h5>
                            </div>
                          </div>
                          <div className="wd-right-icons">
                            <div className="wd-right-img">
                              <FcSportsMode size={65} />
                            </div>
                            <div className="wd-right-content">
                              <h5> Sport Training</h5>
                            </div>
                          </div>
                          <div className="wd-right-icons">
                            <div className="wd-right-img">
                              <MdOutlineHealthAndSafety style={{ color: "white" }} size={65} />

                            </div>
                            <div className="wd-right-content">
                              <h5>Appointement with Doctor</h5>
                            </div>
                          </div>
                          <div className="wd-right-icons">
                            <div className="wd-right-img">

                              <MdArticle size={65} />
                            </div>
                            <div className="wd-right-content">
                              <h5>Articles</h5>
                            </div>
                          </div>
                          <div className="wd-right-icons">
                            <div className="wd-right-img">

                              <GiMeal size={65} style={{ color: "white" }} />
                            </div>
                            <div className="wd-right-content">
                              <h5> Healthy Meals </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vc_row-full-width vc_clearfix" />
            <div className="vc_row wpb_row vc_row-fluid wd-section">
              <div className="wpb_column vc_column_container vc_col-sm-12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    {" "}
                    <div className=" vc_custom_1576221992965 wd-section-heading-wrapper text-center">
                      <div className="wd-service-heading wd-section-heading">
                        <span className="heading-subtitle">Our Products</span>
                        <h3 className="wow fadeIn">
                          Our Latest {" "}
                          <span className="wd-primary-color">& Featured Products</span>
                        </h3>
                        <p />
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-12">
                        <div className="wd-q-shop-tabs">

                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade active show"
                              id="hybrid"
                              role="tabpanel"
                            >
                              <div className="wd-q-shop-product">
                                <div className="row">

                                  {prods &&
                                    prods.slice(-9, 3).map((product, index) => {
                                      return (
                                        <div key={index} className="col-lg-3 col-md-6">
                                          <div className="product-grid">
                                            <div className="product-item-top indica">
                                              <div className="product-type">

                                                <a
                                                  href={`/e-commerce/${product._id}`}
                                                >
                                                  {product.category}
                                                </a>
                                              </div>
                                            </div>
                                            <div className="product-image4">
                                              <a href={`/e-commerce/${product._id}`}>
                                                <img
                                                  className="pic-1"
                                                  src={`${process.env.backurl}/${product.images[0].replace(/\\/g, "/")}`}
                                                  alt="img"
                                                />
                                              </a>
                                            </div>
                                            <div className="woocommerce"></div>
                                            <div className="product-content">
                                              <h5 className="product-type">
                                                <a href={`/e-commerce/${product._id}`}>
                                                  {product.name}
                                                </a>
                                              </h5>
                                              {/* <h6>Little Bloom</h6>
                                            <p className="product-type">
                                              <span>CBD:</span> 65%
                                            </p>
                                            <p className="product-type">
                                              <span>THC:</span> 40%
                                            </p> */}
                                              {" "}
                                              <div className="social produc-archive-controls">
                                                <a
                                                  href={`/e-commerce/${product._id}`}
                                                  title="Quick View"
                                                  className="yith-wcqv-button"
                                                  data-product_id={116}
                                                >
                                                  <i className="fa fa-eye" />{" "}
                                                </a>
                                                <div
                                                  className="yith-wcwl-add-to-wishlist add-to-wishlist-116  wishlist-fragment on-first-load"
                                                  data-fragment-ref={116}
                                                  data-fragment-options='{"base_url":"","in_default_wishlist":false,"is_single":false,"show_exists":false,"product_id":"116","parent_product_id":116,"product_type":"simple","show_view":false,"browse_wishlist_text":"Browse wishlist","already_in_wishslist_text":"The product is already in your wishlist!","product_added_text":"Product added!","heading_icon":"fa-heart-o","available_multi_wishlist":false,"disable_wishlist":false,"show_count":false,"ajax_loading":false,"loop_position":"shortcode","item":"add_to_wishlist"}'
                                                ></div>
                                              </div>
                                              <div className="price">
                                                <p>$ {product.price.toFixed(2)}</p>{" "}
                                              </div>
                                              <div
                                                className="inner-add-to-cart"
                                                data-loading-text="<i class='fa fa-spinner fa-spin '></i> Processing Order"
                                              >
                                                <a
                                                  data-quantity={1}
                                                  className="button product_type_simple add_to_cart_button"
                                                  data-product_id={116}
                                                  data-product_sku="Product-12"
                                                  rel="nofollow"
                                                  onClick={() => addToCartHandler(product)}
                                                >
                                                  Add to cart
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center  vc_custom_1573827939129">
                      <a href="/e-commerce" className="btn wd-btn-round-2">
                        Visit Store
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-vc-full-width="true"
              data-vc-full-width-init="false"
              className="vc_row wpb_row vc_row-fluid wd-section  bg-fixed vc_custom_1639461623189 vc_row-has-fill"
            >
              <div className="wpb_column vc_column_container vc_col-sm-12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    {" "}
                    <div className="wd-video-section">
                      <div className="row ">
                        <div className="col-md-12">
                          <div className="wd-video-popup">
                            <a
                              href="/sub-sport-types"
                              className="popup-youtube align-item-center"
                            >
                              <i className="fa fa-play" />
                            </a>
                          </div>
                          <div className="wd-video-content-text">
                            <h3>
                              Sports Tutorials
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vc_row-full-width vc_clearfix" />
            <div className="vc_row wpb_row vc_row-fluid wd-section vc_custom_1641397517068">
              <div className="wpb_column vc_column_container vc_col-sm-12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    {" "}
                    <div className=" wd-section-heading-wrapper text-center">
                      <div className="wd-service-heading wd-section-heading">
                        <span className="heading-subtitle">Our Specialists</span>
                        <h3 className="wow fadeIn">
                          Meet Our{" "}
                          <span className="wd-primary-color">Doctors</span>
                        </h3>
                        <p />
                      </div>
                    </div>
                    {/* Memebrs/Team */}
                    <div className="wd-members-section">
                      <div className="row ">
                        {doctors &&
                          doctors.slice(-3).map
                            ((doctor, index) => {
                              return (
                                <div key={index} className="col-lg-4 col-md-6">
                                  <div key={doctor._id} className="members">
                                    <img key={doctor.image}
                                      className="mx-auto img-fluid d-block"
                                      // style={{ width: "300px", height: "150px" }}
                                      src={
                                        doctor.image
                                          ? `${process.env.backurl}/${doctor.image}`
                                          :
                                          `${process.env.backurl}/uploads/User/altUser.jpg`
                                      }
                                      alt="image doctor" />
                                    <div key={doctor.fullname} className="member-info text-center">
                                      <h5>{doctor.fullname}</h5>
                                      <h6>
                                        <i>{doctor.speciality}</i>
                                      </h6>
                                      <p>
                                        {doctor.email}
                                        <br />
                                        +216 {doctor.phone}
                                      </p>
                                      {/* <ul className="inline-block social-net">
                                      <li>
                                        <a href="#">
                                          <i className="fab fa-facebook-f" />
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fab fa-twitter" />
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fab fa-linkedin-in" />
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fab fa-instagram" />
                                        </a>
                                      </li>
                                    </ul> */}
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                        }
                      </div>
                    </div>
                    {/* END/Members/Team */}
                  </div>
                </div>
              </div>
            </div>
            <div
              data-vc-full-width="true"
              data-vc-full-width-init="false"
              className="vc_row wpb_row vc_row-fluid wd-section"
            >
              <div className="wpb_column vc_column_container vc_col-sm-12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    {" "}
                    <div className=" vc_custom_1576222005141 wd-section-heading-wrapper text-center">
                      <div className="wd-service-heading wd-section-heading">
                        <span className="heading-subtitle">News Articles</span>
                        <h3 className="wow fadeIn">
                          Get Every{" "}
                          <span className="wd-primary-color">Latest Update</span>
                        </h3>
                        <p />
                      </div>
                    </div>
                    <div className="row ">
                      {articles && articles.map((article, index) => {
                        return (

                          <div key={index} className="col-12 col-lg-6 col-md-6">

                            <article key={index}>
                              <div className="wd-blog-wrap">
                                <div className="wd-blog-img">
                                  <a href="grow-cannabis-at-farm-with-weefly-from-the-cannabis/index.html">
                                    <img
                                      style={{
                                        width: "100%",
                                        height: "350px"
                                      }}
                                      src={`${process.env.backurl}/${article.thumbnail}`} className=" wp-post-image"
                                      alt=""
                                      decoding="async"
                                      srcSet={`${process.env.backurl}/${article.thumbnail}`}
                                      sizes="(max-width: 350px) 100vw, 350px"
                                    />
                                  </a>
                                  <div className="entry-date">
                                    <a >{article.createdAt.split("T")[0]}</a>
                                  </div>
                                </div>
                                <div className="wd-blog-info">
                                  <h2>
                                    <a href={`/articles/${article.title}`}>{article.title}</a>
                                  </h2>
                                  <div className="wd-blog-bottom-meta">
                                    <div className="wd-author-meta">
                                      <div className="wd-post_date">
                                        <a href={`/articles/${article.title}`}
                                          className="btn wd-btn-round-2">Read More</a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="wd-blog-bottom-meta">
                                    <div className="wd-author-meta">
                                      <div className="wd-post_author">
                                        <img
                                          src="https://secure.gravatar.com/avatar/43a895c298015d854080cdfe5daac351?s=96&d=mm&r=g"
                                          className="avatar rounded-circle"
                                          alt="Grow cannabis at farm with Weefly from the cannabis"
                                        />{" "}
                                        <span>
                                          {" "}
                                          <a
                                            href="author/hamzashatelaoutlook-com/index.html"
                                            className="url"
                                          >
                                            John Martin
                                          </a>
                                        </span>
                                      </div>
                                      <div className="wd-blog-fev">
                                        <a href="grow-cannabis-at-farm-with-weefly-from-the-cannabis/index.html#comments">
                                          <i className="icon-bubbles" />
                                          (3)
                                        </a>
                                      </div>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </article>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="vc_row-full-width vc_clearfix" />
            <div className="vc_row wpb_row vc_row-fluid wd-section vc_custom_1641488540190">
              <div className="wpb_column vc_column_container vc_col-sm-12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    {" "}
                    <div className=" wd-section-heading-wrapper text-center">
                      <div className="wd-service-heading wd-section-heading">
                        <span className="heading-subtitle">Popular Strain</span>
                        <h3 className="wow fadeIn">
                          Our <span className="wd-primary-color">Meals</span>
                        </h3>
                        <p />
                      </div>
                    </div>
                    <div className="wd-brands">
                      <div className="spacing-wrapper">
                        <div className="row">
                          <div className="subcategory-list-wrapper">
                            {meals && meals.slice(6).map
                              ((meal, index) => {
                                return (
                                  <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 ">

                                    <h4 key={meal.FoodCategory + index} className="navy-txt txtCenter">
                                      {meal.FoodCategory}
                                    </h4>
                                    <div key={meal.imgMeal} className="product-item">
                                      <div className="img">
                                        <img
                                          style={{ width: "300px", height: "150px" }}
                                          src={
                                            meal.imgMeal
                                              ? `${process.env.backurl}${meal.imgMeal}`
                                              :
                                              `${process.env.backurl}/uploads/Meal/altMeal.jpg`
                                          }
                                          alt="image meal" />

                                      </div>
                                      <div className="product-info">
                                        <h5 key={meal.FoodItem}>{meal.FoodItem}</h5>
                                        <p key={meal.calories_100g}>{meal.calories_100g}</p>

                                        <div key={meal._id} className="wd-shop-details-title-wrapper">

                                          <div className="wd-shop-product-review-star">
                                            <div className="rating-star">
                                              <div className="star-rating " >
                                                <span style={{ width: `${(Somme(meal.rate) / 5) * 100}%` }}></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
    </>
  )
}

export default HomeUser