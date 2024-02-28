import styles from './seasons.module.css';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import { formatDate } from '@/utils/helpers';
import NoImage from '../../assets/no-image.webp';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Seasons = ({ season }) => {
    const router = useRouter();
    const
        {
            air_date,
            episode_count,
            name,
            overview,
            poster_path,
            season_number,
        } = season;

    const formattedDate = formatDate(air_date);
    const tvSeriesId = router.query.tvSeries;

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    {
                        poster_path ?
                            <Link href={`/TvSeries/${tvSeriesId}/${season_number}`}>
                                <Image
                                    src={`${IMAGE_URL_342}${poster_path}`}
                                    width={185}
                                    alt={name}
                                    height={200}
                                    loading="lazy"
                                    className={styles.img}
                                />
                            </Link>
                            :
                            <Link href={`/TvSeries/${tvSeriesId}/${season_number}`}>
                                <Image
                                    src={NoImage}
                                    width={200}
                                    alt={name}
                                    height={200}
                                    loading="lazy"
                                    className={styles.img}
                                />
                            </Link>
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
