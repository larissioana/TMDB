import styles from './genresList.module.css';

const GenresList = ({ genreNames }) => {
    return (
        <div className={styles.genres}>
            <ul className={styles.genresList}>
                <p className={styles.textBold}>Genres: </p>
                {genreNames.map((genreName, index) => (
                    <ul style={{ display: "flex" }} key={index}>
                        <li className={styles.textBold}>{genreName}</li>
                    </ul>
                ))}
            </ul>
        </div>
    )
};

export default GenresList;
