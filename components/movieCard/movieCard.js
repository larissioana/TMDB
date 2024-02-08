import { useState, useEffect } from 'react'
import { CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { IMAGE_URL_SMALL, IMAGE_URL } from '@/utils/fetchFromAPI';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../loading/loading';

const MovieCard = ({movies = [], isLoading}) =>
{
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() =>
  {
    setIsVisible(true);
  }, []);

  const
  {
    poster_path, 
    original_title, 
    release_date,
    id
  } = movies;

  const imageUrl = `${IMAGE_URL_SMALL}` + poster_path;
  const shouldRenderCard = imageUrl !== null;
  const inputDate = release_date;
  const formattedDate = new Date(inputDate).toLocaleDateString("en-US",
    {
    month: "short",
    day: "numeric", 
    year: "numeric" 
    });

  return shouldRenderCard  && !isLoading ? (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0.7, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.8, y: -200 }}
          key={id}
          transition={{ staggerChildren: 1, delayChildren: 1 }}
        >
          <div>
            <Link href={`/movie/${id}`}>
              <div
                className="card-media"
                style={{
                  height: "20rem",
                  borderTop: "1px solid #2e2c2c",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    borderRadius: ".1rem",
                  }}
                />
              </div>
            </Link>
            <CardContent
              sx={{
                backgroundColor: "#000000",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="#fff"
                sx={{
                  width: "13rem",
                }}
              >
                {original_title}
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="#827e73"
              >
                {formattedDate}
              </Typography>
            </CardContent>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  ) : <Loading/>; 
};

export default MovieCard;
