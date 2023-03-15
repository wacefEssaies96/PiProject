import DoctorsForm from '@/components/users/doctorform'
import Link from 'next/link'
import { Component, useEffect } from 'react'
import Navigation from '../components/Navigation'
import { handleAuthSSR } from '../services/auth'
import nextCookie from 'next-cookies'
import withAuth from '@/components/Withauth'

 function Doctor({ user }) {
  return (
    <>
      {
        user._id === "" ? <DoctorsForm operationMode="Add" />
          : <DoctorsForm operationMode="Update" doctor={user} />
      }

    </>
  )

}


export async function getServerSideProps(ctx) {
  const { user } = nextCookie(ctx)
  if (user) {
    const id = user._id
    const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
    const u = await res.json()
    return {
      props: {
        user: u
      }
    }
  }
  return {
    props: {
      user: {
        _id: '',
        fullname: '',
        email: '',
        password: '',
        phone: 0,
        height: 0,
        weight: 0,
        address: '',
        disease: '',
        gender: ''
      }
    }
  }
}

export default Doctor
