"use strict";
import Image from 'next/image';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import styles from './recommendations.module.css';
import dynamic from 'next/dynamic';
import { formatDate, shortenTitle } from '@/utils/helpers';
import { useRouter } from 'next/router';
const Card = dynamic(() => import('@/components/cardContent/cardContent'));

const Recommendations = ({ recommendations, hasMovies }) => {

  const results = recommendations.results.length === 0;
  const router = useRouter();

  return (
    <section className={hasMovies ? styles.recommendationsForMovies : styles.recommendationsForTvSeries}>
      {
        !results &&
        <>
          <h3 className={styles.recommendationsTitle}>You might also like</h3>
          <div className={hasMovies ? styles.moviesWrapper : styles.tvWrapper}>
            {recommendations.results.map((result) => {
              const { id, poster_path, title, original_name, release_date, media_type, name, first_air_date } = result;
              const formattedDate = formatDate(release_date);
              const formattedSeries = formatDate(first_air_date);
              const shortenedTitleMovie = shortenTitle(title, 20);
              const shortenedTitleTv = shortenTitle(name, 20);

              return <div key={media_type === "movie" ? title : original_name}>
                <div className={styles.container}>
                  {
                    media_type === 'movie' ?
                      <>
                        {
                          poster_path &&
                          <div className={styles.containerImg} onClick={() => router.push(`/movie/${id}`)}>
                            <Image
                              className={styles.img}
                              src={`${IMAGE_URL_342}${poster_path}`}
                              width={180}
                              height={280}
                              alt={title}
                              loading="lazy"
                            />
                          </div>
                        }
                        {
                          poster_path !== null &&
                          <Card name={shortenedTitleMovie} date={formattedDate} />
                        }
                      </>
                      :
                      <main className={styles.tv}>
                        <div className={styles.tvMedia} onClick={() => router.push(`/TvSeries/${id}`)}>
                          {
                            poster_path &&
                            <div
                              className={styles.containerImg}
                            >
                              <Image
                                className={styles.img}
                                src={`${IMAGE_URL_342}${poster_path}`}
                                width={180}
                                height={280}
                                alt={name}
                                loading="lazy"
                              />
                            </div>
                          }
                        </div>
                        {
                          poster_path !== null &&
                          <Card name={shortenedTitleTv} date={formattedSeries} />
                        }
                      </main>
                  }
                </div>
              </div>
            }).slice(0, 14)}
          </div>
        </>
      }
    </section>
  )
};

export default Recommendations;
