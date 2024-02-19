import styles from './movieImages.module.css';
import Image from 'next/image';
import { IMAGE_URL } from '@/utils/fetchFromAPI';

const MovieImages = ({ image, title }) => {
    return (
        <>
            <Image
                src={`${IMAGE_URL}${image}`}
                width={230}
                height={320}
                alt={title}
                className={styles.posters}
                loading="eager"
            />
        </>
    )
};

export default MovieImages;
