import React from 'react'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import { loginService } from '../../services/auth'
import { useRouter } from "next/router";
import { useState } from "react"


function Login() {
    const router = useRouter()
    
    const cookies = new Cookies()

    const [auth, setAuth] =useState({
          token: cookies.get('token') || null,
          error: '',
          email: null,
          password: null,
        })
    const onLoginClick = async (e) => {
        /* eslint-disable no-console */
        e.preventDefault()
        auth.email = e.target.email.value
        auth.password = e.target.password.value
        try {
          const { email, password } = auth
          console.log(" email : "+email+" password : "+password)
          const url = `${process.env.backurl}/api/auth/login`
          const response = await axios.post(url, {
            email,
            password,
          })
          const token  = response.data.token
          const user = response.data.user[0]
          // console.log(" in login "+token+" user : "+user.id+" user email : "+user.email)
          await loginService({ token,user })
          setAuth({
            token,
            error: null,
          })
          if(user['role'=="ADMIN"])  {
            router.push('/admin')
          }
          else if(user['role'=="User"])  {
            router.push('/user')
          }
          else  {
            router.push('/')
          }
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error,
          )
          setAuth({ error: error.message })
        }
    }

  return (
    <>
    
<div id="inner_header" className="inner-page-banner">
   <div className="container">
      <div className="inner_intro text-center">
        <h1>
            Login         </h1>
                  <div className="breadcrumb">
            <ul className="pagination-inner"><li className="breadcrumb-item"><a href="../index.html">Home</a></li><li className="breadcrumb-item active" aria-current="page">Login</li></ul>
                     </div>
                  
      </div>
   </div>
</div>
<div className="container">
    <div className="row no-gutter">
        <div className="col-md-12">
            <div className="login py-5">
                <div className="row">
                                            <div className="offset-lg-3 col-lg-6  mx-auto d-block login-page">
                            <div className="login-page">
                                <p className="sub_title">Need a weefly account?<a
                                            className="color-litegreen"
                                            href="../register/index.html"> Signup here!</a>
                                </p>
                            </div>
                            {!auth.token && (
                                <form id="login" onSubmit={onLoginClick}> 
                                <p className="status"></p>
                                <div className="form-label-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input defaultValue={auth.email} type="text" id="email" className="form-control"
                                           placeholder="Email Address" name="email"
                                           required/>
                                </div>
                                <div className="form-label-group">
                                    <label htmlFor="password">Password</label>
                                    <input defaultValue={auth.password} type="password" id="password" name="password" className="form-control"
                                           placeholder="Password" required/>
                                </div>
                                {/* <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                    <label className="custom-control-label"
                                           htmlFor="customCheck1">Remember Password</label>
                                </div> */}
                                <input type="hidden" id="security" name="security" value="70515a4dc6" />
                                <input type="hidden" name="_wp_http_referer" value="/themes/wp/weefly/login/" />                                <button className="btn btn-lg btn-block wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button"
                                        type="submit" value="Login"
                                        name="submit">Sign In</button>
                                <div className="text-center">
                                    <a className="small"
                                       href="../my-account/lost-password/index.html">Forgot Password?</a>
                                </div>
                            </form>
                            )}

                            {auth.token && <p>Login success Token: {auth.token}</p>}
                        </div>
                                        </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default Login