import { CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, shortenTitle } from '@/utils/helpers';
import styles from '../mediaType/mediaType.module.css';
import Image from 'next/image';

const MovieCard = ({ movies = [] }) => {
  const
    {
      poster_path,
      original_title,
      release_date,
      id,
      contentType,
      original_name,
      first_air_date,
    } = movies;

  const formattedDate = formatDate(release_date);
  const formattedDateTvShows = formatDate(first_air_date);

  const shortenedTitleMovie = shortenTitle(original_title, 40);
  const shortenedTitleTv = shortenTitle(original_name, 40);

  return (
    <AnimatePresence>
      {
        poster_path !== null && (

          <motion.div
            initial={{ opacity: 0.7, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.8, y: -200 }}
            key={contentType === "movie" ? original_title : original_name}
            transition={{ staggerChildren: 1, delayChildren: 1 }}
          >
            <div>
              {
                contentType === "movie" ?
                  <Link href={`/movie/${id}`}>
                    <div className="card-media">
                      <Image
                        src={`${IMAGE_URL_SMALL}${poster_path}`}
                        width={250}
                        height={352}
                        alt={original_title}
                        loading="eager"
                        className={styles.img}
                      />
                    </div>
                  </Link>
                  :
                  <Link href={`/TvSeries/${id}`}>
                    <div className="card-media">
                      <Image
                        src={`${IMAGE_URL_SMALL}${poster_path}`}
                        width={250}
                        height={352}
                        alt={original_name}
                        loading="eager"
                        className={styles.img}
                      />
                    </div>
                  </Link>
              }
              <CardContent
                sx={{
                  backgroundColor: "#000000",
                }}
              >
                {contentType === "tv" ?
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#fff"
                    className="typography"
                  >
                    {shortenedTitleTv}

                  </Typography>
                  :
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#fff"
                    className="typography"
                  >
                    {shortenedTitleMovie}

                  </Typography>
                }
                {
                  contentType === "movie" ?
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="#827e73"
                    >
                      {formattedDate}
                    </Typography>
                    :
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="#827e73"
                    >
                      {formattedDateTvShows}
                    </Typography>
                }
              </CardContent>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence >
  )
};

export default MovieCard;
