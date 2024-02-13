import React from 'react';
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import styles from './banner.module.css';
import Searchbar from '../searchbar/searchbar';
import Loading from '../loading/loading';

const Banner = ({imageUrl, isLoading}) => 
{
    const imageURL = `${IMAGE_URL}${imageUrl}`;

    return (
        <>
        {
            !isLoading ?
            <div 
            className = {styles.bannerContainer}
            style = {{ backgroundImage: `url(${imageURL})`, objectFit: "contain", objectPosition: "right" }}
        >
                <Searchbar placeholder = "Search for a movie, tv shows..."/>
            </div>
            : <Loading/>
        }
        </>
        
    )
};

export default Banner;
