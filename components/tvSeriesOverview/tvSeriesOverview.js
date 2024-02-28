import React from 'react'
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { IMAGE_URL_185 } from '@/utils/fetchFromAPI';
import styles from '../tvSeriesDetail/tvSeriesDetail.module.css';
import GenresList from '../genresList/genresList';
const Modal = dynamic(() => import('@/components/modal/modal'));
import Link from 'next/link';
import LanguageIcon from '@mui/icons-material/Language';
import { PlayArrow } from '@mui/icons-material';
import NoImage from '../../assets/blankphoto.webp';
const TvSeriesOverview = ({
    name,
    formattedDate,
    original_language,
    genresName,
    votePercentage,
    videos,
    handleModalClose,
    handleModalOpen,
    isModalOpen,
    tagline,
    overview,
    number_of_episodes,
    number_of_seasons,
    status,
    homepage,
    created_by,
    seasons,
}) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className={styles.flexContainer}>
            <div className={styles.right}>
                <h2 className={styles.title}>{name}</h2>
                <p className={styles.date}>First air date:
                    <span className={styles.firstDate}> {formattedDate} </span>
                    <span className={styles.language}>({original_language})</span>
                </p>
                <GenresList genreNames={genresName} />
                <div className={styles.voteContainer}>
                    <div className={styles.vote}>
                        <p className={styles.voteText}>{votePercentage}%</p>
                    </div>
                    <p className={styles.text}>User score</p>
                    {
                        videos.results.length > 0 &&
                        <>
                            <div className={styles.trailer}>
                                <PlayArrow className={styles.playIcon} onClick={handleModalOpen} />
                                <p className={styles.text}>Play trailer</p>
                            </div>
                            <Modal
                                isOpen={isModalOpen}
                                onClose={handleModalClose}
                                videoTrailer={videos}
                            />
                        </>
                    }
                </div>
                <p className={styles.tagline}>{tagline}</p>
                <div className={styles.overview}>
                    <h3 className={styles.overviewText}>Overview: {overview}</h3>
                </div>
                <h4 className={styles.seasonsNr}>
                    Number of seasons:
                    <span> {number_of_seasons}</span>
                </h4>
                <h4 className={styles.episodesNr}>
                    Number of episodes:
                    <span> {number_of_episodes}</span>
                </h4>
                <h4 className={styles.status}>Status: {status}</h4>
                {
                    homepage &&
                    <div className={styles.homepage}>
                        <p className={styles.homepageText}>Homepage: </p>
                        <Link href={homepage} target='_blank'>
                            <LanguageIcon className={styles.webIcon} />
                        </Link>
                    </div>
                }
                {seasons.length > 0 &&
                    <a
                        href="#seasons"
                        aria-label="Read more about each season of the tv series"
                        onClick={scrollToTop}
                        className={styles.seeSeasons}
                    >
                        See {seasons.length === 1 ? "season" : "seasons"}
                    </a>
                }
                {
                    created_by.length > 0 && <>
                        <div className={styles.createdBy}>
                            <p className={styles.createdByText}>Created by: </p>
                            {created_by.map((result) => {
                                const { id, name, profile_path } = result;
                                return <div key={id}>
                                    <h3 className={styles.createdByName}>{name}</h3>
                                    {
                                        profile_path ?
                                            <Link href={`/actor/${id}`}>
                                                <Image
                                                    src={`${IMAGE_URL_185}${profile_path}`}
                                                    width={108}
                                                    height={108}
                                                    alt={name}
                                                    priority
                                                    className={styles.createdByProfile}
                                                />
                                            </Link>
                                            :
                                            <Link href={`/actor/${id}`}>
                                                <Image
                                                    src={NoImage}
                                                    width={110}
                                                    height={110}
                                                    alt={name}
                                                    priority
                                                    className={styles.createdByProfile}
                                                />
                                            </Link>
                                    }
                                </div>
                            }).slice(0, 2)}
                        </div>
                    </>
                }
            </div>
        </div>
    )
};

export default TvSeriesOverview;
