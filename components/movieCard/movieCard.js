import Card from '../cardContent/cardContent';
import Link from 'next/link';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
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
                        src={`${IMAGE_URL_342}${poster_path}`}
                        fill
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
                        src={`${IMAGE_URL_342}${poster_path}`}
                        fill
                        alt={original_name}
                        loading="eager"
                        className={styles.img}
                      />
                    </div>
                  </Link>
              }
              {
                contentType === "tv" ?
                  <Card name={shortenedTitleTv} date={formattedDateTvShows} />
                  :
                  <Card name={shortenedTitleMovie} date={formattedDate} />
              }
            </div>
          </motion.div>
        )
      }
    </AnimatePresence >
  )
};

export default MovieCard;
