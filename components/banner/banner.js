import React from 'react';
import { Stack } from '@mui/material';
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import styles from './banner.module.css';
import Searchbar from '../searchbar/searchbar';

const Banner = ({imageUrl}) => 
{
    const imageURL = `${IMAGE_URL}${imageUrl}`;

    return (
        <div 
            className = {styles.bannerContainer}
            style = {{ backgroundImage: `url(${imageURL})`, objectFit: "contain", objectPosition: "right" }}
        >
            <Searchbar placeholder = "Search for a movie, person ..."/>
        </div>
    )
};

export default Banner;
