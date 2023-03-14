import DoctorsForm from '@/components/users/doctorform'
import Link from 'next/link'
import { Component, useEffect } from 'react'
import Navigation from '../components/Navigation'
import { handleAuthSSR } from '../services/auth'
import nextCookie from 'next-cookies'

export default function Doctor({ user }) {

  return (
    <>
      {
        !user ? <DoctorsForm operationMode="Add" />
          : <DoctorsForm operationMode="Update" doctor={user} />

      }

    </>
  )

}


export async function getServerSideProps(ctx) {
  // Must validate JWT
  // If the JWT is invalid it must redirect back to the main page.
  // You can do that with Router from 'next/router
  // const cookies = new Cookies()
  await handleAuthSSR(ctx)
  const { user } = nextCookie(ctx)
  return {
    props: {
      user: user
    }
  }
}
