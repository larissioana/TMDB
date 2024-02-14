import { CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { IMAGE_URL_SMALL, IMAGE_URL } from '@/utils/fetchFromAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '@/utils/helpers';

const MovieCard = ({movies = [], isLoading}) =>
{
  const
  {
    poster_path, 
    original_title, 
    release_date,
    id,
    contentType,
    original_name,
    first_air_date
  } = movies;

  const imageUrl = `${IMAGE_URL_SMALL}` + poster_path;
  const formattedDate = formatDate(release_date);
  const formattedDateTvShows = formatDate(first_air_date);

  return (
    <AnimatePresence>
      {
        poster_path !== null &&(
      
        <motion.div
          initial = {{ opacity: 0.7, y: 0 }}
          animate = {{ opacity: 1, y: 0 }}
          exit = {{ opacity: 0.8, y: -200 }}
          key = {id}
          transition = {{ staggerChildren: 1, delayChildren: 1 }}
        >
          <div>
            {
              contentType === "movie" ?
              <Link href = {`/movie/${id}`}>
              <div
                className = "card-media"
                style = {{
                  height: "20rem",
                  borderTop: "1px solid #2e2c2c",
                  gap: "1rem",
                }}
              >
                <div
                  style = {{
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
            :
            <Link href = {`/TvSeries/${id}`}>
            <div
              className = "card-media"
              style = {{
                height: "20rem",
                borderTop: "1px solid #2e2c2c",
                gap: "1rem",
              }}
            >
              <div
                style = {{
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
            }
            <CardContent
              sx={{
                backgroundColor: "#000000",
              }}
            >
              { contentType === "movie" ?
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
              :
              <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#fff"
              sx={{
                width: "13rem",
              }}
            >
              {original_name}
            
            </Typography>
            }
            {
              contentType === "movie"?
              <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="#827e73"
            >
              {formattedDate }
            </Typography>
            :
            <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="#827e73"
          >
            {formattedDateTvShows }
          </Typography>
            }
            </CardContent>
          </div>
        </motion.div>
        )}
    </AnimatePresence>
  ) 
};

export default MovieCard;
