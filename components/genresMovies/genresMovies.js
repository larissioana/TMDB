import { useState, useEffect } from 'react'
import { fetchAPIFilteredMovies } from '@/utils/fetchFromAPI';
import { useMovieContext } from '@/context/moviesContext';
import NavigationBar from '../navigationBar/navigationBar';
import Sidebar from '../sidebar/sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import Banner from '../banner/banner';
import styles from './genresMovies.module.css';
import Loading from '../loading/loading';
import dynamic from 'next/dynamic';
import { initialState } from '@/utils/helpers';
import PaginationButton from '../paginationBtn/paginationButton';
const MovieCard = dynamic(() => import('@/components/movieCard/movieCard'))

const GenresMovies = () => {
  const [filteredMovies, setFilteredMovies] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { activeGenre, activeContentType } = useMovieContext();

  const fetchFilteredMovies = async (page, activeGenre) => {
    try {
      setIsLoading(true);
      const [movieContent, tvContent] = await Promise.all([
        fetchAPIFilteredMovies('discover', 'movie', page, activeGenre),
        fetchAPIFilteredMovies('discover', 'tv', page, activeGenre)
      ]);

      const combinedResults =
        [
          ...movieContent.results.map((movie) => ({ ...movie, contentType: 'movie' })),
          ...tvContent.results.map((tvShow) => ({ ...tvShow, contentType: "tv" }))
        ]

      const combinedContent =
      {
        page: movieContent.page,
        total_pages: Math.max(movieContent.total_pages, tvContent.total_pages),
        total_results: movieContent.total_results + tvContent.total_results,
        results: combinedResults,
      };

      setFilteredMovies((prev) => ({
        ...combinedContent,
        results: page > 1 ? [...prev.results, ...combinedContent.results] : [...combinedContent.results],
      }));

      setIsLoading(false);
    } catch (error) {
      console.error('API error', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeGenre) {
      setFilteredMovies(initialState)
      fetchFilteredMovies(1, activeGenre);
    }
  }, [activeGenre]);

  const handlePageChange = async (newPage) => {
    try {
      setIsLoading(true);

      const [movieResults, tvResults] = await Promise.all([
        fetchAPIFilteredMovies('discover', 'movie', newPage, activeGenre),
        fetchAPIFilteredMovies('discover', 'tv', newPage, activeGenre)
      ]);

      const combinedResults =
        [
          ...movieResults.results.map(movie => ({ ...movie, contentType: 'movie' })),
          ...tvResults.results.map(tvShow => ({ ...tvShow, contentType: 'tv' }))
        ];

      setFilteredMovies({
        page: newPage,
        results: combinedResults,
        total_pages: Math.max(movieResults.total_pages, tvResults.total_pages),
        total_results: movieResults.total_results + tvResults.total_results,
      });

      setIsLoading(false);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('API error', error);
      setIsLoading(false);
    }
  };

  const movies = filteredMovies.results.filter(movie => movie.contentType === 'movie');
  const tvShows = filteredMovies.results.filter(movie => movie.contentType === 'tv');

  return (
    <>
      <NavigationBar />
      <div className={styles.wrapper}>
        <Sidebar contentType="movie" />
        {
          !isLoading ?
            <AnimatePresence>
              <motion.div style=
                {{
                  width: "100%",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {
                  activeContentType === "movie" ?
                    movies.map((movie, index) => {
                      const { backdrop_path, title } = movie;
                      return index === 0 ? <Banner name={title} key={index} isLoading={isLoading} imageUrl={backdrop_path} /> : null;
                    })
                    :
                    tvShows.map((show, index) => {
                      const { backdrop_path, name } = show;
                      return index === 0 ? <Banner name={name} key={index} isLoading={isLoading} imageUrl={backdrop_path} /> : null;
                    })
                }

              </motion.div>
            </AnimatePresence>
            :
            <div className={styles.flexContainer}>
              <Loading />
            </div>
        }
      </div>

      <div className={styles.moviesContainer}>
        {
          activeContentType === "movie" ?
            movies.map((movie) => {
              return <MovieCard movies={movie} key={movie.id} />
            })
            :
            tvShows.map((show) => {
              return <MovieCard movies={show} key={show.id} />
            })
        }
      </div>
      {
        filteredMovies.total_pages > 1 && (
          <div
            style=
            {{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <PaginationButton filteredMovies={filteredMovies} handlePageChange={handlePageChange} />
          </div>
        )}
    </>
  )
};

export default GenresMovies;
