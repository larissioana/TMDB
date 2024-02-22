import styles from './movieImages.module.css';
import Image from 'next/image';
import { IMAGE_BACKDROP } from '@/utils/fetchFromAPI';

const MovieImages = ({ image, title }) => {
    return (
        <Image
            src={`${IMAGE_BACKDROP}${image}`}
            width={630}
            height={370}
            alt={title}
            className={styles.posters}
            loading="eager"
        />
    )
};

export default MovieImages;
