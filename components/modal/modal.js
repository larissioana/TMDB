import ReactModal from "react-modal";
import styles from './modal.module.css';
import ReactPlayer from "react-player";
import CloseIcon from '@mui/icons-material/Close';
import Loading from "../loading/loading";

const Modal = ({ isOpen, onClose, videoTrailer }) => {
    return (
        <div>
            <ReactModal
                onRequestClose={onClose}
                isOpen={isOpen}
                contentLabel="trailer"
                className={styles.modalContainer}
                style=
                {{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.8)",
                    }
                }}
            >
                {
                    videoTrailer.results.map((video) => {
                        const { key, id, name } = video;
                        return <div key={id} className={styles.videoContainer}>
                            <CloseIcon className={styles.closeIcon} onClick={onClose} />
                            {key && name ?
                                <>
                                    <ReactPlayer
                                        controls
                                        className={styles.reactPlayer}
                                        playing={true}
                                        url={`https://www.youtube.com/watch?v=${key}`}
                                    />
                                    <h3 className={styles.name}>{name}</h3>
                                </>
                                : <Loading />
                            }
                        </div>
                    })[0]
                }
            </ReactModal>
        </div>
    )
};

export default Modal;