import React from 'react'
import styles from './seasons.module.css';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import { formatDate } from '@/utils/helpers';
import NoImage from '../../assets/no-image.jpg';

const Seasons = ({ season }) => {
    const
        {
            air_date,
            episode_count,
            name,
            overview,
            poster_path,
        } = season;

    const formattedDate = formatDate(air_date);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    {
                        poster_path ?
                            <Image
                                src={`${IMAGE_URL_342}${poster_path}`}
                                width="240"
                                alt={name}
                                height="240"
                                loading="eager"
                                className={styles.img}
                                layout="responsive"
                            />
                            :
                            <Image
                                src={NoImage}
                                width="240"
                                alt={name}
                                height="240"
                                loading="lazy"
                                className={styles.img}
                                layout="responsive"
                            />
                    }
                </div>
                <div className={styles.right}>
                    <h3 className={styles.name}>{name}</h3>
                    <div className={styles.flexContainer}>
                        <p className={styles.date}>{formattedDate}.</p>
                        <p className={styles.episodes}>{episode_count} Episodes</p>
                    </div>
                    {
                        overview &&
                        <p className={styles.overview}>
                            <span className={styles.overviewSpan}>Overview: </span>
                            {overview}
                        </p>
                    }
                </div>
            </div>
        </div>
    )
};

export default Seasons;
