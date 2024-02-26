import dynamic from 'next/dynamic';
const GenresMovies = dynamic(() => import('@/components/genresMovies/genresMovies'), {
  ssr: false
});

const Genres = () => {
  return (
    <GenresMovies />
  )
};

export default Genres;
