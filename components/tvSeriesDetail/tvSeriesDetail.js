import { useState, useEffect } from 'react'
import { IMAGE_URL, IMAGE_URL_185, IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import styles from './tvSeriesDetail.module.css';
import Image from 'next/image';
import { PlayArrow } from '@mui/icons-material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import NavigationBar from '../navigationBar/navigationBar';
import Link from 'next/link';
import Head from 'next/head';
import NoImage from '../../assets/blankphoto.webp';
import { formatDate, shortenTitle } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import GenresList from '../genresList/genresList';
import LanguageIcon from '@mui/icons-material/Language';

const Backdrops = dynamic(() => import('@/components/backdrops/backdrops'));
const Modal = dynamic(() => import('@/components/modal/modal'));
const Seasons = dynamic(() => import('@/components/seasons/seasons'));
const Recommendations = dynamic(() => import('@/components/recommendations/recommendations'));

const TvSeriesDetail = ({
  tvSeries,
  credits,
  videos,
  recommendations,
  images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const genresName = genres.map((genre) => genre.name);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    if (tvSeries) {
      setIsLoading(false);
    } else {
      setIsLoading(true)
    }
  }, []);

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="See more details about a specific tv series, like description, see more images, watch youtube video trailer, recommendations, details about the seasons, cast."></meta>
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
                created_by.length > 0 &&
                <div className={styles.createdBy}>
                  <p className={styles.createdByText}>Created by: </p>
                  {created_by.map((result) => {
                    const { id, name, profile_path } = result;
                    return <div key={id}>
                      <h3 className={styles.createdByName}>{name}</h3>
                      {
                        profile_path && tvSeries ?
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
              }
            </div>
          </div>
        </div>
      </div>
      {!isLoading &&
        <div className={styles.castContainer}>
          {
            credits.cast.length > 0 &&
            <>
              <h2 className={styles.castTitle}>Series Top Cast</h2>
              <div className={styles.castFlexContainer}>
                {
                  credits.cast.map((cast) => {
                    const { id, character, name, profile_path } = cast;
                    const shortenedTitleName = shortenTitle(name, 20);
                    const shortenedTitleCharacter = shortenTitle(character, 15);
                    return <>
                      {
                        profile_path !== null ?
                          <div key={id} className={styles.cast}>
                            <Link href={`/actor/${encodeURI(id)}/${name.replace(/\s+/g, '-').toLowerCase()}`}>
                              <Image
                                src={`${IMAGE_URL_185}${profile_path}`}
                                width={150}
                                height={200}
                                alt={name}
                                loading="lazy"
                                className={styles.castImg}
                              />
                            </Link>
                            <h3 className={styles.castName}>{shortenedTitleName}</h3>
                            <h4 className={styles.character}>as {shortenedTitleCharacter}</h4>
                          </div>
                          :
                          <div key={id} className={styles.cast}>
                            <Link href={`/actor/${encodeURI(id)}/${name.replace(/\s+/g, '-').toLowerCase()}`}>
                              <Image
                                src={NoImage}
                                width={150}
                                height={200}
                                alt={name}
                                loading="lazy"
                                className={styles.castImg}
                              />
                            </Link>
                            <h3 className={styles.castName}>{shortenedTitleName}</h3>
                            <h4 className={styles.character}>{shortenedTitleCharacter}</h4>
                          </div>
                      }
                    </>
                  }).slice(0, 5)
                }
              </div>
            </>
          }
        </div>
      }
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
            return <>
              <div className={styles.seasonsContainer}>
                <Seasons season={season} key={season.id} />
              </div>
            </>
          })
        }
      </div>
    </>
  )
};

export default TvSeriesDetail;
