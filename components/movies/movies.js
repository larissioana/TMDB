import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import styles from './movies.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { shortenTitle, vote } from '@/utils/helpers';
import StarIcon from '../../assets/star.png';

const Movies = ({ movies }) => {

  return (
    <div className={styles.moviesContainer}>
      {movies.map((movie) => {
        const { poster_path, title, id, vote_average } = movie;
        const shortenedTitleMovie = shortenTitle(title, 25);
        const voteAverage = vote(vote_average);
        return <div key={id}>
          {
            poster_path &&
            <>
              <motion.div whileHover={{ scale: 1.1 }} initial={{ opacity: 0 }}
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
                    loading="eager"
                  />
                </Link>
              </motion.div>
              <h2 className={styles.title}>{shortenedTitleMovie}</h2>
              <div className="voteContainer">
                <Image src={StarIcon} width={20} height={20} alt="star icon" />
                <p>{voteAverage}</p>
              </div>
            </>
          }
        </div>
      }
      )}
    </div >
  )
};

export default Movies;
