import styles from './genresList.module.css';

const GenresList = ({ genreNames }) => {
    return (
        <div className={styles.genres}>
            <div className={styles.genresList}>
                <p className={styles.textBold}>Genres: </p>
                {genreNames.map((genreName, index) => {
                    return (
                        <ul style={{ display: "flex" }} key={index}>
                            <li className={styles.textBold}>{genreName}, </li>
                        </ul>
                    );
                })}
            </div>
        </div>
    )
};

export default GenresList;
