import { useEffect, useState } from 'react'
import Head from 'next/head';
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import NavigationBar from '../navigationBar/navigationBar';
import styles from './movieDetail.module.css';
import dynamic from 'next/dynamic';
import Loading from '../loading/loading';
const MovieImages = dynamic(() => import('@/components/movieImages/movieImages'), {
    ssr: false
});
const Recommendations = dynamic(() => import('@/components/recommendations/recommendations'),
    {
        ssr: false
    });
const MovieOverview = dynamic(() => import('@/components/movieOverview/movieOverview'));

const MovieDetail = ({
    movie,
    videoTrailer,
    credits,
    recommendations,
    externalIds,
    movieImages
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const
        {
            backdrop_path,
            vote_average,
            title,
            runtime,
            genres
        } = movie;

    useEffect(() => {
        if (movie) {
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, []);

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
                <meta name="description" content="See more details about a specific movie, like description, status, genre, top cast, more images, watch trailer, recommendations."></meta>
                <link rel="preload" href={`${IMAGE_URL}${backdrop_path}`} as="image" />
            </Head>
            <NavigationBar />
            {!isLoading ?
                <>
                    <div
                        className={styles.movieContent}
                        style=
                        {{
                            backgroundImage: backdrop_path ? `url('${IMAGE_URL}${backdrop_path}')` : null,
                            backgroundPosition: 'top',
                            backgroundSize: 'cover',
                            backgroundRepeat: "no-repeat"
                        }}
                    >
                        <MovieOverview
                            movie={movie}
                            isModalOpen={isModalOpen}
                            closeModal={closeModal}
                            openModal={openModal}
                            votePercentage={votePercentage}
                            formattedTime={formattedTime}
                            genreNames={genreNames}
                            credits={credits}
                            videoTrailer={videoTrailer}
                            externalIds={externalIds}
                            isLoading={isLoading}
                        />
                    </div>
                </>
                :
                <div style={{
                    width: "100vw",
                    height: "100vh"
                }}>
                    <Loading />
                </div>
            }
            <div>
            </div>
            <div className={styles.right}>
                {
                    movieImages.backdrops.length > 0 &&
                    <>
                        <h2 className={styles.moreImages}>See more images</h2>

                        <div className={styles.imagesFlexContainer}>
                            {
                                movieImages.backdrops.map((poster, index) => {
                                    const { file_path } = poster;
                                    return <div className={styles.rightContainerImages}>

                                        <MovieImages title={title} key={index} image={file_path} />
                                    </div>
                                }).slice(0, 6)
                            }
                        </div>
                    </>
                }
            </div>
            {
                movie &&
                <div className={styles.recommendationsContainer}>
                    <Recommendations hasMovies={true} recommendations={recommendations} />
                </div>
            }

        </>
    )
};

export default MovieDetail;
