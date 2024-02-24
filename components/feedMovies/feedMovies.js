import styles from '../moviesCategories/moviesCategories.module.css';

const FeedMovies = ({ isButtonActive, handleButtonChange }) => {
    return (
        <div className="feedMovies">
            <h2 style={{ color: "white", fontSize: "clamp(1.1rem, 2vw, 2rem)" }}>What's new</h2>
            <div
                className={styles.moviesCategoriesContainer}
            >
                <button
                    onClick={() => handleButtonChange("Popular")}
                    className={styles.moviesCategoriesBtn}
                    style=
                    {{
                        color: isButtonActive === "Popular" ? "#BE6E9A" : "white"
                    }}
                >
                    Popular
                </button>
                <button
                    onClick={() => handleButtonChange("Top Rated")}
                    className={styles.moviesCategoriesBtn}
                    style=
                    {{
                        color: isButtonActive === "Top Rated" ? "#BE6E9A" : "white"
                    }}
                >
                    Top Rated
                </button>
                <button
                    onClick={() => handleButtonChange("Upcoming")}
                    className={styles.moviesCategoriesBtn}
                    style=
                    {{
                        color: isButtonActive === "Upcoming" ? "#BE6E9A" : "white"
                    }}
                >
                    Upcoming
                </button>
            </div>
        </div>
    )
};

export default FeedMovies;
