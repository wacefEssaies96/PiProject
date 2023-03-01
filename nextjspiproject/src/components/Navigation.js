import Link from 'next/link'
import { Cookies } from 'react-cookie'
import { useEffect, useState } from "react"


export default function Navigation() {


  const cookies = new Cookies()

  const [auth, setAuth] = useState({
    token: null,
    user: null,
  })
  useEffect(() => {
    setAuth(
      {
        token: cookies.get('token'),
        user: cookies.get('user')
      })
  },[])


  return (
    // <></>
    <>
      <h2>Pages:</h2>
      <br />
      <ul>
        <li>
          <Link href={"/"}>
            Main page
          </Link>
        </li>
        <li>
          <Link href={"/secured"}>
            Secured page
          </Link>
        </li>
        {!auth.token
          ?
          <li>
            <Link href={"/login"}>
              Login page
            </Link>
          </li>
          :
          <li>
            <Link href={"/logout"}>
              {auth.user.email} Logout page
            </Link>
          </li>
        }
      </ul>
    </>
  )


}
