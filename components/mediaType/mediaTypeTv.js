import React from 'react'
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { CardContent, Typography } from '@mui/material';
import { formatDate } from '@/utils/helpers';
import Image from 'next/image';
import styles from './mediaType.module.css';

const MediaTypeTv = ({ tvShows }) => {
    const { id, poster_path, first_air_date, original_name } = tvShows;
    const formattedDate = formatDate(first_air_date);

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
                        <Link href={`/TvSeries/${id}`}>
                            <div
                                className="card-media"
                                style={{
                                    height: "20rem",
                                    borderTop: "1px solid #2e2c2c",
                                    gap: "1rem",
                                }}
                            >
                                <Image
                                    src={`${IMAGE_URL_342}${poster_path}`}
                                    width={250}
                                    height={320}
                                    alt={original_name}
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
                            {
                                original_name &&
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    color="#fff"
                                    sx={{
                                        width: "12rem"
                                    }}
                                >
                                    {original_name}
                                </Typography>
                            }
                            {
                                first_air_date &&
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
}

export default MediaTypeTv;
