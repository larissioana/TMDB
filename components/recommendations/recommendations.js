"use strict";
import Image from 'next/image';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import styles from './recommendations.module.css';
import { Typography, CardContent } from '@mui/material';
import { formatDate, shortenTitle } from '@/utils/helpers';
import { useRouter } from 'next/router';

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
              const { id, poster_path, title, original_title, original_name, release_date, media_type, name, first_air_date } = result;
              const formattedDate = formatDate(release_date);
              const formattedSeries = formatDate(first_air_date);
              const shortenedTitleMovie = shortenTitle(title, 20);
              const shortenedTitleTv = shortenTitle(name, 20);

              return <>
                <div key={media_type === "movie" ? title : original_name} className={styles.container}>
                  {
                    media_type === 'movie' ?
                      <>
                        {
                          poster_path &&
                          <div className={styles.containerImg} onClick={() => router.push(`/movie/${id}`)}>
                            <Image
                              className={styles.img}
                              src={`${IMAGE_URL_342}${poster_path}`}
                              fill
                              alt={title}
                              loading="lazy"
                            />
                          </div>
                        }
                        {
                          poster_path !== null &&
                          <CardContent
                            sx={{
                              backgroundColor: "#000000",
                              overflow: "hidden",
                              width: "12.5rem"
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              color="#fff"
                              className="typography"
                            >
                              {shortenedTitleMovie}
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
                        <div className={styles.tvMedia} onClick={() => router.push(`/TvSeries/${id}`)}>
                          {
                            poster_path &&
                            <div
                              className={styles.containerImg}
                            >
                              <Image
                                className={styles.img}
                                src={`${IMAGE_URL_342}${poster_path}`}
                                width={230}
                                height={320}
                                alt={name}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={`${IMAGE_URL_342}${poster_path}`}
                              />
                            </div>
                          }
                        </div>
                        {
                          poster_path !== null &&
                          <CardContent
                            sx={{
                              backgroundColor: "#000000",
                              overflow: "hidden",
                              width: "12.5rem"
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              color="#fff"
                              className="typography"
                            >
                              {shortenedTitleTv}
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
            }).slice(0, 20)}
          </div>
        </>
      }
    </section>
  )
};

export default Recommendations;
