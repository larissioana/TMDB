import '@/styles/globals.css'
import { MovieProvider } from '@/context/moviesContext';
import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { TvShowsProvider } from '@/context/tvSeriesContext';
import { UserProvider } from '@/context/userContext';
import Head from 'next/head';

import Script from 'next/script';
export default function App({ Component, pageProps }) {
  useEffect(() => {
    ReactModal.setAppElement('#__next')
  }, []);

  return (
    <>
      <Head>
        <Script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: '/* Inlined Third-Party Script */',
          }}
        />
      </Head>
      <UserProvider>
        <MovieProvider>
          <TvShowsProvider>
            <Component {...pageProps} />
          </TvShowsProvider>
        </MovieProvider>
      </UserProvider>
    </>
  )
}
