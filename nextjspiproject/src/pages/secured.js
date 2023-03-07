import { Component } from 'react';
// import { Cookies } from 'react-cookie'
import Navigation from '../components/Navigation'
import { handleAuthSSR } from '../services/auth'

export default class Secured extends Component {
  static async getInitialProps(ctx) {
    // Must validate JWT
    // If the JWT is invalid it must redirect back to the main page.
    // You can do that with Router from 'next/router
    // const cookies = new Cookies()
    await handleAuthSSR(ctx)
    return {}
  }

  render() {
    return (
      <div>
        <h1>Secret page</h1>
        <p>Only accessible via a valid JWT</p>
        <Navigation /> 
      </div>
    )
  }
}
