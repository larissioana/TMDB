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
        <title>TMDB</title>
        <meta name="description" content="TMDB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavigationBar/>
      <Feed/>
    </>
  )
}
