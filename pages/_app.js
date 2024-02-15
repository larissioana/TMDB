import '@/styles/globals.css'
import { MovieProvider } from '@/context/moviesContext';
import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { TvShowsProvider } from '@/context/tvSeriesContext';
import { UserProvider } from '@/context/userContext';

export default function App({ Component, pageProps }) {
  useEffect(() => 
  {
    ReactModal.setAppElement('#__next')
  },[]);
  
  return (
      <UserProvider>
        <MovieProvider>
          <TvShowsProvider>
            <Component {...pageProps} />
          </TvShowsProvider>
        </MovieProvider>
      </UserProvider>
  )   
}
