import styles from './backdrops.module.css';
import Image from 'next/image';
import { IMAGE_BACKDROP } from '@/utils/fetchFromAPI';

const Backdrops = ({ backdrops, name }) => {
  const { file_path } = backdrops;

  return (
    <div className={styles.backdrops}>
      <Image
        src={`${IMAGE_BACKDROP}/${file_path}`}
        width={600}
        height={320}
        alt={name}
        loading="eager"
        className={styles.img}
        placeholder="blur"
        blurDataURL={`${IMAGE_BACKDROP}${file_path}`}
      />
    </div>
  )
};

export default Backdrops;
