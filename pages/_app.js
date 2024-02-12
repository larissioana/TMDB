import '@/styles/globals.css'
import { MovieProvider } from '@/context/moviesContext';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

export default function App({ Component, pageProps }) {
  useEffect(() => 
  {
    ReactModal.setAppElement('#__next')
  },[]);
  
  return (
    <MovieProvider>
      <Component {...pageProps} />
    </MovieProvider>
   
  )   
}
