import {useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import { Stack, Box } from '@mui/material';
import { useMovieContext } from '@/context/moviesContext';
import { fetchAPI, IMAGE_URL, IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import Banner from '../banner/banner';
import Movies from '../movies/movies';
import MoviesCategories from '../moviesCategories/moviesCategories.js';

const Feed = () =>
{
    const {movies, setMovies} = useMovieContext();
    const [category, setCategory] = useState('Popular');
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => 
    {
        fetchAPI("popular", 17)
        .then((data) => setMovies(data.results))
    },[category]);

    useEffect(() => 
    {
        fetchAPI("top_rated", 2)
        .then((data) => setTopRatedMovies(data.results))
    },[category]);

    useEffect(() => 
    {
        fetchAPI("upcoming", 2)
        .then((data) => setUpcomingMovies(data.results))
    },[category]);

    return (
        <div>
            <div style = 
                {{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Sidebar/>
                <div style =
                {{
                    width: "100%"
                }}>
                    {
                        upcomingMovies.map((movie, index) => {
                            const {backdrop_path} = movie;
                            return index === 4 ? <Banner key={index} imageUrl={backdrop_path} /> : null;
                        })
                    }
                </div>
            </div>
            <div style = {{
                marginTop: "2rem",
                justifyContent: "center",
                flexDirection: "column",
            }}>
            </div>
            <MoviesCategories
                popular = {movies}
                topRated = {topRatedMovies} 
                upcoming = {upcomingMovies}
            />
        </div>
    )
};

export default Feed;
