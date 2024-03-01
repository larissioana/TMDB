import { useState, useEffect } from 'react'
import styles from './tvSeries.module.css';
import { fetchAPI, IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import TvSeriesCard from '../tvSeriesCard/tvSeriesCard';
import Loading from '../loading/loading';
import { useTvShowsContext } from '@/context/tvSeriesContext';

const TvSeries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

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

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <>
      {!isLoading ?
        <>
          <h2 className={styles.title}>Popular Tv series</h2>
          <div className={styles.tvSeriesContainer}>
            {
              topRatedTvShows.results?.map((result) => {
                const { id, poster_path, name, backdrop_path } = result;
                return <div key={id}>
                  <div
                    className={styles.imgContainer}
                    onMouseEnter={() => handleMouseEnter(id)}
                    onMouseLeave={handleMouseLeave}
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
                    {hoveredId === id && <TvSeriesCard name={name} image={backdrop_path} id={id} />}
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
