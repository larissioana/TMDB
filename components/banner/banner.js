import { IMAGE_BACKDROP_LARGE } from '@/utils/fetchFromAPI';
import styles from './banner.module.css';
import Searchbar from '../searchbar/searchbar';
import Loading from '../loading/loading';
import Image from 'next/image';
import NoImage from '../../assets/no-image.webp';

const Banner = ({ imageUrl, isLoading, name, showSearchBar }) => {
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
                                    priority
                                    alt={name}
                                    placeholder='blur'
                                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAAyCAQAAADmH+qEAAAAzElEQVR42u3WMQEAAAwCIE2+6pbYCSloLgAAPKpgAQAIFgCAYAEACBYAAIIFACBYAACCBQCAYAEACBYAgGABACBYAACCBQAgWAAAggUAgGABAAgWAIBgAQAgWAAAggUAIFgAAAgWAIBgAQAIFgAAggUAIFgAAIIFACBYAAAIFgCAYAEACBYAAIIFACBYAACCBQCAYAEACBYAgGABACBYAACCBQAgWAAAggUAgGABAAgWAIBgAQAgWAAAggUAIFgAAAgWAIBgAQAIFgAAAw9YGQHWmW/HAAAAAElFTkSuQmCC"'
                                />
                                :
                                <Image
                                    src={NoImage}
                                    fill
                                    className={styles.bannerImg}
                                    priority
                                    alt={name}
                                />
                        }
                        {showSearchBar &&
                            <Searchbar placeholder="Search for a movie, tv show..." />
                        }
                    </div>
                    : <Loading />
            }
        </>

    )
};

export default Banner;
