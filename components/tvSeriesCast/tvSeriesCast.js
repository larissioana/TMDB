import Image from "next/image";
import { IMAGE_URL_185 } from "@/utils/fetchFromAPI";
import styles from '../tvSeriesDetail/tvSeriesDetail.module.css';
import Link from "next/link";
import NoImage from '../../assets/blankphoto.webp';
import { shortenTitle } from "@/utils/helpers";

const TvSeriesCast = ({ credits }) => {
    return (
        <div className={styles.castFlexContainer}>
            {
                credits.cast.map((cast) => {
                    const { id, character, name, profile_path } = cast;
                    const shortenedTitleName = shortenTitle(name, 20);
                    const shortenedTitleCharacter = shortenTitle(character, 25);
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
    )
};

export default TvSeriesCast;
