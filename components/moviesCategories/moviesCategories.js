import { useEffect, useState } from 'react';
import styles from './moviesCategories.module.css';
import Movies from '../movies/movies';
import FeedMovies from '../feedMovies/feedMovies';

const MoviesCategories = ({ popular, topRated, upcoming }) =>
{
    const [isButtonActive, setIsButtonActive] = useState('Popular');
    const [filteredMovies, setFilteredMovies] = useState(popular);
 
    const handleButtonChange = (category) =>
    {
        setIsButtonActive(category);
       
        switch (category)
        {
            case 'Popular':
                setFilteredMovies(popular)
                break;
            case 'Top Rated':
                setFilteredMovies(topRated)
                break;
            case "Upcoming":
                setFilteredMovies(upcoming)
                break;
            default:
                setFilteredMovies([])
        }
    };

    useEffect(() =>
    {
        handleButtonChange(isButtonActive);
    }, [popular, topRated, upcoming]);

    return (
        <div 
            style = 
                {{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem"
                }}
        >
            <FeedMovies isButtonActive = {isButtonActive} handleButtonChange = {handleButtonChange}/>
            <div className = {styles.movies}
            >
                <Movies movies = {filteredMovies}/>
            </div>
        </div>
    )
};

export default MoviesCategories;