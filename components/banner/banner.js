import React from 'react';
import { IMAGE_BACKDROP_LARGE, IMAGE_URL } from '@/utils/fetchFromAPI';
import styles from './banner.module.css';
import Searchbar from '../searchbar/searchbar';
import Loading from '../loading/loading';
import Image from 'next/image';

const Banner = ({ imageUrl, isLoading, name }) => {
    const imageURL = `${IMAGE_BACKDROP_LARGE}${imageUrl}`;

    return (
        <>
            {
                !isLoading ?
                    <div className={styles.bannerContainer}>
                        <Image
                            src={`${imageURL}`}
                            fill
                            loading="eager"
                            objectFit="cover"
                            alt={name}
                        />
                        <Searchbar placeholder="Search for a movie, tv show..." />
                    </div>
                    : <Loading />
            }
        </>

    )
};

export default Banner;
