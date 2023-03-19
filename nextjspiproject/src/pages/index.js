import { loginService } from '@/services/auth';
import { useRouter } from 'next/router';
import HomePage from '@/components/layouts/HomePage'

export default function Home() {

  const router = useRouter()

  if (router.query.hasOwnProperty('token')) {
    const user = {
      _id: router.query.id,
      email: router.query.email,
      fullname: router.query.name,
      role: 'USER'
    }
    const token = router.query.token
    loginService({ token, user })
    window.location = '/'
  }

  return (
    <>
      <HomePage />
    </>
  )
}
