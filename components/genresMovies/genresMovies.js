import { useState, useEffect } from 'react'
import { fetchAPIFilteredMovies, IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
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
    total_results: 0
};

const GenresMovies = () => 
{
    const [filteredMovies, setFilteredMovies] = useState(() => 
    {
      const storedState = localStorage.getItem('filteredMovies');
      return storedState ? JSON.parse(storedState) : initialState;
    });
  
    const { activeGenre } = useMovieContext();

    const fetchMovies = async (page, activeGenre) => {
        try {
            const movies = await fetchAPIFilteredMovies(page, activeGenre);
            setFilteredMovies((prev) =>
            {
                return {
                    ...movies,
                    results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
                }
                
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() =>
    {
      setFilteredMovies(initialState);
      fetchMovies(1, activeGenre);
    }, [activeGenre]);
    
    useEffect(() => 
    {
       localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    },[filteredMovies]);

    const nextPage = filteredMovies.page + 1;
    const previousPage = filteredMovies.page - 1;

    const handlePageChange = async (newPage) => {
        if (newPage <= 300)
        {
            try 
            {
                const movies = await fetchAPIFilteredMovies(newPage, activeGenre);
                setFilteredMovies(
                    {
                        page: newPage,
                        results: movies.results,
                        total_pages: movies.total_pages,
                        total_results: movies.total_results
                    }
                )
                window.scrollTo(0, 0)

            } catch (error)
            {
                console.log('Api error', error)
            }
        }
    }

  return (
    <div>
        <NavigationBar/>
       
        <div style = 
                {{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Sidebar/>
                <AnimatePresence>
                <motion.div style =
                {{
                    width: "100%"
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -70 }}
                
                >
                    {
                        filteredMovies.results.map((movie, index) => {
                            const {backdrop_path} = movie;
                            return index === 4 ? <Banner key={index} imageUrl={backdrop_path} /> : null;
                        })
                    }
                </motion.div>
                </AnimatePresence>
            </div>
            <div className = {styles.wrapper}>
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
            disabled = {filteredMovies.page === 1}
            onClick = {() => handlePageChange(filteredMovies.page -1, previousPage)}
          >
            Previous Page
          </Button>
          <Typography variant="body1" sx={{ marginX: '1rem' }}>
            Page {filteredMovies.page} of {Math.min(filteredMovies.total_pages, 300)}
          </Typography>
          <Button
            className = "pagination-btn"
            disabled = {filteredMovies.page === filteredMovies.total_pages}
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
