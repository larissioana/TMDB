import React from 'react';
import { Stack } from '@mui/material';
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import styles from './banner.module.css';
import Searchbar from '../searchbar/searchbar';
import Loading from '../loading/loading';

const Banner = ({imageUrl}) => 
{
    const imageURL = `${IMAGE_URL}${imageUrl}`;

    return (
        <>
        {
            imageURL ?
            <div 
            className = {styles.bannerContainer}
            style = {{ backgroundImage: `url(${imageURL})`, objectFit: "contain", objectPosition: "right" }}
        >
                <Searchbar placeholder = "Search for a movie, person ..."/>
            </div>
            : <Loading/>
        }
        </>
        
    )
};

export default Banner;
