import MovieDetail from "@/components/movieDetail/movieDetail";
import { fetchAPICast, fetchAPIExternalLinks, fetchAPIMovieDetail, fetchAPIRecommandation, fetchAPITrailer } from "@/utils/fetchFromAPI";

export async function getServerSideProps(context) {
    const movieId = context.params.movieId;
    const movieDetail = await fetchAPIMovieDetail(movieId);
    const videoTrailer = await fetchAPITrailer(movieId);
    const credits = await fetchAPICast(movieId);
    const recommendations = await fetchAPIRecommandation(movieId);
    const externalIds = await fetchAPIExternalLinks(movieId);

    return {
        props:
        {
            movieDetail,
            videoTrailer,
            credits,
            recommendations,
            externalIds
        }
    }
}

const Movie = ({
    movieDetail,
    videoTrailer,
    credits,
    recommendations,
    externalIds
}) => {
    return (
        <>
            <MovieDetail
                movie={movieDetail}
                videoTrailer={videoTrailer}
                credits={credits}
                recommendations={recommendations}
                externalIds={externalIds}
            />
        </>
    )
};

export default Movie;