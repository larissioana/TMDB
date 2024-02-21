import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Link from 'next/link';
import { CardContent, Typography } from '@mui/material';
import { formatDate, shortenTitle } from '@/utils/helpers';
import Image from 'next/image';
import styles from './mediaType.module.css';

const MediaTypeMovies = ({ movies }) => {
    const { id, original_title, release_date, poster_path } = movies;
    const formattedDate = formatDate(release_date);
    const shortenedTitleMovie = shortenTitle(original_title, 20);

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
                    <>
                        <Link href={`/movie/${id}`}>
                            <div className="card-media">
                                <Image
                                    src={`${IMAGE_URL_342}${poster_path}`}
                                    fill
                                    alt={original_title}
                                    loading="eager"
                                    className={styles.img}
                                    placeholder="blur"
                                    blurDataURL={`${IMAGE_URL_342}${poster_path}`}
                                />
                            </div>
                        </Link>
                        <CardContent
                            sx={{
                                backgroundColor: "#000000",
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                color="#fff"
                                className="typography"
                            >
                                {shortenedTitleMovie}
                            </Typography>
                            {
                                release_date &&
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    color="#827e73"
                                >
                                    {formattedDate}
                                </Typography>
                            }
                        </CardContent>
                    </>
                </motion.div>
            }
        </AnimatePresence>
    )
};

export default MediaTypeMovies;
