import { IMAGE_URL_185 } from '@/utils/fetchFromAPI';
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
        const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.2 };
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
                    src={`${IMAGE_URL_185}${poster_path}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={title}
                    loading="eager"
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
