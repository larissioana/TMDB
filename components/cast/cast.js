import Image from 'next/image';
import { IMAGE_URL_185 } from '@/utils/fetchFromAPI';
import styles from './cast.module.css';
import Link from 'next/link';
import imdb from '../../assets/imdb.webp';
import facebook from '../../assets/facebook.webp';
import blankPhoto from '../../assets/blankphoto.webp';

const Cast = ({
  credits,
  externalIds,
  status,
  budget,
  revenue,
}) => {
  const imdbId = externalIds.imdb_id;
  const facebookId = externalIds.facebook_id;
  const facebookLink = `https://www.facebook.com/${facebookId}`;
  const imdbLink = `https://www.imdb.com/title/${imdbId}`;

  const formattedBudget = new Intl.NumberFormat('en-US',
    {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(budget);

  const formattedRevenue = new Intl.NumberFormat('en-US',
    {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(revenue);

  return (
    <div className={styles.castContainer}>
      <p className={styles.status}><b className={styles.text}>Status: </b> {status}</p>
      {budget !== 0.00 &&
        <p className={styles.budget}><b className={styles.text}>Budget: </b>{formattedBudget}</p>
      }
      {revenue !== 0.00 &&
        <p className={styles.revenue}><b className={styles.text}>Revenue: </b>{formattedRevenue}</p>
      }
      <div className={styles.socialsContainer}>
        {
          imdbId && (
            <Link href={imdbLink} legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  width={44}
                  height={44}
                  alt='imdb'
                  src={imdb}
                  className={styles.imdbIcon}
                />
              </a>
            </Link>
          )}
        {
          facebookId && (
            <Link href={facebookLink} legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  width={40}
                  height={40}
                  alt='imdb'
                  src={facebook}
                  className={styles.facebookIcon}
                />
              </a>
            </Link>
          )}
      </div>
      {
        credits.cast.length > 0 &&
        <h3 className={styles.title}>Top cast</h3>
      }
      <div className={styles.cast}>
        {credits.cast.map((item) => {
          const { id, name, profile_path } = item;
          return <div key={id}>
            {
              profile_path ?
                <Link href={`/actor/${encodeURI(id)}/${name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <Image
                    className={styles.img}
                    width={112}
                    height={112}
                    alt={name}
                    src={`${IMAGE_URL_185}${profile_path}`}
                    loading='eager'
                    placeholder="blur"
                    blurDataURL={`${IMAGE_URL_185}${profile_path}`}
                  />
                </Link>
                :
                <Image
                  className={styles.img}
                  width={112}
                  height={112}
                  alt={name}
                  src={blankPhoto}
                  style={{
                    pointerEvents: "none"
                  }}
                />
            }
            <h3 className={styles.name}>{name}</h3>
          </div>
        }).slice(0, 3)}
      </div>
    </div>
  )
};

export default Cast;
