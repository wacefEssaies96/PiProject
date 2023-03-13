import Link from 'next/link'
import { Component } from 'react'
import Navigation from '../components/Navigation'
import { handleAuthSSR } from '../services/auth'

 class Admin extends Component {
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
      <>
    {withAuth &&
      <div>
        <h1>Admin page</h1>
        <li>
          <Link href={"/users"}>
            User page
          </Link>
        </li>
        <Navigation />
      </div>
      }
      </>
    )

  }
  
}
export default  Admin;