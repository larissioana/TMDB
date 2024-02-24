import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import styles from './movies.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { shortenTitle } from '@/utils/helpers';

const Movies = ({ movies }) => {

  return (
    <div className={styles.moviesContainer}>
      {movies.map((movie) => {
        const { poster_path, title, id } = movie;
        const shortenedTitleMovie = shortenTitle(title, 25);
        const scale = { scale: 1.1 };
        return <div key={id}>
          {
            poster_path &&
            <>
              <motion.div whileHover={...scale} initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                exit={{ opacity: 0 }}
                className={styles.cardContainer}
              >
                <Link href={`/movie/${id}`}>
                  <Image
                    className={styles.img}
                    src={`${IMAGE_URL_342}${poster_path}`}
                    fill
                    alt={title}
                    loading="lazy"
                  />
                </Link>
              </motion.div>
              <h2 className={styles.title}>{shortenedTitleMovie}</h2>
            </>
          }
        </div>
      }
      )}
    </div>
  )
};

export default Movies;
