import styles from './genresList.module.css';

const GenresList = ({ genreNames }) => {
    return (
        <div className={styles.genres}>
            <p className={styles.textBold}>Genres: </p>
            {genreNames.map((genreName, index) => {
                return (
                    <ul style={{ display: "flex", paddingLeft: ".3rem" }} key={index}>
                        <li className={styles.textBold}>{index === genreNames.length - 1 ? genreName : genreName + ", "} </li>
                    </ul>
                );
            })}
        </div>
    )
};

export default GenresList;
