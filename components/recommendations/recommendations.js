import React from 'react'
import Image from 'next/image';
import { IMAGE_URL} from '@/utils/fetchFromAPI';
import styles from './recommendations.module.css';
import { Typography, CardContent} from '@mui/material';
import Link from 'next/link';

const Recommendations = ({recommendations}) =>
{
    const results = recommendations.results.length  === 0;

  return (
    <div>
        {!results &&
        <>
        <h3 className = {styles.recommendationsTitle}>Recommendations</h3>
        <div style = {{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
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
            height: "20rem",
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
                  src = {`${IMAGE_URL}${poster_path}`}
                  width = '200'
                  height = '200'
                  alt = {title}
                />
                </div>
            }
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
            color = "#fff"
            sx = 
            {{
                width: "13rem",
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
        </div>
      }).slice( 0, 10)}
      </div>
    </>
    }
    </div>
  )
};

export default Recommendations;
