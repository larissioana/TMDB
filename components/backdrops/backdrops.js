import React from 'react'
import styles from './backdrops.module.css';
import Image from 'next/image';
import { IMAGE_BACKDROP, IMAGE_URL, IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';

const Backdrops = ({ backdrops }) => {
  const { file_path } = backdrops;

  return (
    <div className={styles.backdrops}>
      <Image
        src={`${IMAGE_BACKDROP}/${file_path}`}
        width={600}
        height={320}
        alt='backdrops'
        loading="lazy"
        className={styles.img}
        placeholder="blur"
        blurDataURL={`${IMAGE_BACKDROP}${file_path}`}
      />
    </div>
  )
};

export default Backdrops;
