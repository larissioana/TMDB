import dynamic from "next/dynamic";
import { fetchAPIData, fetchAPIDetails, fetchAPIMedia } from "@/utils/fetchFromAPI";
const MovieDetail = dynamic(() => import('@/components/movieDetail/movieDetail'));

export async function getServerSideProps(context) {

    const movieId = context.params.movieId;
    const movieDetail = await fetchAPIDetails("movie", movieId);
    const videoTrailer = await fetchAPIData("movie", movieId, "videos");
    const credits = await fetchAPIData("movie", movieId, "credits");
    const recommendations = await fetchAPIData("movie", movieId, "recommendations");
    const externalIds = await fetchAPIData("movie", movieId, "external_ids");
    const movieImages = await fetchAPIMedia("movie", movieId, "images");

    return {
        props:
        {
            movieDetail,
            videoTrailer,
            credits,
            recommendations,
            externalIds,
            movieImages
        }
    }
}

const Movie = ({
    movieDetail,
    videoTrailer,
    credits,
    recommendations,
    externalIds,
    movieImages
}) => {
    return (
        <>
            <MovieDetail
                movie={movieDetail}
                videoTrailer={videoTrailer}
                credits={credits}
                recommendations={recommendations}
                externalIds={externalIds}
                movieImages={movieImages}
            />
        </>
    )
};

export default Movie;