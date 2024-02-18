import { useState, useEffect, useMemo } from 'react';
import Sidebar from '../sidebar/sidebar';
import { useMovieContext } from '@/context/moviesContext';
import { fetchAPI } from '@/utils/fetchFromAPI';
import Banner from '../banner/banner';
import MoviesCategories from '../moviesCategories/moviesCategories.js';
import styles from './feed.module.css';

const Feed = () => {
    const { movies, setMovies } = useMovieContext();
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchAPI("popular", 1)
            .then((data) => {
                setMovies(data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchAPI("top_rated", 1)
            .then((data) => {
                setTopRatedMovies(data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchAPI("upcoming", 1)
            .then((data) => {
                setUpcomingMovies(data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            })
    }, []);

    const memoizedMoviesCategories = useMemo(() => (
        <MoviesCategories
            popular={movies}
            topRated={topRatedMovies}
            upcoming={upcomingMovies}
            isLoading={isLoading}
        />
    ), [movies, topRatedMovies, upcomingMovies, isLoading]);

    return (
        <div>
            <div className="feedContainer">
                <div className={styles.wrapper}
                >
                    <Sidebar />
                    <div style=
                        {{
                            width: "100%"
                        }}>
                        {
                            upcomingMovies.map((movie, index) => {
                                const { backdrop_path } = movie;
                                return index === 0 ? <Banner key={index} imageUrl={backdrop_path} isLoading={isLoading} /> : null;
                            })
                        }
                    </div>
                </div>
            </div>
            <div style={{
                marginTop: "2rem",
                justifyContent: "center",
                flexDirection: "column",
            }}>
            </div>
            {memoizedMoviesCategories}
        </div>
    )
};

export default Feed;
