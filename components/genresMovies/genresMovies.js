import { useState, useEffect, useMemo } from 'react'
import { fetchAPIFilteredMovies } from '@/utils/fetchFromAPI';
import { useMovieContext } from '@/context/moviesContext';
import NavigationBar from '../navigationBar/navigationBar';
import Sidebar from '../sidebar/sidebar';
import { Button,  Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import MovieCard from '../movieCard/movieCard';
import Banner from '../banner/banner';
import styles from './genresMovies.module.css';

const initialState =
{
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

const GenresMovies = () => 
{
    const [filteredMovies, setFilteredMovies] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const { activeGenre } = useMovieContext();

    const fetchFilteredMovies = async (page, activeGenre) =>
    {
      try
      {
        setIsLoading(true);
        const [movieContent, tvContent] = await Promise.all([
          fetchAPIFilteredMovies('movie', page, activeGenre),
          fetchAPIFilteredMovies('tv', page, activeGenre)
        ]);
      
        const combinedResults =
        [
          ...movieContent.results.map((movie) => ({...movie, contentType: 'movie'})),
          ...tvContent.results.map((tvShow) => ({...tvShow, contentType: "tv"}))
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
      } catch (error)
        {
          console.error('API error', error);
          setIsLoading(false);
        }
    };
      
    useEffect(() => 
    {
      if (activeGenre) 
      {
        setFilteredMovies(initialState);
        fetchFilteredMovies(1, activeGenre);
      }
    }, [activeGenre]);
      
    const nextPage = filteredMovies.page + 1;
    const previousPage = filteredMovies.page - 1;
      
    const handlePageChange = async (newPage) =>
    {
      try
      {
        setIsLoading(true);
      
        const [movieResults, tvResults] = await Promise.all([
          fetchAPIFilteredMovies('movie', newPage, activeGenre),
          fetchAPIFilteredMovies('tv', newPage, activeGenre)
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
      } catch (error)
        {
          console.error('API error', error);
          setIsLoading(false);
        }
    };
      
  return (
    <div>
        <NavigationBar/>
        <div className = {styles.wrapper} 
            >
                <Sidebar isMovies = {true} />
                <AnimatePresence>
                <motion.div style =
                {{
                    width: "100%"
                }}
                initial = {{ opacity: 0, y: 50 }}
                animate = {{ opacity: 1, y: 0 }}
                exit = {{ opacity: 0, y: -200 }}
                
                >
                    {
                      filteredMovies.results.map((movie, index) =>
                      {
                          const {backdrop_path} = movie;
                          return index === 2 ? <Banner key={index} isLoading = {isLoading} imageUrl={backdrop_path} /> : null;
                      })
                    }
                </motion.div>
                </AnimatePresence>
            </div>
            <div className = {styles.moviesContainer}>
                {filteredMovies.results.map((result) => 
                {
                    return <div key = {result.id}>
                        <MovieCard movies = {result}/>
                    </div>
                })}
        </div>
        {
        filteredMovies.total_pages > 1 && (
        <div
          style = 
          {{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <div className = "pagination">
          <Button
            className = "pagination-btn"
            disabled = { filteredMovies.page === 1 }
            onClick = {() => handlePageChange(filteredMovies.page -1, previousPage)}
          >
            Previous Page
          </Button>
          <Typography variant="body1" sx={{ marginX: '1rem' }}>
            Page {filteredMovies.page} of { Math.min(filteredMovies.total_pages, 300) }
          </Typography>
          <Button
            className = "pagination-btn"
            disabled = { filteredMovies.page === filteredMovies.total_pages }
            onClick = {() => handlePageChange(filteredMovies.page + 1, nextPage)}
          >
            Next Page
          </Button>
          </div>
        </div>
      )}
    </div>
  )
};

export default GenresMovies;
