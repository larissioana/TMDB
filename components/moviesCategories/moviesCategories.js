import React, { useState, useMemo } from 'react';
import styles from './moviesCategories.module.css';
import Movies from '../movies/movies';
import FeedMovies from '../feedMovies/feedMovies';

const MoviesCategories = ({ popular, topRated, upcoming }) => {
    const [isButtonActive, setIsButtonActive] = useState('Popular');

    const handleButtonChange = (category) => {
        setIsButtonActive(category);
    };

    const filteredMovies = useMemo(() => {
        switch (isButtonActive) {
            case 'Popular':
                return popular;
            case 'Top Rated':
                return topRated;
            case 'Upcoming':
                return upcoming;
            default:
                return [];
        }
    }, [popular, isButtonActive]);

    return (
        <div
            style=
            {{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
            }}
        >
            <FeedMovies isButtonActive={isButtonActive} handleButtonChange={handleButtonChange} />
            <div className={styles.movies}
            >
                <Movies movies={filteredMovies} />
            </div>
        </div>
    )
};

export default MoviesCategories;