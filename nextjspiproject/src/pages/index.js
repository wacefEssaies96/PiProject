
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navigation />
    </>
  )
}
