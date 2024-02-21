import dynamic from 'next/dynamic';
const GenresMovies = dynamic(() => import('@/components/genresMovies/genresMovies'));
import Head from 'next/head';

const Genres = () => {
  return (
    <>
      <Head>
        <title>Genres</title>
      </Head>
      <GenresMovies />
    </>

  )
};

export default Genres;
