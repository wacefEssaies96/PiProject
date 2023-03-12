import { loginService } from '@/services/auth';
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation'
import Header from '@/components/UserTemplate/Header'
import HomeUser from '@/components/UserTemplate/HomeUser'
import Footer from '@/components/UserTemplate/Footer'
import Login from '@/components/UserTemplate/Login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()

    if(router.query.hasOwnProperty('token')){
      console.log('d5al')
      const user = {
        email: router.query.email,
        fullname: router.query.name,
        role: 'USER'
      }
      const token = router.query.token
      const mode = 'google'
      loginService({ token, user, mode })
      router.push('/user')
    }

  return (
    <>
		<Header/>
		<HomeUser/>
		<Footer/>
    </>
  )
}
