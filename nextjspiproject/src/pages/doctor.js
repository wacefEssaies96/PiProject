import DoctorsForm from '@/components/users/doctorform'
import Link from 'next/link'
import { Component } from 'react'
import Navigation from '../components/Navigation'
import { handleAuthSSR } from '../services/auth'

export default class Doctor extends Component {
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
        <h1>Doctor page</h1>
        <Link href={"/doctor"}>
            Doctor page
          </Link>
        <DoctorsForm operationMode="Add" />
      </div>
    )
  }
}
