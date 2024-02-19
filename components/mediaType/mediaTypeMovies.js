import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import Link from 'next/link';
import { CardContent, Typography } from '@mui/material';
import { formatDate } from '@/utils/helpers';
import Image from 'next/image';
import styles from './mediaType.module.css';

const MediaTypeMovies = ({ movies }) => {
    const { id, original_title, release_date, poster_path } = movies;
    const formattedDate = formatDate(release_date);

    return (
        <AnimatePresence>
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
                        <Link href={`/movie/${id}`}>
                            <div
                                className="card-media"
                                style={{
                                    borderTop: "1px solid #2e2c2c",
                                    gap: "1rem",
                                    width: "250px"
                                }}
                            >
                                <Image
                                    src={`${IMAGE_URL_SMALL}${poster_path}`}
                                    width={250}
                                    height={320}
                                    alt={original_title}
                                    loading="eager"
                                    className={styles.img}
                                    placeholder="blur"
                                    layout="responsive"
                                    blurDataURL={`${IMAGE_URL_SMALL}${poster_path}`}
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
                                sx={{
                                    width: "12rem"
                                }}
                            >
                                {original_title}
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
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
};

export default MediaTypeMovies;
