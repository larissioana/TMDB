import React from 'react';
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import styles from './banner.module.css';
import Searchbar from '../searchbar/searchbar';
import Loading from '../loading/loading';
import Image from 'next/image';

const Banner = ({ imageUrl, isLoading, name }) => {
    const imageURL = `${IMAGE_URL}${imageUrl}`;

    return (
        <>
            {
                !isLoading ?
                    <div className={styles.bannerContainer}>
                        <Image
                            src={`${imageURL}`}
                            fill
                            priority
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
