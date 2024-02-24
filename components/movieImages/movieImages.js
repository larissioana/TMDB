import styles from './movieImages.module.css';
import Image from 'next/image';
import { IMAGE_BACKDROP } from '@/utils/fetchFromAPI';

const MovieImages = ({ image, title }) => {
    return (
        <Image
            src={`${IMAGE_BACKDROP}${image}`}
            width={500}
            height={300}
            alt={title}
            className={styles.posters}
            loading="lazy"
        />
    )
};

export default MovieImages;
