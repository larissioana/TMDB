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
        width = "640"
        height = "320"
        alt = 'backdrops'
        loading = "lazy"
        className = {styles.img}
        placeholder = "blur" 
        blurDataURL = {`${IMAGE_URL}${file_path}`}
      />
    </div>
  )
};

export default Backdrops;
