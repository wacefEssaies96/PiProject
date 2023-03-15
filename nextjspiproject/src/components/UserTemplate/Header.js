import React from 'react'
import { Cookies } from 'react-cookie'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'


function Header() {

   const cookies = new Cookies()
   const router = useRouter()
   const [auth, setAuth] = useState({
      token: null,
      user: null,
   })
   const logout = () => {
      cookies.remove('token')
      cookies.remove('user')
      router.reload()
   }
   const getUser = async () => {
      if (cookies.get('user')){
         let res = await fetch(`${process.env.backurl}/api/users/findOne/${cookies.get('user')._id}`)
         let data = await res.json()
         auth.user = data
         console.log(auth)
      }

   }
   useEffect(() => {
      getUser()
      setAuth(
         {
            token: cookies.get('token'),
            user: cookies.get('user')
         })
         console.log(auth)
   }, [])

   return (
      <>
         <div className="wd-top-nav">
            <div className="container">
               <div className="wd-header-top-inner">
                  <div className="wd-header-left">
                     <ul className="list-inline">
                        <li className="list-inline-item"><a href="#"> <i className="icon-phone"></i>+216 </a></li>
                        <li className="list-inline-item"><a href="#"> <i className="icon-envelope"></i>health.spotLight@gmail.com </a></li>
                     </ul>
                  </div>
                  <div className="wd-header-right">
                     <div className="wd-user-cart">
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
                           <li className="has-dropdown">
                              <a href="#">
                                 <div>
                                    {(!auth.user || !auth.user.image)
                                       ?
                                       <img style={{ height: '2rem', width: '2rem' }}
                                          src={`${process.env.backurl}/uploads/User/altUser.png`}
                                          alt="no img altUser.png"
                                       />
                                       :
                                       <img style={{ height: '2rem', width: '2rem' }}
                                          src={`${process.env.backurl}/${auth.user.image}`}
                                          alt="verifiy img"
                                       />
                                    }
                                 </div>
                              </a>
                              <ul className="user-option">
                                 {!auth.token
                                    ?
                                    <>
                                       <li><Link href={"/doctor-or-user"}>Register</Link></li>
                                       <li><Link href={"/login"}>Login</Link></li>
                                       {/* <li><Link href={"/doctor-or-user"}>Resigter2</Link></li> */}
                                    </>
                                    :
                                    <>
                                       {auth.user.role == 'DOCTOR'
                                          ? <li><Link href="#" onClick={() => { router.push('/doctor') }}> Profile</Link></li>
                                          : <li><Link href="#" onClick={() => { router.push('/editProfile') }}> Profile</Link></li>
                                       }

                                       <li><Link href="#" onClick={() => { logout() }}> Logout</Link></li>
                                    </>
                                 }
                              </ul>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <header className="main-nav">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="main-navigation">
                        <div className="logo">
                           <a href="#">
                              <img src="/logo.png" alt="HealthSpotLight" />
                           </a>
                        </div>
                        <div className="nav">
                           <nav>
                              <ul id="menu-main-menu" className="menu">
                                 {auth.token && auth.user.role === "ADMIN" &&
                                    <li id="menu-item-1743" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-148 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-1743">
                                       <a href={"/users"} aria-current="page">Managment</a>
                                       <ul className="sub-menu">
                                          <li id="menu-item-1754" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-148 current_page_item menu-item-1754"><a href={"/users"} aria-current="page">Users</a></li>
                                          <li id="menu-item-1753" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1753"><a href="#">other</a></li>
                                          <li id="menu-item-1768" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1768"><a href="#">other</a></li>
                                          <li id="menu-item-1769" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1769"><a href="#">other</a></li>
                                       </ul>
                                    </li>
                                 }
                                 <li id="menu-item-1743" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-148 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-1743"><a href="index.html" aria-current="page">Home</a>
                                    <ul className="sub-menu">
                                       <li id="menu-item-1754" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-148 current_page_item menu-item-1754"><a href="index.html" aria-current="page">Homepage One</a></li>
                                       <li id="menu-item-1753" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1753"><a href="#">Home Page Two</a></li>
                                       <li id="menu-item-1768" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1768"><a href="#">Homepage Three</a></li>
                                       <li id="menu-item-1769" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1769"><a href="#">Homepage Four</a></li>
                                    </ul>
                                 </li>
                                 <li id="menu-item-1729" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1729"><a href="#">Blog</a>
                                    <ul className="sub-menu">
                                       <li id="menu-item-1744" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1744"><a href="#">Blog Grid</a></li>
                                       <li id="menu-item-1726" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1726"><a href="#">Blog Single</a>
                                          <ul className="sub-menu">
                                             <li id="menu-item-1725" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1725"><a href="#">Standard</a></li>
                                             <li id="menu-item-1721" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1721"><a href="#">Gallery</a></li>
                                             <li id="menu-item-1722" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1722"><a href="#">Video</a></li>
                                             <li id="menu-item-1724" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1724"><a href="#">Quote</a></li>
                                             <li id="menu-item-1723" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1723"><a href="#">Link</a></li>
                                          </ul>
                                       </li>
                                    </ul>
                                 </li>
                                 <li id="menu-item-1746" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1746"><a href="#">About Us</a></li>
                                 <li id="menu-item-1728" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1728"><a href="#">Products</a>
                                    <ul className="sub-menu">
                                       <li id="menu-item-1745" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1745"><a href="#">Shop</a></li>
                                       <li id="menu-item-1760" className="menu-item menu-item-type-post_type menu-item-object-product menu-item-1760"><a href="#">Shop Details</a></li>
                                       <li id="menu-item-1757" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1757"><a href="#">My Account</a></li>
                                       <li id="menu-item-1759" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1759"><a href="#">Wishlist</a></li>
                                       <li id="menu-item-1758" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1758"><a href="#">Cart</a></li>
                                    </ul>
                                 </li>
                                 <li id="menu-item-1719" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1719"><a href="#">Pages</a>
                                    <ul className="sub-menu">
                                       <li id="menu-item-1767" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1767"><a href="#">Our Team</a></li>
                                       <li id="menu-item-1766" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1766"><a href="#">Our Doctors</a></li>
                                       <li id="menu-item-1727" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1727"><a href="#">404 Page</a></li>
                                       <li id="menu-item-1755" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1755"><a href="/doctor-or-user">Register</a></li>
                                       <li id="menu-item-1756" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1756"><a href="/login">Login</a></li>
                                    </ul>
                                 </li>
                                 <li id="menu-item-1747" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1747"><a href="#">Contact Us</a></li>
                              </ul>                        </nav>
                        </div>
                        <div className="side-cart">
                           <ul>
                              <li>
                                 <a href="cart/index.html">
                                    <i className="sl icon-basket"></i>
                                    <span className="cart-item">0</span>
                                 </a>
                              </li>
                              <li>
                                 <a href="wishlist/index.html">
                                    <i className="sl icon-heart"></i>
                                    <span className="wishlist-item">0</span>
                                 </a>
                              </li>
                           </ul>
                           <div id="nav-toggle-label">
                              <div id="hamburger">
                                 <span></span>
                                 <span></span>
                                 <span></span>
                              </div>
                              <div id="cross">
                                 <span></span>
                                 <span></span>
                              </div>
                           </div>
                        </div>

                        <div className="mobile-navigation">
                           <div className="mobile-logo">
                              <a href="index.html">
                                 <img src="wp-content/themes/weefly/images/mobile-logo.png" alt="Weefly" />
                              </a>
                              <div id="nav-toggle-label2">
                                 <div id="cross2">
                                    <span></span>
                                    <span></span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
      </>
   )
}

export default Header