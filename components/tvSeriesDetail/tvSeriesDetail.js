import { useState, useEffect } from 'react'
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import styles from './tvSeriesDetail.module.css';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import NavigationBar from '../navigationBar/navigationBar';
import Head from 'next/head';
import { formatDate } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import TvSeriesOverview from '../tvSeriesOverview/tvSeriesOverview';
const Backdrops = dynamic(() => import('@/components/backdrops/backdrops'));
const Seasons = dynamic(() => import('@/components/seasons/seasons'));
const Recommendations = dynamic(() => import('@/components/recommendations/recommendations'));
const TvSeriesCast = dynamic(() => import('../tvSeriesCast/tvSeriesCast'));

const TvSeriesDetail = ({
  tvSeries,
  credits,
  videos,
  recommendations,
  images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);

  const {
    backdrop_path,
    name,
    overview,
    seasons,
    vote_average,
    tagline,
    genres,
    original_language,
    number_of_episodes,
    number_of_seasons,
    status,
    first_air_date,
    created_by,
    homepage

  } = tvSeries;

  const genresName = genres?.map((genre) => genre.name);
  const vote = Math.floor(vote_average);
  const votePercentage = vote / 10 * 100;
  const formattedDate = formatDate(first_air_date);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const nextBackdrop = () => {
    setCurrentBackdropIndex((prev) => (prev + 1) % images.backdrops.length);
  };

  const prevBackdrop = () => {
    setCurrentBackdropIndex((prev) => (prev - 1 + images.backdrops.length) % images.backdrops.length);
  };

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="See more details about a specific tv series, like description, see more images, watch youtube video trailer, recommendations, details about the seasons, cast."></meta>
        <link rel="preload" href={`${IMAGE_URL}${backdrop_path}`} as="image" />
      </Head>
      <NavigationBar />
      <div className={styles.wrapper}>
        <div
          className={styles.container}
          style={{
            backgroundImage: `url(${IMAGE_URL}${backdrop_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "1rem"
          }}
        >
          <TvSeriesOverview
            name={name}
            overview={overview}
            status={status}
            videos={videos}
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
            handleModalOpen={handleModalOpen}
            genresName={genresName}
            number_of_episodes={number_of_episodes}
            number_of_seasons={number_of_seasons}
            homepage={homepage}
            created_by={created_by}
            tagline={tagline}
            votePercentage={votePercentage}
            formattedDate={formattedDate}
            original_language={original_language}
            seasons={seasons}

          />
        </div>
      </div>
      <div className={styles.castContainer}>
        {
          credits.cast.length > 0 &&
          <>
            <h2 className={styles.castTitle}>Top Cast</h2>
            <TvSeriesCast credits={credits} />
          </>
        }
      </div>
      <div className={styles.images}>
        {
          images.backdrops.length !== 0 && (
            <>
              <h2 className={styles.backdropsTitle}>Images ({images.backdrops.length})</h2>
              <div className={styles.backdrops}>
                {images.backdrops.map((backdrop, index) => (
                  index === currentBackdropIndex &&
                  <Backdrops key={index} backdrops={backdrop} name={name} />
                ))}
              </div>
              <div className={styles.arrowContainer}>
                <button onClick={prevBackdrop} className={styles.iconBtn}>
                  <ArrowBackIosNewRoundedIcon className={styles.prevIcon} />
                </button>
                <button onClick={nextBackdrop} className={styles.iconBtn}>
                  <ArrowForwardIosRoundedIcon className={styles.nextIcon} />
                </button>
              </div>
            </>
          )}
      </div>
      <div className={styles.tvContainer}>
        <Recommendations hasMovies={false} recommendations={recommendations} />
      </div>
      <div className={styles.seasons} id="seasons">
        {seasons.poster_path !== null &&
          <h2 className={styles.seasonTitle}>
            See {seasons.length === 1 ? "season" : "seasons"}
          </h2>
        }
        {
          seasons.map((season) => {
            return <div className={styles.seasonsContainer}>
              <Seasons season={season} key={season.id} />
            </div>
          })
        }
      </div>
    </>
  )
};

export default TvSeriesDetail;
