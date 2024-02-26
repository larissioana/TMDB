import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('@/components/modal/modal'));
const Cast = dynamic(() => import('@/components/cast/cast'));
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styles from '../movieDetail/movieDetail.module.css';
import GenresList from '../genresList/genresList';

const MovieOverview = ({
    movie,
    isModalOpen,
    closeModal,
    openModal,
    credits,
    videoTrailer,
    externalIds,
    formattedTime,
    votePercentage,
    genreNames,
    isLoading

}) => {
    const
        {
            status,
            revenue,
            budget,
            release_date,
            tagline,
            overview,
            title,
            original_language
        } = movie;

    return (
        <div className={styles.flexContainer}>
            <div className={styles.left}>
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
                <GenresList genreNames={genreNames} />
                {
                    overview &&
                    <p className={styles.description}><span className={styles.textBold}>Overview: </span>{overview}</p>
                }
                {
                    !isLoading &&
                    <Cast
                        credits={credits}
                        externalIds={externalIds}
                        status={status}
                        revenue={revenue}
                        budget={budget}
                        genreNames={genreNames}
                    />
                }
            </div>
        </div>
    )
};

export default MovieOverview;
