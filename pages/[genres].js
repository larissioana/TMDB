import dynamic from 'next/dynamic';
const GenresMovies = dynamic(() => import('@/components/genresMovies/genresMovies'));
import Head from 'next/head';

const Genres = () => {
  return (
    <>
      <Head>
        <title>Genres</title>
        <meta name="description" content="See different genres for tv shows and movies."></meta>
      </Head>
      <GenresMovies />
    </>
  )
};

export default Genres;
