"use strict"
import Card from '../cardContent/cardContent';
import Link from 'next/link';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, shortenTitle } from '@/utils/helpers';
import styles from '../mediaType/mediaType.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <AnimatePresence>
      {
        poster_path !== null && (
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2rem"
            }}
            initial={{ opacity: 0.7, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.8, y: -200 }}
            key={contentType === "movie" ? original_title : original_name}
            transition={{ staggerChildren: 1, delayChildren: 1 }}
          >
            {
              contentType === "movie" ?
                <div className="card-media" onClick={() => router.push(`/movie/${id}`, undefined, { shallow: true })}>
                  <Image
                    src={`${IMAGE_URL_342}${poster_path}`}
                    fill
                    alt={original_title}
                    loading="eager"
                    className={styles.img}
                  />
                </div>
                :
                <div className="card-media" onClick={() => router.push(`/TvSeries/${id}`, undefined, { shallow: true })}>
                  <Image
                    src={`${IMAGE_URL_342}${poster_path}`}
                    fill
                    alt={original_name}
                    loading="eager"
                    className={styles.img}
                  />
                </div>
            }
            {
              contentType === "tv" ?
                <Card name={shortenedTitleTv} date={formattedDateTvShows} />
                :
                <Card name={shortenedTitleMovie} date={formattedDate} />
            }
          </motion.div>
        )
      }
    </AnimatePresence >
  )
};

export default MovieCard;
