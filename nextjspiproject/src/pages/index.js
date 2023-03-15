import { loginService } from '@/services/auth';
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router';
import HomePage from '@/components/UserTemplate/HomePage'

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
      router.push('/')
    }

  return (
    <>
		<HomePage/>
    </>
  )
}
