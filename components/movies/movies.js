import React from 'react'
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import styles from './movies.module.css';
import NoImage from '../../assets/no-image.jpg';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Movies = ({ movies }) => {
  return (
    <div className={styles.moviesContainer}>
      {movies.map((movie) => {
        const { poster_path, title, id } = movie;
        const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

        return <motion.div
          key={id}
          className={styles.movies}
          initial=" hidden"
          animate="visible"
          variants=
          {{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 200, },
          }}
        >
          {
            poster_path ?
              <motion.div whileHover={...scale} initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Link href={`/movie/${id}`}>
                  <Image
                    className={styles.img}
                    src={`${IMAGE_URL_342}${poster_path}`}
                    width={160}
                    height={320}
                    alt={title}
                    loading="eager"
                    layout="responsive"
                  />
                </Link>
                <h2 className={styles.title}>{title}</h2>
              </motion.div>
              :
              <motion.div>
                <Image
                  className={styles.img}
                  src={NoImage}
                  width={200}
                  height={200}
                  alt={title}
                  layout="responsive"
                />
              </motion.div>
          }
        </motion.div>
      }
      )}
    </div>
  )
};

export default Movies;
