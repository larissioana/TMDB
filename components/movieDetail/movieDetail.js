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
}) => {
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

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const vote = Math.floor(vote_average);
    const votePercentage = vote / 10 * 100;
    const hours = Math.floor(runtime / 60);
    const minutes = Math.floor(runtime % 60);
    const formattedTime = hours + "h " + minutes + "min";
    const genreNames = genres.map((genre) => genre.name);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <NavigationBar />
            <div
                className={styles.movieContent}
                style=
                {{
                    backgroundImage: backdrop_path ? `url('${IMAGE_URL}${backdrop_path}')` : null,
                    backgroundPosition: 'top',
                    backgroundSize: 'cover'
                }}
            >
                <div className={styles.flexContainer}>
                    <div className={styles.col2}>
                        {
                            poster_path ?
                                <Image
                                    src={IMAGE_URL_SMALL + poster_path}
                                    width={400}
                                    height={520}
                                    alt={title}
                                    className={styles.posterPath}
                                    loading="eager"
                                    placeholder="blur"
                                    blurDataURL={`${IMAGE_URL_SMALL}${poster_path}`}
                                />
                                :
                                <Image
                                    src={NoImage}
                                    alt={title}
                                    width={400}
                                    height={560}
                                    className={styles.cardImg}
                                />
                        }
                        {
                            videoTrailer.results.length > 0 &&
                            <>
                                <div style=
                                    {{
                                        display: "flex",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: ".5rem",
                                        marginTop: "1rem"
                                    }}
                                >
                                    <button className={styles.viewTrailer}>Play trailer</button>
                                    <PlayCircleIcon className={styles.playIcon} onClick={openModal} />
                                </div>
                                <Modal
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                    videoTrailer={videoTrailer}
                                />
                            </>
                        }
                    </div>
                    <div className={styles.col1}>
                        <h2 className={styles.title}>{title}</h2>
                        <h3 className={styles.tagline}>{tagline}</h3>
                        <div className={styles.voteFlexContainer}>
                            <p className={styles.vote}>
                                <span className={styles.text}>{votePercentage}%</span>
                            </p>
                            <p className={styles.userScore}>User score</p>
                        </div>
                        <p className={styles.releaseDate}>
                            <span className={styles.textBold}>Release date: </span>
                            {release_date}
                            <span className={styles.language}>  ({original_language}). </span>
                            {formattedTime}
                        </p>
                        <div className={styles.genres}>
                            <ul className={styles.genresList}>
                                <p className={styles.textBold}>Genres: </p>
                                {genreNames.map((genreName, index) => (
                                    <>
                                        {index > 0 && ","}
                                        <li key={index} className={styles.textBold}>{genreName}</li>
                                    </>
                                ))}
                            </ul>
                        </div>
                        {
                            overview &&
                            <p className={styles.description}><span className={styles.textBold}>Overview: </span>{overview}</p>
                        }
                        <Cast
                            credits={credits}
                            externalIds={externalIds}
                            status={status}
                            revenue={revenue}
                            budget={budget}
                            genreNames={genreNames}
                        />
                    </div>

                </div>
            </div>
            <div className={styles.movieDetailContainer}>
                <div className={styles.recommendationsContainer}>
                    <Recommendations hasMovies={true} recommendations={recommendations} />
                </div>
            </div>
        </>
    )
};

export default MovieDetail;
