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
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const popularData = await fetchAPI("movie", "popular", 1);
                setMovies(popularData.results);

                const topRatedData = await fetchAPI("movie", "top_rated", 1);
                setTopRatedMovies(topRatedData.results);

                const upcomingData = await fetchAPI("movie", "upcoming", 1);
                setUpcomingMovies(upcomingData.results);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
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
            <div className={styles.wrapper}
            >
                <Sidebar />
                <div style=
                    {{
                        width: "100%"
                    }}>
                    {
                        upcomingMovies.map((movie, index) => {
                            const { backdrop_path, id } = movie;
                            return index === 0 ? <Banner id={id} key={index} imageUrl={backdrop_path} isLoading={isLoading} /> : null;
                        })
                    }
                </div>
            </div>
            {memoizedMoviesCategories}
        </div>
    )
};

export default Feed;
