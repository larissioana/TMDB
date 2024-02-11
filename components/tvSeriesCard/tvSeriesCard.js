import React from 'react'
import styles from './tvSeriesCard.module.css';
import { IMAGE_URL } from '@/utils/fetchFromAPI';

const TvSeriesCard = ({image}) =>
{
  return (
    <div className = {styles.card}>
     <div 
        style = {{
        backgroundImage: `url('${IMAGE_URL}${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        width: "100%",
        height: "100%",
        }}
      >
      </div>
    </div>
  )
};

export default TvSeriesCard;
