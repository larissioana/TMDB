import { useState }from 'react'
import styles from './actorDetails.module.css';
import { IMAGE_URL_SMALL, IMAGE_URL } from '@/utils/fetchFromAPI';
import Image from 'next/image';
import Head from 'next/head';
import NavigationBar from '../navigationBar/navigationBar';
import Modal from 'react-modal';
import LanguageIcon from '@mui/icons-material/Language';
import ActorKnownFor from '../actorKnownFor/actorKnownFor';

const ActorDetails = ({ actorDetails, person, actorKnownFor }) =>
{
    const [readMore, setReadMore] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
   
    const {
        name,
        birthday,
        biography,
        place_of_birth,
        profile_path,
        known_for_department,
        homepage
    } = actorDetails;
 
    const handleOnClickReadMore = () =>
    {
        setReadMore(!readMore);
    };

    const handleImageClick = (file_path) =>
    {
        setSelectedImage(file_path);
    };
    
    const handleCloseModal = () => 
    {
        setSelectedImage(null);
    };

    const profilePathLength = person.profiles.map((profile) => profile.file_path);

    return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <NavigationBar/>
      <div className={styles.actorWrapper}>
            {
                profile_path ? (
                <div>
                    <div className={styles.container}>
                        <div className={styles.leftContainer}>
                            <Image 
                                className = {styles.profilePath}
                                src = {IMAGE_URL_SMALL + profile_path}
                                width = '240' 
                                height = '320' 
                                alt = {name}
                                loading = "eager"
                            />
                           
                        </div>
                        <div className={styles.right}>
                            <h2 className={styles.name}>{name}</h2>
                            {
                                birthday &&
                                <h5 className={styles.birthday}>Birthday: <span className={styles.text}>{birthday}</span></h5>
                            }
                            {
                                place_of_birth &&
                                <h5 className={styles.birth}> Place of birth:    
                                  <span className={styles.text}> {place_of_birth}</span></h5>
                            }
                            {
                                biography.length > 300 ?
                                <div>
                                    <p className={styles.biography}> Biography:  
                                        <span className={styles.text}> { readMore ? biography : `${biography.substring(0, 250)}...`}
                                        </span>
                                    </p>
                                    <button className={styles.readMore} onClick={handleOnClickReadMore}>{readMore ? 'Show less' : 'Read more' }</button>
                                </div> 
                                :
                                    <p className={styles.biography}>Biography: <span className={styles.text}>{biography}</span></p>
                            }
                            <p className={styles.knownFor}>Known for: 
                                <span className={styles.text}> {known_for_department}</span>
                            </p>
                            {
                                homepage &&
                                <div className = {styles.homepage}>
                                    <a href = {homepage} target="_blank" rel="noopener noreferrer" className = {styles.homepageHref}>
                                        Homepage: 
                                        <LanguageIcon className = {styles.hrefIcon}/>
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        profilePathLength.length > 1 &&
                        <h2 className = {styles.moreImages}>More images</h2>
                    }
                    <div className={styles.actorImages}>
                        {
                        person.profiles.map((profile, index) => {
                        const { file_path } = profile;
                        if (index !== 0) {
                            return (
                            <div
                                key = {index} 
                                className = {styles.person}
                                onClick={() => handleImageClick(file_path)}
                            >
                                <Image
                                className = {styles.personImg}
                                src = {`${IMAGE_URL}${file_path}`}
                                width = "160"
                                height = "240"
                                alt = "actor"
                                loading = "eager"
                                />
                                <div className = {styles.expand}>
                                    <p className = {styles.expandText}>Expand</p>
                                </div>
                            </div>
                            );
                        }
                        return null; 
                        }).slice(0, 8)}
                    </div>
                    <Modal
                        isOpen = {!!selectedImage}
                        onRequestClose = {handleCloseModal}
                        contentLabel = "Larger Image Modal"
                        className = {styles.modal}
                        overlayClassName = {styles.overlay}
                    >
                        <Image
                        className = {styles.modalImage}
                        src = {`${IMAGE_URL}${selectedImage}`}
                        width = "600"
                        height = "600"
                        alt = "actor"
                        loading = "eager"
                        />
                    </Modal>
                </div>
                ) :
                ( <div className={styles.info}>No information available about this actor 	&#128542;</div>)}
        </div>
        <ActorKnownFor actorKnownFor = {actorKnownFor}/>
    </div>
  )
};

export default ActorDetails;
