import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Card from '../cardContent/cardContent';
import { formatDate, shortenTitle } from '@/utils/helpers';
import Image from 'next/image';
import styles from './mediaType.module.css';
import Head from 'next/head';

const MediaTypeTv = ({ tvShows }) => {
    const { id, poster_path, first_air_date, original_name } = tvShows;
    const formattedDate = formatDate(first_air_date);
    const shortenedTitleTv = shortenTitle(original_name, 40);

    return (
        <AnimatePresence>
            <Head>
                <title>Search</title>
                <meta name="description" content="search for a specific movie, tv show."></meta>
            </Head>
            {
                poster_path !== null &&
                <motion.div
                    initial={{ opacity: 0.7, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.8, y: -200 }}
                    key={id}
                    transition={{ staggerChildren: 1, delayChildren: 1 }}
                >
                    <div>
                        <Link href={`/TvSeries/${id}`}>
                            <div className="card-media">
                                <Image
                                    src={`${IMAGE_URL_342}${poster_path}`}
                                    fill
                                    alt={original_name}
                                    loading="eager"
                                    priority="true"
                                    className={styles.img}
                                    placeholder="blur"
                                    blurDataURL={`${IMAGE_URL_342}${poster_path}`}
                                />
                            </div>
                        </Link>
                        <Card name={shortenedTitleTv} date={formattedDate} />
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default MediaTypeTv;
