import React from 'react';
import styles from '../actorDetails/actorDetails.module.css';
import Modal from 'react-modal';
import { IMAGE_BACKDROP, IMAGE_URL_342 } from '@/utils/fetchFromAPI';
import Image from 'next/image';

const ActorImages = ({
    person,
    handleImageClick,
    handleCloseModal,
    selectedImage }) => {
    return (
        <>
            <div className={styles.actorImages}>
                {
                    person.profiles.map((profile, index) => {
                        const { file_path } = profile;
                        if (index !== 0) {
                            return (
                                <div
                                    key={index}
                                    className={styles.person}
                                    onClick={() => handleImageClick(file_path)}
                                >
                                    <Image
                                        className={styles.personImg}
                                        src={`${IMAGE_URL_342}${file_path}`}
                                        width={160}
                                        height={240}
                                        alt="actor profile pictures"
                                        loading='eager'
                                    />
                                    <div className={styles.expand}>
                                        <p className={styles.expandText}>Expand</p>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    }).slice(0, 8)}
            </div>
            <Modal
                isOpen={!!selectedImage}
                onRequestClose={handleCloseModal}
                contentLabel="Larger Image Modal"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <Image
                    className={styles.modalImage}
                    src={`${IMAGE_BACKDROP}${selectedImage}`}
                    width={600}
                    height={600}
                    alt="actor"
                    loading="eager"
                    placeholder="blur"
                    blurDataURL={`${IMAGE_BACKDROP}${selectedImage}`}
                />
            </Modal>
        </>
    )
};

export default ActorImages;
