import styles from '../styles/tvShows.module.css';
import NavigationBar from '@/components/navigationBar/navigationBar';
import Sidebar from '@/components/sidebar/sidebar';
import { useTvShowsContext } from '@/context/tvSeriesContext';
import Banner from '@/components/banner/banner';
import dynamic from 'next/dynamic';
const TvSeries = dynamic(() => import('@/components/tvSeries/tvSeries'));
import Head from 'next/head';
import { useState, useEffect } from 'react';

const TvShows = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { topRatedTvShows } = useTvShowsContext();

    useEffect(() => {
        if (!topRatedTvShows) {
            setIsLoading(true)
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Tv series</title>
                <meta name="description" content="See the tv shows from TMDB"></meta>
            </Head>
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
                            const { backdrop_path, name } = movie;
                            return index === 0 && <Banner showSearchBar={true} isLoading={isLoading} name={name} key={index} imageUrl={backdrop_path} />;
                        })
                    }
                </div>
            </div>
            {
                !isLoading &&
                <div className={styles.tvShowsContainer}>
                    <TvSeries />
                </div>
            }
        </>
    )
}

export default TvShows;
