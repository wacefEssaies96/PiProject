import axios from 'axios'
import Router from 'next/router'
import { Cookies } from 'react-cookie'
import nextCookie from 'next-cookies'

// set up cookies

// export var isAuthenticated = (cookies.get('token') !== undefined && cookies.get('user') !== undefined)

// export var AuthenticatedUser = cookies.get('user') 
// export var token = cookies.get('token') 

const cookies = new Cookies();

export const handleAuthSSR = async (ctx) => {

  const { token } = nextCookie(ctx)
  const url = `${process.env.backurl}/api/auth/validate`

  const redirectOnError = () => {
    /* eslint-disable no-console */
    console.log('Redirecting back to main page')
    if (typeof window !== 'undefined') {
      window.location('/')
    } else {
      ctx.res.writeHead(302, { Location: '/' })
      ctx.res.end()
    }
  }

  try {
    if (!token) {
      return redirectOnError()
    }
    const response = await axios.get(url, {
      headers: { Authorization: token },
    })

    if (!response.data.user) {
      return redirectOnError()
    }
  } catch (error) {
    /* eslint-disable no-console */
    console.log('Error: ', error)
    // Implementation or Network error
    return redirectOnError()
  }

  return {}
}

export const loginService = async ({ token, user }) => {
  // Cookie will expire after 24h
  if (!cookies.get('user') && !cookies.get('token')){
    cookies.set('token', token, { maxAge: 60 * 60 * 24 })
    cookies.set('user', user, { maxAge: 60 * 60 * 24 })
  }
}

export const resetPassword = async (data, id, token) => {

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: data.target.password1.value,
    }),
  }

  const res = await fetch(`${process.env.backurl}/api/reset_password/${id}/${token}`, options)
  const result = await res.json()

  return result
}

