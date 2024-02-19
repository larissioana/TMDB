import { useState } from 'react'
import Head from 'next/head';
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import NavigationBar from '../navigationBar/navigationBar';
import styles from './movieDetail.module.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/modal/modal'));
const Cast = dynamic(() => import('@/components/cast/cast'));
const MovieImages = dynamic(() => import('@/components/movieImages/movieImages'));
const Recommendations = dynamic(() => import('@/components/recommendations/recommendations'));
const MovieDetail = ({
    movie,
    videoTrailer,
    credits,
    recommendations,
    externalIds,
    movieImages
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const
        {
            overview,
            backdrop_path,
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
                priority
                style=
                {{
                    backgroundImage: backdrop_path ? `url('${IMAGE_URL}${backdrop_path}')` : null,
                    backgroundPosition: 'top',
                    backgroundSize: 'cover'
                }}
            >
                <div className={styles.flexContainer}>
                    <div className={styles.titleAndPlayBtn}>
                        <h2 className={styles.title}>{title}</h2>
                        {
                            videoTrailer.results.length > 0 &&
                            <>
                                <div className={styles.btnContainer}>
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
            <div>
                <h2 className={styles.moreImages}>More images</h2>
                {
                    movieImages.posters.length > 0 &&
                    <div className={styles.imagesFlexContainer}>
                        {
                            movieImages.backdrops.map((poster, index) => {
                                const { file_path } = poster;
                                return <MovieImages title={title} key={index} image={file_path} />

                            }).slice(2, 8)
                        }
                    </div>
                }
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
