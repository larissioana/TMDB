import { useState, useEffect } from 'react'
import styles from './actorDetails.module.css';
import { IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import Head from 'next/head';
import NavigationBar from '../navigationBar/navigationBar';
import LanguageIcon from '@mui/icons-material/Language';
import ActorKnownFor from '../actorKnownFor/actorKnownFor';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import dynamic from 'next/dynamic';
const ActorImages = dynamic(() => import('./actorsImages'))

const ActorDetails = ({ actorDetails, person, actorKnownFor, externalIds }) => {
    const [readMore, setReadMore] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [areMoreImages, setAreMoreImages] = useState(false);

    const {
        name,
        birthday,
        biography,
        place_of_birth,
        profile_path,
        known_for_department,
        homepage,
        gender,
    } = actorDetails;

    const {
        facebook_id,
        twitter_id,
        instagram_id
    } = externalIds;

    const facebookLink = `https://www.facebook.com/${facebook_id}`;
    const instagramLink = `https://www.instagram.com/${instagram_id}`;
    const twitterLink = `https://www.twitter.com/${twitter_id}`;

    const handleOnClickReadMore = () => {
        setReadMore(!readMore);
    };

    const handleImageClick = (file_path) => {
        setSelectedImage(file_path);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const profilePathLength = person.profiles.map((profile) => profile.file_path);
    const socialMediaIds = facebook_id || instagram_id || twitter_id || homepage;

    return (
        <div>
            <Head>
                <title>{name}</title>
                <meta name="description" content="read more about a popular person. See biography, social media, images and movies."></meta>
            </Head>
            <NavigationBar />
            <div className={styles.actorWrapper}>
                {
                    profile_path ? (
                        <div>
                            <div className={styles.container}>
                                <div className={styles.leftContainer}>
                                    <Image
                                        className={styles.profilePath}
                                        src={IMAGE_URL_342 + profile_path}
                                        width={240}
                                        height={320}
                                        alt={name}
                                        loading="eager"
                                    />

                                </div>
                                <div className={styles.right}>
                                    <h2 className={styles.name}>{name}</h2>
                                    <h3 className={styles.generalText}>Gender: {gender === 2 ? "Male" : "Female"}</h3>
                                    {
                                        birthday &&
                                        <h5 className={styles.generalText}>Birthday: <span className={styles.text}>{birthday}</span></h5>
                                    }
                                    {
                                        place_of_birth &&
                                        <h5 className={styles.generalText}> Place of birth:
                                            <span className={styles.text}> {place_of_birth}</span></h5>
                                    }
                                    {
                                        biography &&
                                        <>
                                            {
                                                biography.length > 300 ?
                                                    <div>
                                                        <p className={styles.biography}> Biography:
                                                            <span className={styles.text}> {readMore ? biography : `${biography.substring(0, 250)}...`}
                                                            </span>
                                                        </p>
                                                        <button className={styles.readMore} onClick={handleOnClickReadMore}>{readMore ? 'Show less' : 'Read more'}</button>
                                                    </div>
                                                    :
                                                    <p className={styles.generalText}>Biography: <span className={styles.text}>{biography}</span></p>
                                            }
                                        </>
                                    }
                                    <p className={styles.biography}>Known for:
                                        <span className={styles.text}> {known_for_department}</span>
                                    </p>
                                    <div className={styles.externalIds}>
                                        {socialMediaIds &&
                                            <p className={styles.socialMedia}><b>Social media:</b></p>
                                        }
                                        {
                                            facebook_id &&
                                            <a href={facebookLink} target="_blank" rel="noopener noreferrer" className={styles.homepageHref}>
                                                <FacebookIcon className={styles.hrefIcon} />
                                            </a>
                                        }
                                        {
                                            instagram_id &&
                                            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className={styles.homepageHref}>
                                                <InstagramIcon className={styles.hrefIcon} />
                                            </a>
                                        }
                                        {
                                            twitter_id &&
                                            <a href={twitterLink} target="_blank" rel="noopener noreferrer" className={styles.homepageHref}>
                                                <TwitterIcon className={styles.hrefIcon} />
                                            </a>
                                        }
                                        {
                                            homepage &&
                                            <a href={homepage} target="_blank" rel="noopener noreferrer" className={styles.homepageHref}>
                                                <LanguageIcon className={styles.hrefIcon} />
                                            </a>
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                profilePathLength.length > 1 &&
                                <h2 className={styles.moreImages} onClick={() => setAreMoreImages(!areMoreImages)}>See more images</h2>
                            }
                            {areMoreImages &&
                                <ActorImages
                                    person={person}
                                    handleCloseModal={handleCloseModal}
                                    handleImageClick={handleImageClick}
                                    selectedImage={selectedImage}
                                />
                            }
                        </div>
                    ) :
                        (<div className={styles.info}>No biography available about this actor 	&#128542;</div>)}
            </div>
            <ActorKnownFor actorKnownFor={actorKnownFor} />
        </div>
    )
};

export default ActorDetails;
