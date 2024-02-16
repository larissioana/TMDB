import { useState, useEffect } from 'react'
import { fetchAPIFilteredMovies } from '@/utils/fetchFromAPI';
import { useMovieContext } from '@/context/moviesContext';
import NavigationBar from '../navigationBar/navigationBar';
import Sidebar from '../sidebar/sidebar';
import { Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import MovieCard from '../movieCard/movieCard';
import Banner from '../banner/banner';
import styles from './genresMovies.module.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Loading from '../loading/loading';

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
 
    const { activeGenre, activeContentType } = useMovieContext();

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
        setFilteredMovies(initialState)
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
     
    const movies = filteredMovies.results.filter(movie => movie.contentType === 'movie');
    const tvShows = filteredMovies.results.filter(movie => movie.contentType === 'tv');

   return (
    <div>
        <NavigationBar/>
        <div className = {styles.wrapper} 
            >
                <Sidebar isMovies = {true} contentType = "movie" />
                {
                  !isLoading ?
                <AnimatePresence>
                <motion.div style =
                {{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                initial = {{ opacity: 0, y: 50 }}
                animate = {{ opacity: 1, y: 0 }}
                exit = {{ opacity: 0, y: -200 }}
                >
                  {
                    activeContentType === "movie" ?
                    movies.map((movie, index) => 
                    {
                      const {backdrop_path} = movie;
                          return index === 0 ? <Banner key={index} isLoading = {isLoading} imageUrl={backdrop_path} /> : null;
                    })
                    :
                      tvShows.map((show, index) =>
                      {
                          const {backdrop_path} = show;
                          return index === 1 ? <Banner key={index} isLoading = {isLoading} imageUrl={backdrop_path} /> : null;
                      })
                  }
                    
                </motion.div>
                </AnimatePresence>
                :
                <Loading/>
                }
            </div>
            <div className = {styles.moviesContainer}>
              {
                activeContentType === "movie" ?
                movies.map((movie) => {
                  return <div key = {movie.id}>
                  <MovieCard movies = {movie}/>
                  </div>
                })
                : 
                tvShows.map((show) =>
                {
                  return <div key = {show.id}>
                  <MovieCard movies = {show}/>
                  </div>
                })
              }
                
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
            disabled = {filteredMovies.page === 1}
            onClick={() => handlePageChange(filteredMovies.page - 1, previousPage)}
          >
            <NavigateBeforeIcon/>
          </Button>
          {
            Array.from({ length: filteredMovies.total_pages }, (_, index) => index + 1)
            .slice(filteredMovies.page - 1, filteredMovies.page + 4)
            .map(pageNumber => (
              <Button
                key = {pageNumber}
                className = {`pagination-btn ${pageNumber === filteredMovies.page ? 'selected-btn' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
          ))}
            <Button
              className = "pagination-btn"
              disabled = {filteredMovies.page === filteredMovies.total_pages}
              onClick = {() => handlePageChange(filteredMovies.page + 1, nextPage)}
            >
              <NavigateNextIcon/>
            </Button>
        </div>
        </div>
      )}
    </div>
  )
};

export default GenresMovies;
