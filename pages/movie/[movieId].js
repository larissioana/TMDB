import dynamic from "next/dynamic";
import { fetchAPICast, fetchAPIExternalLinks, fetchAPIMovieDetail, fetchAPIMovieImages, fetchAPIRecommandation, fetchAPITrailer } from "@/utils/fetchFromAPI";

const MovieDetail = dynamic(() => import('@/components/movieDetail/movieDetail'));

export async function getServerSideProps(context) {
    const movieId = context.params.movieId;
    const movieDetail = await fetchAPIMovieDetail(movieId);
    const videoTrailer = await fetchAPITrailer(movieId);
    const credits = await fetchAPICast(movieId);
    const recommendations = await fetchAPIRecommandation(movieId);
    const externalIds = await fetchAPIExternalLinks(movieId);
    const movieImages = await fetchAPIMovieImages(movieId);

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