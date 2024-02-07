import React from 'react'
import styles from '../moviesCategories/moviesCategories.module.css';

const FeedMovies = ({isButtonActive, handleButtonChange}) => 
{
  return (
    <div>
        <div
        style = 
        {{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
            width: "100%",
        }}
        >
            <h2 style ={{color: "white"}}>What's new</h2>
            <div
                className = {styles.moviesCategoriesContainer}
            >
                <button
                    onClick = {() => handleButtonChange("Popular")}
                    className = {styles.moviesCategoriesBtn}
                    style =
                    {{
                        color: isButtonActive === "Popular" ? "#BE6E9A" : "white"
                    }}
                >
                    Popular
                </button>
                <button
                    onClick = {() => handleButtonChange("Top Rated")}
                    className = {styles.moviesCategoriesBtn}
                    style =
                    {{
                        color: isButtonActive === "Top Rated" ? "#BE6E9A" : "white"
                    }}
                >
                    Top Rated
                </button>
                <button
                    onClick = {() => handleButtonChange("Upcoming")}
                    className = {styles.moviesCategoriesBtn}
                    style =
                    {{
                        color: isButtonActive === "Upcoming" ? "#BE6E9A" : "white"
                    }}
                >
                    Upcoming
                </button>
            </div>
        </div>
    </div>
  )
};

export default FeedMovies;
