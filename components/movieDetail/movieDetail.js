import { useState } from 'react'
import Head from 'next/head';
import Image from 'next/image';
import { IMAGE_URL, IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import NavigationBar from '../navigationBar/navigationBar';
import styles from './movieDetail.module.css';
import NoImage from '../../assets/no-image.jpg';
import Modal from '../modal/modal';
import Cast from '../cast/cast';
import Recommendations from '../recommendations/recommendations';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const MovieDetail = ({
    movie, 
    videoTrailer, 
    credits, 
    recommendations,
    externalIds
}) =>
{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const 
    {
        overview, 
        backdrop_path, 
        poster_path,
        release_date,
        tagline,
        vote_average,
        title,
        original_language,
        runtime,
        status,
        revenue,
        budget,
        genres
    } = movie;
 
    const closeModal = () =>
    {
        setIsModalOpen(false);
    };

    const openModal = () =>
    {
        setIsModalOpen(true);
    };

    const vote = Math.floor(vote_average);
    const hours = Math.floor(runtime / 60);
    const minutes  = Math.floor(runtime % 60);
    const formattedTime = hours + "h " +  minutes + "min";
    const genreNames = genres.map((genre) => genre.name);

  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        <NavigationBar/>
        <div 
            className={styles.movieContent}
            style =
            {{
                backgroundImage: `url('${IMAGE_URL}${backdrop_path}')`,
                backgroundPosition: 'top',
                backgroundSize:'cover'
            }}
            >
                <div className = {styles.flexContainer}>
                    <div className = {styles.col1}>
                        <h2 className ={styles.title}>{title}</h2>
                        <p className = {styles.tagline}>{tagline}</p>
                        <span className = {styles.releaseDate}>{release_date}
                        <span className = {styles.language}>  ({original_language}). </span>
                            {formattedTime}
                        </span>
                        <div className = {styles.genres}>
                            <ul className = {styles.genresList}>
                                {genreNames.map((genreName, index) => (
                                <li key = {index}>{genreName}</li>
                                ))}
                            </ul>
                        </div>
                        <p className = {styles.description}>Overview: {overview}</p>
                        <p className = {styles.vote}>
                            <span className = {styles.text}>{vote}</span>
                        </p>
                    </div>
                    <div className={styles.col2}>
                        {
                           poster_path ? 
                            <Image 
                                src = {IMAGE_URL_SMALL + poster_path} 
                                width = '300' 
                                height = '400' 
                                alt = {title} 
                                className = {styles.posterPath}
                                loading = "lazy"
                            />
                            :
                            <Image 
                                src = {NoImage}
                                alt = {title}  
                                width = '300' 
                                height = '400' 
                                className = {styles.cardImg}
                            />
                        }
                        <div style = 
                            {{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: ".5rem",
                                marginTop: "1rem"
                            }}
                        >
                          <button className = {styles.viewTrailer}>Play trailer</button>
                          <PlayCircleIcon className = {styles.playIcon} onClick = {openModal}/>
                        </div>
                           <Modal 
                                isOpen = {isModalOpen}
                                onClose = {closeModal} 
                                videoTrailer = {videoTrailer}
                            />
                    </div>
                </div>
            </div>
            <div className = {styles.movieDetailContainer}>
                <Cast
                    credits = {credits} 
                    externalIds = {externalIds} 
                    status = {status} 
                    revenue = {revenue}  
                    budget = {budget} 
                    genreNames = {genreNames}
                />
                <div className = {styles.recommendationsContainer}>
                    <Recommendations recommendations = {recommendations}/>
                </div>
            </div>
    </>
  )
};

export default MovieDetail;
