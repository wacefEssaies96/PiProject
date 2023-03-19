import React from 'react'
import { Cookies } from 'react-cookie'
import { useState } from "react"


function HomePage() {

  const cookies = new Cookies()

  const [auth, setAuth] = useState({
    token: cookies.get('token') || null,
    error: '',
    email: null,
    password: null,
  })

  return (
    <>
      <div id="inner_header" className="inner-page-banner">
        <div className="container">
          <div className="inner_intro text-center">
            <h1>
              Home
            </h1>
            <div className="breadcrumb">
              <ul className="pagination-inner"><li className="breadcrumb-item"><a href={"/"}>Home</a></li></ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage