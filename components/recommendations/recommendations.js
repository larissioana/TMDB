import React from 'react'
import Image from 'next/image';
import { IMAGE_URL, IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import styles from './recommendations.module.css';
import { Typography, CardContent } from '@mui/material';
import Link from 'next/link';

const Recommendations = ({recommendations}) =>
{
    const results = recommendations.results.length  === 0;

  return (
    <div>
        {!results &&
        <>
        <h3 className = {styles.recommendationsTitle}>You might also like</h3>
        <div style = {{
          display: "flex",
          flexWrap: "wrap",
          gap: ".4rem",
          justifyContent: "center",
          alignItems: "flex-start"
        }}>
      {recommendations.results.map((result) =>
      {
        const { id, poster_path, title, release_date } = result;
        const formattedDate = new Date(release_date).toLocaleDateString("en-US",
            {
            month: "short",
            day: "numeric", 
            year: "numeric" 
            });

        return <div key = {id} className = {styles.container}>
           <Link href = {`/movie/${id}`}>
        <div
          className = "card-media"
          style = 
          {{
            borderTop: "1px solid #2e2c2c",
          }}
        >
            {
              poster_path &&
              <div
              className = {styles.containerImg}
              >
                <Image 
                  className = {styles.img}
                  src = {`${IMAGE_URL_SMALL}${poster_path}`}
                  width = "250"
                  height = "320"
                  alt = {title}
                  loading = "lazy"
                  placeholder = "blur" 
                  blurDataURL = {`${IMAGE_URL_SMALL}${poster_path}`}
                />
                </div>
            }
        </div>
      </Link>
      {
        poster_path !== null &&
      
      <CardContent
        sx={{
          backgroundColor: "#000000",
          overflow: "hidden"
        }}
      >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color = "#fff"
            sx = 
            {{
                width: "15rem",
                marginTop: ".6rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color = "#827e73"
          >
            {formattedDate}
          </Typography>
      </CardContent>
      }
        </div>
      }).slice(0, 19)}
      </div>
    </>
    }
    </div>
  )
};

export default Recommendations;
