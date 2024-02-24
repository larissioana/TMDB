"use strict";
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import styles from './mediaType.module.css';
import { useRouter } from 'next/router';

const MediaTypePerson = ({ person }) => {

    const { profile_path } = person;
    const router = useRouter();
    return (
        <AnimatePresence>
            {
                profile_path &&
                <motion.div
                    className={styles.wrapper}
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
                                    <div className="card-media" onClick={() => router.push(`/actor/${id}`)}>
                                        <Image
                                            src={`${IMAGE_URL_342}${profile_path}`}
                                            fill
                                            alt={name}
                                            loading="lazy"
                                            className={styles.img}
                                            placeholder="blur"
                                            blurDataURL={`${IMAGE_URL_342}${profile_path}`}
                                        />
                                    </div>
                                    <Card name={name} date={""} />
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
