import { useState, useEffect } from 'react'
import styles from './tvSeries.module.css';
import { fetchAPI, IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import Loading from '../loading/loading';
import { useTvShowsContext } from '@/context/tvSeriesContext';

const TvSeries = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { topRatedTvShows, setTopRatedTvShows } = useTvShowsContext();

  const fetchTvSeries = async (page) => {
    try {
      setIsLoading(true);
      fetchAPI("tv", "top_rated", page)
        .then((data) => {
          setTopRatedTvShows(data);
          setIsLoading(false);
        })
    } catch (error) {
      console.error("Error fetching data:", error)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTvSeries(1);
  }, []);

  return (
    <>
      {!isLoading ?
        <>
          <h2 className={styles.title}>Popular Tv series</h2>
          <div className={styles.tvSeriesContainer}>
            {
              topRatedTvShows.results?.map((result) => {
                const { id, poster_path, name } = result;
                return <div key={id}>
                  <div
                    className={styles.imgContainer}
                  >
                    {
                      poster_path &&
                      <Image
                        src={`${IMAGE_URL_342}${poster_path}`}
                        fill
                        alt={name}
                        className={styles.img}
                        loading="eager"
                      />
                    }
                  </div>
                  <h2 className={styles.name}>{name}</h2>
                  {isLoading && <Loading />}
                </div>
              })}
          </div>
        </>
        :
        <Loading />
      }

    </>
  )
};

export default TvSeries;
