import styles from './tvSeriesCard.module.css';
import { IMAGE_URL } from '@/utils/fetchFromAPI';
import { useRouter } from 'next/router';

const TvSeriesCard = ({ image, id }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/TvSeries/${id}`)
  };

  return (

    <div className={styles.card} onClick={handleCardClick}>
      <div
        style={{
          backgroundImage: `url('${IMAGE_URL}${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          opacity: "1"
        }}
      >
      </div>
    </div>
  )
};

export default TvSeriesCard;
