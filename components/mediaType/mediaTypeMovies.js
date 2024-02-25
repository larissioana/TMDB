"use strict";
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import { formatDate, shortenTitle } from '@/utils/helpers';
import Image from 'next/image';
import styles from './mediaType.module.css';
import Card from '../cardContent/cardContent';
import { useRouter } from 'next/router';

const MediaTypeMovies = ({ movies }) => {
    const { id, original_title, release_date, poster_path } = movies;
    const formattedDate = formatDate(release_date);
    const shortenedTitleMovie = shortenTitle(original_title, 20);
    const router = useRouter();

    return (
        <AnimatePresence>
            {
                poster_path !== null &&
                <motion.div
                    className={styles.wrapper}
                    initial={{ opacity: 0.7, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.8, y: -200 }}
                    key={id}
                    transition={{ staggerChildren: 1, delayChildren: 1 }}
                >
                    <div className="card-media" onClick={() => router.push(`/movie/${id}`)}>
                        <Image
                            src={`${IMAGE_URL_342}${poster_path}`}
                            fill
                            alt={original_title}
                            loading="lazy"
                            className={styles.img}
                            placeholder="blur"
                            blurDataURL={`${IMAGE_URL_342}${poster_path}`}
                        />
                    </div>
                    <Card name={shortenedTitleMovie} date={formattedDate} />
                </motion.div>
            }
        </AnimatePresence>
    )
};

export default MediaTypeMovies;
