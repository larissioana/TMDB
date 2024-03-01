import styles from './tvSeriesCard.module.css';
import { IMAGE_BACKDROP } from '@/utils/fetchFromAPI';
import { useRouter } from 'next/router';
import Image from 'next/image';

const TvSeriesCard = ({ image, id, name }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/TvSeries/${id}`)
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <Image
        src={`${IMAGE_BACKDROP}${image}`}
        fill
        alt={name}
        loading="eager"
        className={styles.backdrop}
      />
    </div>
  )
};

export default TvSeriesCard;
