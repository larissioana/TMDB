import React from 'react';
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import styles from './banner.module.css';
import Searchbar from '../searchbar/searchbar';
import Loading from '../loading/loading';
import { useRouter } from 'next/router';
import { useMovieContext } from '@/context/moviesContext';

const Banner = ({ imageUrl, isLoading, id }) => {
    const imageURL = `${IMAGE_URL}${imageUrl}`;
    const router = useRouter();
    const { activeContentType } = useMovieContext();

    const handleOnClick = () => {
        if (activeContentType === 'movie') {
            router.push(`/movie/${id}`)
        } else {
            router.push(`/TvSeries/${id}`)
        }
    };

    return (
        <>
            {
                !isLoading ?
                    <div
                        className={styles.bannerContainer}
                        style={{ backgroundImage: `url(${imageURL})` }}
                    >
                        <Searchbar placeholder="Search for a movie, tv show..." />
                    </div>
                    : <Loading />
            }
        </>

    )
};

export default Banner;
