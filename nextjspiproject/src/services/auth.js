import axios from 'axios'
import Router from 'next/router'
import { Cookies } from 'react-cookie'
import nextCookie from 'next-cookies'

// set up cookies
const cookies = new Cookies();

// export var isAuthenticated = (cookies.get('token') !== undefined && cookies.get('user') !== undefined)

// export var AuthenticatedUser = cookies.get('user') 
// export var token = cookies.get('token') 


export const handleAuthSSR = async (ctx) => {


  const { mode } = nextCookie(ctx)
  if (mode === 'local') {
    const { token } = nextCookie(ctx)
    const url = `${process.env.backurl}/api/auth/validate`

    const redirectOnError = () => {
      /* eslint-disable no-console */
      console.log('Redirecting back to main page')
      if (typeof window !== 'undefined') {
        Router.push('/')
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
  }
  return {}
}

export const loginService = async ({ token, user }) => {
  // Cookie will expire after 24h
  cookies.set('token', token, { maxAge: 60 * 60 * 24 })
  cookies.set('user', user, { maxAge: 60 * 60 * 24 })

}

export const logout = () => {
  cookies.remove('token')
  cookies.remove('user')
  Router.push('/')
}
