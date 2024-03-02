import styles from './movieImages.module.css';
import Image from 'next/image';
import { IMAGE_BACKDROP } from '@/utils/fetchFromAPI';

const MovieImages = ({ image, title }) => {
    return (
        <Image
            src={`${IMAGE_BACKDROP}${image}`}
            width={400}
            height={250}
            alt={title}
            className={styles.posters}
            loading="lazy"
            placeholder="blur"
            blurDataURL={`${IMAGE_BACKDROP}${image}`}
        />
    )
};

export default MovieImages;
