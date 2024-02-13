import React from 'react'
import { IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import styles from './movies.module.css';
import NoImage from '../../assets/no-image.jpg';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';

const Movies = ({movies}) =>
{
  return (
    <div className = {styles.moviesContainer}>
      { movies.map((movie) =>
      {
        const { poster_path, title, id } = movie;
        const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

        return <motion.div 
                  key = {id} 
                  className = {styles.movies}
                  initial = " hidden"
                  animate = "visible"
                  variants =
                  {{
                    visible: { opacity: 1, y: 0  },
                    hidden: { opacity: 0, y: 200, },
                  }}
                >
                {
                  poster_path ?
                  <motion.div whileHover = {...scale}  initial = {{ opacity: 0, y: 20 }}
                  animate ={ { opacity: 1, y: 0}}
                  exit = {{ opacity: 0, y: -20 }}
                  >
                    <Tooltip
                      id = "tooltip"
                      place = "top"
                    />
                    <Link href = {`/movie/${id}`} data-tooltip-id = "tooltip"
                        data-tooltip-content = {title}>
                      <Image
                        className = {styles.img}
                        src = {`${IMAGE_URL_SMALL}${poster_path}`}
                        width = '160'
                        height = '320'
                        alt = {title}
                        loading = "eager"
                      />
                    </Link>
                  </motion.div>
                  :
                  <motion.div>    
                    <Image
                      className = {styles.img}
                      src = {NoImage}
                      width = '200'
                      height = '200'
                      alt = {title}
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
