import React from 'react'
import styles from './backdrops.module.css';
import Image from 'next/image';
import { IMAGE_URL } from '@/utils/fetchFromAPI';

const Backdrops = ({backdrops}) =>
{
  const { file_path } = backdrops;
  
  return (
    <div className = {styles.backdrops}>
      <Image
        src = {`${IMAGE_URL}/${file_path}`}
        width = "500"
        height = "300"
        alt = 'backdrops'
        loading = "eager"
        className = {styles.img}
      />
    </div>
  )
};

export default Backdrops;
