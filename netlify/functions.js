import { fetchAPIMovieDetail, fetchAPITrailer, fetchAPICast, fetchAPIRecommandation, fetchAPIExternalLinks } from "@/utils/fetchFromAPI";

export async function handler(event, context)
{
  try
   {
    const movieId = event.queryStringParameters.movieId;
    const movieDetail = await fetchAPIMovieDetail(movieId);
    const videoTrailer = await fetchAPITrailer(movieId);
    const credits = await fetchAPICast(movieId);
    const recommendations = await fetchAPIRecommandation(movieId);
    const externalIds = await fetchAPIExternalLinks(movieId);

    return {
      statusCode: 200,
      body: JSON.stringify({ movieDetail, videoTrailer, credits, recommendations, externalIds }),
    };
   } catch (error)
   {
    return { statusCode: 500, body: error.toString() };
   }
}