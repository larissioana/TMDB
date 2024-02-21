import Head from 'next/head'
import NavigationBar from '@/components/navigationBar/navigationBar';
import Feed from '@/components/feed/feed';

export default function Home() {
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="description" content="Next js web application for watching movies and tv series." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavigationBar />
      <Feed />
    </>
  )
}
