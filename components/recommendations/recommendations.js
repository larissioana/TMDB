import React from 'react'
import Image from 'next/image';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import styles from './recommendations.module.css';
import { Typography, CardContent } from '@mui/material';
import Link from 'next/link';
import { formatDate } from '@/utils/helpers';

const Recommendations = ({ recommendations, hasMovies }) => {

  const results = recommendations.results.length === 0;

  return (
    <section className={hasMovies ? styles.recommendationsForMovies : styles.recommendationsForTvSeries}>
      {
        !results &&
        <>
          <h3 className={styles.recommendationsTitle}>You might also like</h3>
          <div className={hasMovies ? styles.moviesWrapper : styles.tvWrapper}>
            {recommendations.results.map((result) => {
              const { id, poster_path, title, release_date, media_type, name, first_air_date } = result;
              const formattedDate = formatDate(release_date);
              const formattedSeries = formatDate(first_air_date);

              return <>
                <div key={id} className={styles.container}>
                  {
                    media_type === 'movie' ?
                      <>
                        <Link href={`/movie/${id}`}>
                          <div className={styles.movieMedia}>
                            {
                              poster_path &&
                              <div
                                className={styles.containerImg}
                              >
                                <Image
                                  className={styles.img}
                                  src={`${IMAGE_URL_342}${poster_path}`}
                                  width={270}
                                  height={320}
                                  layout="responsive"
                                  alt={title}
                                  loading="lazy"
                                  placeholder="blur"
                                  blurDataURL={`${IMAGE_URL_342}${poster_path}`}
                                />
                              </div>
                            }
                          </div>
                        </Link>
                        {
                          poster_path !== null &&
                          <CardContent
                            sx={{
                              backgroundColor: "#000000",
                              overflow: "hidden"
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              color="#fff"
                              className="typography"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              color="#827e73"
                            >
                              {formattedDate}
                            </Typography>
                          </CardContent>
                        }
                      </>
                      :
                      <main className={styles.tv}>
                        <Link href={`/TvSeries/${id}`}>
                          <div className={styles.tvMedia}>
                            {
                              poster_path &&
                              <div
                                className={styles.containerImg}
                              >
                                <Image
                                  className={styles.img}
                                  src={`${IMAGE_URL_342}${poster_path}`}
                                  width={270}
                                  height={320}
                                  alt={name}
                                  layout="responsive"
                                  loading="lazy"
                                  placeholder="blur"
                                  blurDataURL={`${IMAGE_URL_342}${poster_path}`}
                                />
                              </div>
                            }
                          </div>
                        </Link>
                        {
                          poster_path !== null &&
                          <CardContent
                            sx={{
                              backgroundColor: "#000000",
                              overflow: "hidden",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              color="#fff"
                              className="typography"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              color="#827e73"
                            >
                              {formattedSeries}
                            </Typography>
                          </CardContent>

                        }
                      </main>
                  }
                </div>
              </>
            }).slice(0, 30)}
          </div>
        </>
      }
    </section>
  )
};

export default Recommendations;
