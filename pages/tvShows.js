import styles from '../styles/tvShows.module.css';
import NavigationBar from '@/components/navigationBar/navigationBar';
import Sidebar from '@/components/sidebar/sidebar';
import { useTvShowsContext } from '@/context/tvSeriesContext';
import Banner from '@/components/banner/banner';
import dynamic from 'next/dynamic';
const TvSeries = dynamic(() => import('@/components/tvSeries/tvSeries'));

const TvShows = () => {
    const { topRatedTvShows } = useTvShowsContext();

    return (
        <div className={styles.wrapper}>
            <NavigationBar />
            <div className={styles.flexContainer}>
                <Sidebar />
                <div
                    className={styles.banner}
                    style=
                    {{
                        width: "100%",
                    }}
                >
                    {
                        topRatedTvShows.results?.map((movie, index) => {
                            const { backdrop_path, id } = movie;
                            return index === 1 ? <Banner id={id} key={index} imageUrl={backdrop_path} /> : null;
                        })
                    }
                </div>
            </div>
            <div className={styles.tvShowsContainer}>
                <TvSeries />
            </div>
        </div>
    )
}

export default TvShows;
