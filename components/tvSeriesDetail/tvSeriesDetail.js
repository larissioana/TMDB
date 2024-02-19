import { useState } from 'react'
import { IMAGE_URL, IMAGE_URL_342, IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import styles from './tvSeriesDetail.module.css';
import Image from 'next/image';
import { PlayArrow } from '@mui/icons-material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import NavigationBar from '../navigationBar/navigationBar';
import Modal from '../modal/modal';
import Backdrops from '../backdrops/backdrops';
import Seasons from '../seasons/seasons';
import Link from 'next/link';
import Head from 'next/head';
import NoImage from '../../assets/no-image.jpg';
import Recommendations from '../recommendations/recommendations';

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
    poster_path,
    seasons,
    vote_average,
    tagline,
    genres
  } = tvSeries;

  const genresName = genres.map((genre) => genre.name);
  const vote = Math.floor(vote_average);
  const votePercentage = vote / 10 * 100;

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

  return (
    <>
      <Head>
        <title>{name}</title>
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
        >       <div className={styles.flexContainer}>
            {
              poster_path ?

                <div className={styles.left}>
                  <Image
                    src={`${IMAGE_URL_SMALL}${poster_path}`}
                    width={304}
                    height={448}
                    alt={name}
                    loading="eager"
                    className={styles.img}
                    placeholder="blur"
                    blurDataURL={`${IMAGE_URL_SMALL}${poster_path}`}
                  />
                </div>
                :
                <div className={styles.left}>
                  <Image
                    src={NoImage}
                    width={304}
                    height={448}
                    alt={name}
                    loading="eager"
                    className={styles.img}
                    placeholder="blur"
                    blurDataURL={`${IMAGE_URL_SMALL}${NoImage}`}
                  />
                </div>
            }
            <div className={styles.right}>
              <h2 className={styles.title}>{name}</h2>
              <div className={styles.genres}>
                <ul className={styles.genresList}>
                  {genresName.map((genreName, index) => (
                    <>
                      {index > 0 && ','}
                      <li className={styles.genre} key={index}>{genreName}</li>
                    </>
                  )).splice(0, 3)}
                </ul>
              </div>
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
                <h3 className={styles.overviewText}>{overview}</h3>
              </div>
              {seasons.length > 0 &&
                <a
                  href="#seasons"
                  onClick={scrollToTop}
                  className={styles.seeSeasons}
                >
                  See {seasons.length === 1 ? "season" : "seasons"}
                </a>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles.castContainer}>
        {
          credits.cast.length > 0 &&
          <>
            <h2 className={styles.castTitle}>Series Top Cast</h2>
            <div className={styles.castFlexContainer}>
              {
                credits.cast.map((cast) => {
                  const { id, character, name, profile_path } = cast;
                  return <div key={id} className={styles.cast}>
                    {
                      profile_path &&
                      <>
                        <Link href={`/actor/${encodeURI(id)}/${name.replace(/\s+/g, '-').toLowerCase()}`}>
                          <Image
                            src={`${IMAGE_URL_342}${profile_path}`}
                            width={200}
                            height={272}
                            alt={name}
                            loading="eager"
                            className={styles.castImg}
                            placeholder="blur"
                            blurDataURL={`${IMAGE_URL_342}${profile_path}`}
                          />
                        </Link>
                        <h3 className={styles.castName}>{name}</h3>
                        <h4 className={styles.character}>{character}</h4>
                      </>
                    }
                  </div>
                })
              }
            </div>
          </>
        }

      </div>
      <div className={styles.images}>
        {
          images.backdrops.length !== 0 && (
            <>
              <h2 className={styles.backdropsTitle}>Backdrops ({images.backdrops.length})</h2>
              <div className={styles.backdrops}>
                {images.backdrops.map((backdrop, index) => (
                  index === currentBackdropIndex &&
                  <Backdrops key={index} backdrops={backdrop} />
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
