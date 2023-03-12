import { Inter } from '@next/font/google'
import Navigation from '../components/Navigation'
import Header from '@/components/UserTemplate/Header'
import HomeUser from '@/components/UserTemplate/HomeUser'
import Footer from '@/components/UserTemplate/Footer'
import Login from '@/components/UserTemplate/Login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
		<Header/>
		<HomeUser/>
		<Footer/>
    </>
  )
}
