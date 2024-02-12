import { useState } from 'react'
import { IMAGE_URL, IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import styles from './tvSeriesDetail.module.css';
import Image from 'next/image';
import { PlayArrow } from '@mui/icons-material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import NavigationBar from '../navigationBar/navigationBar';
import Modal from '../modal/modal';
import Backdrops from '../backdrops/backdrops';

const TvSeriesDetail = ({tvSeries, credits, videos, images}) =>
{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);

  const {
    backdrop_path,
    first_air_date,
    languages,
    name,
    number_of_episodes,
    number_of_seasons,
    origin_country,
    overview,
    poster_path,
    status,
    vote_average,
    tagline,
    genres

  } = tvSeries;

  const genresName = genres.map((genre) => genre.name);
  const vote = Math.floor(vote_average);
  const votePercentage = vote / 10 * 100;

  const handleModalOpen = () => 
  {
    setIsModalOpen(true);
  }

  const handleModalClose = () =>
  {
    setIsModalOpen(false);
  };

  const nextBackdrop = () =>
  {
    setCurrentBackdropIndex((prev) => (prev + 1) % images.backdrops.length);
  };
  
  const prevBackdrop = () =>
  {
    setCurrentBackdropIndex((prev) => (prev - 1 + images.backdrops.length) % images.backdrops.length);
  };

  return (
    <>
    <NavigationBar/>
      <div className = {styles.wrapper}>
        <div 
            className = {styles.container}
            style = {{
                backgroundImage: `url(${IMAGE_URL}${backdrop_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "1rem"
            }}
        >       <div className = {styles.flexContainer}>
                    <div className = {styles.left}>
                        <Image
                            src = {`${IMAGE_URL_SMALL}${poster_path}`}
                            width = "300"
                            height = "300"
                            alt = {name}
                            loading = "eager"
                            className = {styles.img}
                        />
                    </div>
                    <div className = {styles.right}>
                        <h2 className = {styles.title}>{name}</h2>
                        <div className = {styles.genres}>
                            <ul className = {styles.genresList}>
                                { genresName.map((genreName, index) => (
                                <>
                                {index > 0 && ','}
                                <li className = {styles.genre} key = {index}>{genreName}</li>
                                </>
                                )).splice(0, 3)}
                            </ul>
                        </div>
                        <div className = {styles.voteContainer}>
                            <div className = {styles.vote}>
                                <p className = {styles.voteText}>{votePercentage}%</p>  
                            </div>
                            <p className = {styles.text}>User score</p>
                            <div className = {styles.trailer}>
                                <PlayArrow className = {styles.playIcon} onClick = {handleModalOpen}/>
                                <p className = {styles.text}>Play trailer</p>
                            </div>
                            <Modal 
                                isOpen = {isModalOpen}
                                onClose = {handleModalClose}
                                videoTrailer = {videos}
                            />
                        </div>
                        <p className = {styles.tagline}>{tagline}</p>
                        <div className = {styles.overview}>
                            Overview: 
                            <h3 className = {styles.overviewText}>{overview}</h3>
                        </div>
                    </div>
                </div>
        </div>
      </div>
      <div className = {styles.castContainer}>
        <h2 className = {styles.castTitle}>Series Top Cast</h2>
        <div className = {styles.castFlexContainer}>
        {
            credits.cast.map((cast) =>
            {
                const { id, character, name, profile_path } = cast;
                return <div key = {id} className = {styles.cast}>
                    {
                    profile_path &&
                    <>
                        <Image
                            src = {`${IMAGE_URL_SMALL}${profile_path}`}
                            width = "200"
                            height = "200"
                            alt = {name}
                            loading = "eager"
                            className = {styles.castImg}
                        />
                        <h3 className = {styles.castName}>{name}</h3>
                        <h4 className = {styles.character}>{character}</h4>
                    </>
                    }
                </div>
            })
        }
        </div>
      </div>
      <div className = {styles.images}>
      <h2 className={styles.backdropsTitle}>Backdrops ({images.backdrops.length})</h2>
        <div className = {styles.backdrops}>
        {images.backdrops.map((backdrop, index) => (
          index === currentBackdropIndex &&
          <Backdrops key = {index} backdrops = {backdrop}/>
        ))}
        </div>
        <div className = {styles.arrowContainer}>
        <button onClick = {prevBackdrop} className = {styles.iconBtn}>
            <ArrowBackIosNewRoundedIcon className = {styles.prevIcon}/>
        </button>
        <button onClick = {nextBackdrop} className = {styles.iconBtn}>
            <ArrowForwardIosRoundedIcon className = {styles.nextIcon}/>
        </button>
      </div>
      </div>
    </>
  )
};

export default TvSeriesDetail;
