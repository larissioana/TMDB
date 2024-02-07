import Head from 'next/head'
import { Inter } from '@next/font/google'
import NavigationBar from '@/components/navigationBar/navigationBar';
import Feed from '@/components/feed/feed';
import Movies from '@/components/movies/movies';
import Sidebar from '@/components/sidebar/sidebar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix clone app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/netflix.png" />
      </Head>
      <NavigationBar/>
      <Feed/>
    </>
  )
}
