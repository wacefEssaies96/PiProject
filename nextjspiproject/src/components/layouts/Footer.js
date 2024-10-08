import React from 'react'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'
import { useEffect, useState } from "react"

function Footer() {
  
  const cookies = new Cookies()
  const router = useRouter();
  
  const [auth, setAuth] = useState({
    token: null,
    user: null,
 })
 
 const logout = () => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  setImageSrc(`${process.env.backurl}/uploads/User/altUser.png`)
  setAuth({
     token: null,
     user: null,
  })
  window.location = "/"
}
  
  useEffect(() => {
    setAuth({
       token: cookies.get('token'),
       user: cookies.get('user')
    })

 }, [])
  return (
    <>
      <footer id="footer">
        <div className="footer_top wd-primary-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 top_widget">
                <div className="wd-footer_logo">
                  <a onClick={() => { router.push("/") }}>
                    <img src="/logocarre.png" alt="Health SpotLight" />
                  </a>
                </div>
              </div>
              {/* <div className="col-lg-4 top_widget news-letter">
                <div className="newsletter">
                  <div id="custom_html-2" className="widget_text widget widget_custom_html"><div className="textwidget custom-html-widget">

                    <form id="mc4wp-form-1" className="mc4wp-form mc4wp-form-468" method="post" data-id="468" data-name="Subscribe" ><div className="mc4wp-form-fields"><div className="email_input">

                      <input type="email" name="EMAIL" placeholder="Your email address" required />
                    </div>
                      <button type="button" defaultValue="Sign up">Submit <i className="fa fa-caret-right"></i></button>


                    </div><label style={{ display: "none !important;" }}>Leave this field empty if you're human: <input type="text" name="_mc4wp_honeypot" defaultValue="" tabIndex="-1" autoComplete="off" /></label><input type="hidden" name="_mc4wp_timestamp" defaultValue="1678243228" /><input type="hidden" name="_mc4wp_form_id" defaultValue="468" /><input type="hidden" name="_mc4wp_form_element_id" defaultValue="mc4wp-form-1" /><div className="mc4wp-response"></div></form>
                  </div></div>            </div>
              </div> */}
              <div className="col-lg-4 top_widget">
                <div className="follow_us">
                  <ul>
                    <li>
                      <a href="#"><i className="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-youtube"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-instagram"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 footer_widget">
              <div className="widget_inner">
                <div id="custom_html-3" className="widget_text widget widget_custom_html"><h4 className="widget-title">Contact Us</h4><div className="textwidget custom-html-widget"><p>Our Address</p>
                  <p>E: <a href="#">health.spotLight@gmail.com</a></p>
                  <p>P: +216</p></div></div>          </div >
            </div >
            <div className="col-lg-4 footer_widget">
              <div className="widget_inner">
                <div id="nav_menu-1" className="widget widget_nav_menu"><h4 className="widget-title">Useful Links</h4><div className="menu-footer-menu-1-container"><ul id="menu-footer-menu-1" className="menu">
                 
                  <li id="menu-item-1773" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1773"><a href="/articles">Articles</a></li>
 
                  <li id="menu-item-1767" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1767">
                          <a href="/clinic/ClinicDoctor">Our Clinics</a>
                    </li>
                  <li id="menu-item-1753" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1753">
                      <a onClick={() => { router.push("/meals") }} >Our Meals</a>
                  </li>
                  <li id="menu-item-1768" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1768">
                      <a onClick={() => { router.push("/recipes") }} >Our Recipies </a>
                  </li>
                                          
                  <li id="menu-item-1718" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1718">
                    <a href="#" onClick={() => { router.push('/e-commerce'); }}>Shop</a>
                  </li>
                  <li id="menu-item-1734" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1734">
                    <a href="#" onClick={() => { router.push('/sport-types'); }}>Our Sports</a></li>
                    
                  {/* <li id="menu-item-1774" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1774"><a href="#">Our Team</a></li>
                  <li id="menu-item-1734" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1734"><a href="#">Our Products</a></li> */}
                </ul>
                </div></div>          </div>
            </div>
            <div className="col-lg-4 footer_widget">
              <div className="widget_inner">
                <div id="nav_menu-2" className="widget widget_nav_menu"><h4 className="widget-title">Other Pages</h4><div className="menu-footer-menu-2-container">
                    <ul id="menu-footer-menu-2" className="menu">
                  {/* <li id="menu-item-1763" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1763"><a href="#">Contact Us</a></li>
                  <li id="menu-item-1764" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1764"><a href="#">About us</a></li> */}
                  
                  {!auth.token && !auth.user
                      ?
                      <>
                          <li><a href={"/user/doctor-or-user"}>Register</a></li>
                          <li><a href={"/auth/login"}>Login</a></li>
                      </>
                      :
                      <>
                          {auth.token && auth.user && auth.user.role == 'DOCTOR'
                            ? <li><a href="#" onClick={() => { router.push('/user/doctor') }}> Profile</a></li>
                            : <li><a href="#" onClick={() => { router.push('/user/edit-profile') }}> Profile</a></li>
                          }

                          <li><a href="#" onClick={logout}> Logout</a></li>
                      </>
                    }
                </ul></div></div>          </div>
            </div>
          </div >
        </div >
        <div className="wd-footer_bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="footer-copyright-text">
                  <p>
                    © 2023 Health SpotLight All Rights Reserved            </p >
                </div >
              </div >
              <div className="col-lg-2">
                <div id="back-top" className="back-top" style={{ display: " block;" }}>
                  <a href="#top"><i className="fa fa-angle-up" aria-hidden="true"></i> </a>
                </div>
              </div>
            </div >
          </div >
        </div >
      </footer >
    </>
  )
}

export default Footer