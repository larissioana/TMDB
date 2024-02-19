import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import { CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import styles from './mediaType.module.css';

const MediaTypePerson = ({ person }) => {
    const { profile_path } = person;

    return (
        <AnimatePresence>
            {
                profile_path &&
                <motion.div
                    initial={{ opacity: 0.7, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.8, y: -200 }}
                    key={id}
                    transition={{ staggerChildren: 1, delayChildren: 1 }}
                >
                    <div>
                        {
                            person.map((item) => {
                                const { id, profile_path, name } = item;
                                return <div key={id}>
                                    <Link href={`/actor/${id}`}>
                                        <div
                                            className="card-media"
                                            style={{
                                                height: "20rem",
                                                borderTop: "1px solid #2e2c2c",
                                                gap: "1rem",
                                            }}
                                        >
                                            <Image
                                                src={`${IMAGE_URL_342}${profile_path}`}
                                                width={250}
                                                height={320}
                                                alt={name}
                                                loading="eager"
                                                className={styles.img}
                                                placeholder="blur"
                                                blurDataURL={`${IMAGE_URL_342}${profile_path}`}
                                            />
                                        </div>
                                    </Link>
                                    <CardContent
                                        sx={{
                                            backgroundColor: "#000000",
                                        }}
                                    >
                                        {
                                            name &&
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight="bold"
                                                color="#fff"
                                            >
                                                {name}
                                            </Typography>
                                        }
                                    </CardContent>
                                </div>
                            })
                        }
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
};

export default MediaTypePerson;
