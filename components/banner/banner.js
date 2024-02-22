import { IMAGE_BACKDROP_LARGE } from '@/utils/fetchFromAPI';
import styles from './banner.module.css';
import Searchbar from '../searchbar/searchbar';
import Loading from '../loading/loading';
import Image from 'next/image';
import NoImage from '../../assets/no-image.webp';

const Banner = ({ imageUrl, isLoading, name }) => {
    const imageURL = `${IMAGE_BACKDROP_LARGE}${imageUrl}`;

    return (
        <>
            {
                !isLoading ?
                    <div className={styles.bannerContainer}>
                        {
                            imageUrl ?
                                <Image
                                    src={`${imageURL}`}
                                    fill
                                    className={styles.bannerImg}
                                    loading="eager"
                                    alt={name}
                                />
                                :
                                <Image
                                    src={NoImage}
                                    fill
                                    className={styles.bannerImg}
                                    loading="eager"
                                    alt={name}
                                />
                        }
                        <Searchbar placeholder="Search for a movie, tv show..." />
                    </div>
                    : <Loading />
            }
        </>

    )
};

export default Banner;
