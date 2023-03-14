import DoctorsForm from '@/components/users/doctorform'
import Link from 'next/link'
import { Component } from 'react'
import Navigation from '../components/Navigation'
import { handleAuthSSR } from '../services/auth'

export default class Doctor extends Component {
  static async getInitialProps(ctx) {
    await handleAuthSSR(ctx)
    return {}
  }
  render() {
    return (
        <DoctorsForm operationMode="Add" />
    )
  }
}
