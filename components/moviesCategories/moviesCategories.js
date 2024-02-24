import React, { useState, useMemo } from 'react';
import styles from './moviesCategories.module.css';
import dynamic from 'next/dynamic';
const FeedMovies = dynamic(() => import('@/components/feedMovies/feedMovies'));
const Movies = dynamic(() => import('@/components/movies/movies'));

const MoviesCategories = ({ popular, topRated, upcoming, isLoading }) => {
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
        <div className={styles.categoriesContainer}>
            <FeedMovies isButtonActive={isButtonActive} handleButtonChange={handleButtonChange} />
            <Movies movies={filteredMovies} />
        </div>
    )
};

export default MoviesCategories;