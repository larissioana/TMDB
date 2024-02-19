import styles from './actorKnownFor.module.css';
import { IMAGE_URL_SMALL } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

const ActorKnownFor = ({ actorKnownFor }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Known For</h2>
      <div className={styles.container}>
        {
          actorKnownFor.cast.map((item) => {
            const {
              poster_path,
              id,
              original_title,
              media_type
            } = item;
            return <>
              {
                poster_path &&
                <div key={id} className={styles.movies}>
                  <Tooltip
                    id="tooltip"
                    place="top"
                  />
                  {
                    media_type === 'movie' ?
                      <Link href={`/movie/${id}`} data-tooltip-id="tooltip" data-tooltip-content={original_title}>
                        <Image
                          src={`${IMAGE_URL_SMALL}${poster_path}`}
                          width={200}
                          height={350}
                          alt={original_title}
                          loading="eager"
                          className={styles.image}
                          placeholder="blur"
                          blurDataURL={`${IMAGE_URL_SMALL}${poster_path}`}
                        />
                      </Link>
                      :
                      <Link href={`/TvSeries/${id}`} data-tooltip-id="tooltip" data-tooltip-content={original_title}>
                        <Image
                          src={`${IMAGE_URL_SMALL}${poster_path}`}
                          width={200}
                          height={350}
                          alt={original_title}
                          loading="eager"
                          className={styles.image}
                        />
                      </Link>
                  }
                </div>
              }
            </>
          }).slice(0, 20)
        }
      </div>
    </div>
  )
};

export default ActorKnownFor;
