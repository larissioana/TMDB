import Head from 'next/head'
import { Inter } from '@next/font/google'
import NavigationBar from '@/components/navigationBar/navigationBar';
import Feed from '@/components/feed/feed';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>TMDB</title>
        <meta name="description" content="Next js web application with movies and tv series." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavigationBar />
      <Feed />
    </>
  )
}
